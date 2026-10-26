from pathlib import Path
import json,re,sys
sys.stdout.reconfigure(encoding='utf8')
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
ROOT=Path(__file__).parent
OUT=ROOT.parent/'dist/assets/documents'
D=json.loads((ROOT/'cv-content.json').read_text(encoding='utf8'))
R=json.loads((ROOT/'revised-content.json').read_text(encoding='utf8'))
for l in ['uk','en','de','pl']:R[l]=json.loads((ROOT/f'translations-{l}.json').read_text(encoding='utf8'))
UI={'ru':['Контакты','Профессиональный профиль','Продолжение','Выставки и награды'], 'uk':['Контакти','Професійний профіль','Продовження','Виставки та нагороди'],'en':['Contact','Professional profile','Continued','Exhibitions and awards'],'de':['Kontakt','Berufliches Profil','Fortsetzung','Ausstellungen und Auszeichnungen'],'pl':['Kontakt','Profil zawodowy','Kontynuacja','Wystawy i nagrody']}
def clean(s):return re.sub(r'\s+',' ',s).strip().replace(' | ',' · ')
def init(title,lang):
 doc=Document();sec=doc.sections[0];sec.page_width=Cm(21);sec.page_height=Cm(29.7);sec.top_margin=Cm(1.55);sec.bottom_margin=Cm(1.5);sec.left_margin=Cm(1.7);sec.right_margin=Cm(1.7)
 for name,size in [('Normal',10.5),('Title',24),('Heading 1',13),('Heading 2',11)]:
  st=doc.styles[name];st.font.name='Arial';st.font.size=Pt(size);st.font.color.rgb=RGBColor(0,0,0);st.paragraph_format.space_after=Pt(6);st.paragraph_format.line_spacing=1.12
  if name!='Normal':st.font.bold=True;st.paragraph_format.keep_with_next=True
 for node in list(doc.styles.element.iter(qn('w:pBdr'))):node.getparent().remove(node)
 doc.styles['Heading 1'].paragraph_format.space_before=Pt(12)
 doc.styles['Normal'].paragraph_format.widow_control=True
 doc.core_properties.author='Krystyna Mishchenko';doc.core_properties.title=title
 footer=sec.footer.paragraphs[0];footer.alignment=2
 r=footer.add_run('Krystyna Mishchenko  ·  ');r.font.size=Pt(8);r.font.color.rgb=RGBColor.from_string('666666')
 fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');footer._p.append(fld)
 return doc
def para(doc,text,style=None):return doc.add_paragraph(clean(text),style)
def head(doc,text):return para(doc,text,'Heading 1')
def entry(doc,title,text):
 para(doc,title,'Heading 2');para(doc,text)
def contacts(d):return d['city']+'  ·  m.krystyna.197@gmail.com\nDE +49 1575 3604617  ·  UA +380 93 1324782'
for l,d in D.items():
 if sys.argv[1:] and l not in sys.argv[1:]:continue
 r=R[l];u=UI[l]
 doc=init(d['cv'],l)
 table=doc.add_table(rows=1,cols=2);table.autofit=False;table.columns[0].width=Cm(13.8);table.columns[1].width=Cm(3.8)
 a,b=table.rows[0].cells;a.width=Cm(13.8);b.width=Cm(3.8)
 p=a.paragraphs[0];p.style='Title';p.add_run(d['name'])
 a.add_paragraph(d['role']);p=a.add_paragraph(contacts(d));p.paragraph_format.space_after=Pt(0)
 for run in p.runs:run.font.size=Pt(9)
 b.paragraphs[0].add_run().add_picture(str(ROOT/'reference-photo.jpg'),width=Cm(2.7))
 head(doc,u[1]);para(doc,d['profile'])
 head(doc,d['head'][1])
 for i in range(3):
  entry(doc,d['edu'][i],d['edu'][3] if i<2 else d['edu'][5])
  if i<2:para(doc,(['Художественная керамика','Художня кераміка','Art ceramics','Künstlerische Keramik','Ceramika artystyczna'][['ru','uk','en','de','pl'].index(l)]))
 head(doc,d['head'][4]);para(doc,d['member'])
 head(doc,d['head'][3])
 for item in d['langs'].split(';'):para(doc,item.strip().rstrip('.'))
 doc.add_page_break();para(doc,d['name'],'Title');para(doc,d['role'])
 head(doc,d['head'][2])
 for i,(studio,date)in enumerate([('SAGA POTTERY','11.2020–02.2022'),('PROCS','2018–2021'),('Studio Gozhar','2020')]):
  entry(doc,date+' · '+studio,d['jobs'][0]);para(doc,r['jobs'][i])
 head(doc,r['skillsTitle'])
 for item in r['skills']:para(doc,item,'List Bullet')
 doc.save(OUT/f'Krystyna-Mishchenko-CV-{l.upper()}.docx')
 doc=init(d['journey'],l);para(doc,d['name'],'Title');para(doc,('Künstlerischer Werdegang' if l=='de' else d['journey'].capitalize()),'Heading 2');para(doc,d['role']);para(doc,d['city'])
 # Use the concise, sourced biography instead of repeating 34 essay paragraphs.
 for title,text in zip(d['jh'][:3],d['jp'][:3]):head(doc,title);para(doc,text)
 head(doc,d['head'][4]);para(doc,d['member'])
 doc.add_page_break();para(doc,u[3],'Title');para(doc,d['name'])
 head(doc,d['head'][5])
 for item in d['ex']:para(doc,item)
 head(doc,d['head'][6])
 for item in d['aw']:para(doc,item)
 doc.save(OUT/f'Krystyna-Mishchenko-Artistic-Journey-{l.upper()}.docx')
 print(l,'authored CV and journey')
# Source data for the website is generated from the same reviewed records.
site={l:{'name':d['name'],'city':d['city'],'head':d['head'],'profile':d['profile'],'jobs':R[l]['jobs'],'role':d['jobs'][0],'langs':d['langs'].split(';'),'ex':d['ex'],'aw':d['aw']}for l,d in D.items()}
(ROOT.parent/'dist/cv-data.js').write_text('window.portfolioCV='+json.dumps(site,ensure_ascii=False)+';\n',encoding='utf8')
