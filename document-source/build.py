from pathlib import Path
import json, zipfile
from xml.sax.saxutils import escape
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY,TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT=Path(__file__).parent
OUT=ROOT.parent/'dist/assets/documents';OUT.mkdir(exist_ok=True)
D=json.loads((ROOT/'cv-content.json').read_text(encoding='utf-8'))
PHOTO=ROOT/'reference-photo.jpg'
for n,f in [('C','arial.ttf'),('CB','arialbd.ttf')]:pdfmetrics.registerFont(TTFont(n,'C:/Windows/Fonts/'+f))
pdfmetrics.registerFontFamily('C',normal='C',bold='CB')
ST={
 'body':ParagraphStyle('body',fontName='C',fontSize=10.5,leading=13,alignment=TA_JUSTIFY,spaceAfter=6),
 'detail':ParagraphStyle('detail',fontName='C',fontSize=10.5,leading=13,alignment=TA_LEFT,spaceAfter=6),
 'bold':ParagraphStyle('bold',fontName='CB',fontSize=11,leading=13.5,alignment=TA_LEFT,spaceAfter=5),
 'head':ParagraphStyle('head',fontName='CB',fontSize=13,leading=16,alignment=TA_LEFT,spaceAfter=9,spaceBefore=10,textColor=colors.HexColor('#574b36'),keepWithNext=True),
 'name':ParagraphStyle('name',fontName='CB',fontSize=24,leading=26,spaceAfter=15),
 'title':ParagraphStyle('title',fontName='CB',fontSize=22,leading=26,spaceAfter=7),
 'small':ParagraphStyle('small',fontName='C',fontSize=9,leading=12,spaceAfter=6,alignment=TA_LEFT),
 'story':ParagraphStyle('story',fontName='C',fontSize=10.5,leading=14,alignment=TA_JUSTIFY,spaceAfter=9),
}
UI={
 'ru':['Личные данные','Место проживания','Телефоны','О себе'],
 'uk':['Особисті дані','Місце проживання','Телефони','Про себе'],
 'en':['Personal details','Location','Telephone','About me'],
 'de':['Persönliche Daten','Wohnort','Telefon','Über mich'],
 'pl':['Dane osobowe','Miejsce zamieszkania','Telefon','O mnie']
}

def cv_blocks(d,l):
 u=UI[l]
 left=[('name','Krystyna\nMishchenko'),('photo',''),('head',u[0]),('bold',u[1]),('detail',d['city']),('bold',u[2]),('detail','DE +49 1575 3604617\nUA +380 93 1324782'),('bold','E-mail'),('small','m.krystyna.197@gmail.com'),('head',d['head'][3])]
 left += [('body',x.strip().rstrip('.')) for x in d['langs'].split(';')]
 right=[('head',u[3]),('body',d['profile']),('head',d['head'][1])]
 for i in range(2):right += [('bold',d['edu'][i]),('body',d['edu'][3])]
 right += [('body',d['edu'][4]),('bold',d['edu'][2]),('body',d['edu'][5]),('head',d['head'][2]),('bold','SAGA POTTERY · 11.2020–02.2022'),('detail',d['jobs'][0]),('bold','PROCS · 2018–2021'),('detail',d['jobs'][0]),('body',d['jobs'][1]),('bold','Studio Gozhar · 2020'),('body',d['jobs'][0]+'. '+d['jobs'][2]),('head',d['head'][4]),('body',d['member'])]
 return left,right

def journey_blocks(d,l):
 b=[('title','Krystyna Mishchenko'),('bold',d['journey']),('detail',d['role']+' | '+d['city'])]
 for h,p in zip(d['jh'],d['jp']):
  if l=='uk':p=p.replace('Кристина Міщенко','Krystyna Mishchenko').replace('Кристина','Художниця')
  b += [('head',h),('story',p)]
 b += [('break',''),('title',d['journey']),('detail','Krystyna Mishchenko'),('head',d['head'][5])]
 b += [('body',x) for x in d['ex']]
 b += [('head',d['head'][6])]+[('body',x) for x in d['aw']]
 b += [('head',d['head'][4]),('body',d['member'])]
 return b

def paragraph(txt,typ):return Paragraph(escape(txt).replace('\n','<br/>'),ST[typ])

def draw_column(c,blocks,x,top,width):
 y=top
 for typ,txt in blocks:
  if typ=='photo':
   c.drawImage(str(PHOTO),x,y-171,width=143,height=171,mask='auto');y-=186;continue
  p=paragraph(txt,typ);y-=p.style.spaceBefore
  w,h=p.wrap(width,1000);p.drawOn(c,x,y-h);y-=h+p.style.spaceAfter
 return y

def init_doc():
 doc=Document();s=doc.sections[0];s.page_height=Cm(29.7);s.page_width=Cm(21);s.top_margin=Cm(1.15);s.bottom_margin=Cm(1.2);s.left_margin=Cm(1.1);s.right_margin=Cm(1.1)
 normal=doc.styles['Normal'];normal.font.name='Arial';normal.font.size=Pt(10.5);normal.paragraph_format.line_spacing=1.0;normal.paragraph_format.space_after=Pt(6)
 doc.core_properties.author='Krystyna Mishchenko'
 return doc

def add_doc_blocks(container,blocks):
 for typ,txt in blocks:
  if typ=='break':container.add_page_break();continue
  p=container.add_paragraph()
  if typ=='photo':p.add_run().add_picture(str(PHOTO),width=Cm(5.05));p.paragraph_format.space_after=Pt(15);continue
  p.alignment=WD_ALIGN_PARAGRAPH.JUSTIFY if typ in ['body','story'] else WD_ALIGN_PARAGRAPH.LEFT
  r=p.add_run(txt);r.font.name='Arial';r.font.size=Pt(ST[typ].fontSize);r.bold=typ in ['name','title','head','bold']
  p.paragraph_format.space_after=Pt(ST[typ].spaceAfter);p.paragraph_format.space_before=Pt(ST[typ].spaceBefore)
  p.paragraph_format.line_spacing=Pt(ST[typ].leading)
  p.paragraph_format.widow_control=True
  if typ in ['head','bold','title','name']:p.paragraph_format.keep_with_next=True
  if typ=='head':
   r.font.color.rgb=RGBColor.from_string('574B36')

def footer(c,doc):
 c.setFont('C',8);c.setFillColor(colors.HexColor('#555555'));c.drawString(40,22,'Krystyna Mishchenko');c.drawRightString(A4[0]-40,22,str(doc.page))

R=json.loads((ROOT/'revised-content.json').read_text(encoding='utf-8'))
for lang in ['en','uk','de','pl']:R[lang]=json.loads((ROOT/f'translations-{lang}.json').read_text(encoding='utf-8'))
DETAILS={
 'ru': ['Направление: изобразительное и декоративно-прикладное искусство, реставрация. Специализация: художественная керамика. Квалификация: художник декоративно-прикладного искусства.', 'Направление: изобразительное и декоративно-прикладное искусство. Специализация: художественная керамика.', 'Художник-керамист, преподаватель', 'Продолжение'],
 'uk': ['Напрям: образотворче та декоративно-прикладне мистецтво, реставрація. Спеціалізація: художня кераміка. Кваліфікація: художник декоративно-прикладного мистецтва.', 'Напрям: образотворче та декоративно-прикладне мистецтво. Спеціалізація: художня кераміка.', 'Художник-кераміст, викладач', 'Продовження'],
 'en': ['Field: fine arts, decorative and applied arts, restoration. Specialisation: art ceramics. Qualification: decorative and applied artist.', 'Field: fine arts, decorative and applied arts. Specialisation: art ceramics.', 'Ceramic artist and teacher', 'Continued'],
 'de': ['Fachrichtung: bildende, dekorative und angewandte Kunst, Restaurierung. Schwerpunkt: künstlerische Keramik. Qualifikation: Künstlerin für dekorative und angewandte Kunst.', 'Fachrichtung: bildende, dekorative und angewandte Kunst. Schwerpunkt: künstlerische Keramik.', 'Keramikkünstlerin und Lehrerin', 'Fortsetzung'],
 'pl': ['Kierunek: sztuki piękne, sztuka dekoracyjna i użytkowa, konserwacja. Specjalizacja: ceramika artystyczna. Kwalifikacja: artysta sztuki dekoracyjnej i użytkowej.', 'Kierunek: sztuki piękne, sztuka dekoracyjna i użytkowa. Specjalizacja: ceramika artystyczna.', 'Artystka ceramiczka, nauczycielka', 'Ciąg dalszy']
}

def make_cv_pages(d,r,l):
 left,_=cv_blocks(d,l)
 idx=next(i for i,b in enumerate(left) if b==('head',d['head'][3]))
 left=left[:idx+1]
 for language in d['langs'].split(';'):
  label,value=language.strip().rstrip('.').split(' — ',1)
  left += [('bold',label[0].upper()+label[1:]),('detail',value)]
 right=[('head',r['profileTitle'])]+[('body',x) for x in r['profile']]+[('head',d['head'][1])]
 for i in range(2):right += [('bold',d['edu'][i]),('body',d['edu'][3]),('body',DETAILS[l][i])]
 right += [('bold',d['edu'][2]),('body',d['edu'][5])]
 secondleft=[('name','Krystyna\nMishchenko'),('detail',r['role']),('head',d['head'][4]),('body',d['member'])]
 secondright=[('head',d['head'][2])]
 for i,(studio,date) in enumerate([('SAGA POTTERY','11.2020–02.2022'),('PROCS','2018–2021'),('Studio Gozhar','2020')]):
  secondright += [('bold',date+' | '+studio),('detail',DETAILS[l][2] if i==2 else d['jobs'][0]),('body',r['jobs'][i])]
 secondright += [('head',r['skillsTitle'])]+[('body','• '+x) for x in r['skills']]
 return [(left,right),(secondleft,secondright)]

def add_columns(doc,left,right):
 table=doc.add_table(rows=1,cols=2);table.autofit=False;table.alignment=WD_TABLE_ALIGNMENT.CENTER
 table.columns[0].width=Cm(6.4);table.columns[1].width=Cm(12.4)
 for cell,w,items in zip(table.rows[0].cells,[6.4,12.4],[left,right]):
  cell.width=Cm(w);cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.TOP
  tcPr=cell._tc.get_or_add_tcPr();m=OxmlElement('w:tcMar')
  for side,val in [('top','0'),('bottom','0'),('left','0'),('right','250' if w==6.4 else '0')]:
   tag=OxmlElement('w:'+side);tag.set(qn('w:w'),val);tag.set(qn('w:type'),'dxa');m.append(tag)
  tcPr.append(m);cell._element.remove(cell.paragraphs[0]._element);add_doc_blocks(cell,items)

for l,d in D.items():
 r=R[l];d['role']=r['role'];pages=make_cv_pages(d,r,l)
 stem=OUT/f'Krystyna-Mishchenko-CV-{l.upper()}'
 c=canvas.Canvas(str(stem)+'.pdf',pagesize=A4);c.setTitle(d['cv']);c.setAuthor('Krystyna Mishchenko')
 doc=init_doc();doc.core_properties.title=d['cv']
 for i,(left,right) in enumerate(pages):
  if i:doc.add_page_break()
  y1=draw_column(c,left,31,805,158);y2=draw_column(c,right,213,805,351)
  assert min(y1,y2)>32,(l,i,y1,y2)
  c.setFont('C',8);c.setFillColor(colors.HexColor('#574b36'));c.drawRightString(564,22,str(i+1));c.showPage()
  add_columns(doc,left,right)
 c.save();doc.save(str(stem)+'.docx')
 b=[('title','Krystyna Mishchenko'),('bold',d['journey']),('detail',r['role'])]
 for s in r['sections'][:2]:b += [('head',s['title'])]+[('story',p) for p in s['paragraphs']]
 b += [('break',''),('title',d['journey']),('detail','Krystyna Mishchenko'),('head',d['head'][5])]
 b += [('body',x) for x in d['ex']]+[('head',d['head'][6])]+[('body',x) for x in d['aw']]
 b += [('head',d['head'][4]),('body',d['member']),('break',''),('title',d['journey']),('detail',DETAILS[l][3])]
 for s in r['sections'][2:]:b += [('head',s['title'])]+[('story',p) for p in s['paragraphs']]
 stem=OUT/f'Krystyna-Mishchenko-Artistic-Journey-{l.upper()}'
 flow=[PageBreak() if typ=='break' else paragraph(txt,typ) for typ,txt in b]
 SimpleDocTemplate(str(stem)+'.pdf',pagesize=A4,leftMargin=40,rightMargin=40,topMargin=34,bottomMargin=42,title=d['journey'],author='Krystyna Mishchenko').build(flow,onFirstPage=footer,onLaterPages=footer)
 doc=init_doc();doc.core_properties.title=d['journey'];add_doc_blocks(doc,b);doc.save(str(stem)+'.docx')
 journey=PdfReader(str(stem)+'.pdf');assert 'CeGlina' in journey.pages[1].extract_text(),(l,'exhibitions must be on page two')
 cv=PdfReader(OUT/f'Krystyna-Mishchenko-CV-{l.upper()}.pdf');assert len(cv.pages)==2
 assert all('CeGlina' not in p.extract_text() for p in cv.pages)
 assert len(r['sections'])==6 and sum(len(s['paragraphs']) for s in r['sections'])==34
 print(l, 'CV:',len(cv.pages),'pages; journey:',len(journey.pages),'pages; exhibitions: page 2')
archive=OUT/'Krystyna-Mishchenko-CV-and-Artistic-Journey-5-languages.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(OUT.iterdir()):
  if p.suffix in ['.pdf','.docx']:z.write(p,p.name)

