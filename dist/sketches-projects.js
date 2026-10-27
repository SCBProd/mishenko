(()=>{
'use strict';
const lang=document.documentElement.lang;
const l=({ru:0,uk:1,en:2,de:3,pl:4})[lang]??2;
const text=[["Эскизы/проекты", "Ескізи/проєкти", "Sketches/projects", "Skizzen/Projekte", "Szkice/projekty"],["Связанные эскизы объединены в серии. Листайте стрелками или свайпом.", "Пов’язані ескізи об’єднано в серії. Гортайте стрілками або свайпом.", "Related sketches are grouped into series. Use arrows or swipe.", "Zusammengehörige Skizzen sind zu Serien gruppiert. Mit den Pfeilen blättern oder wischen.", "Powiązane szkice zebrano w serie. Przeglądaj je za pomocą strzałek lub przesuwając palcem."],["Предыдущий эскиз", "Попередній ескіз", "Previous sketch", "Vorherige Skizze", "Poprzedni szkic"],["Следующий эскиз", "Наступний ескіз", "Next sketch", "Nächste Skizze", "Następny szkic"],["Увеличить", "Збільшити", "Enlarge", "Vergrößern", "Powiększ"]].map(a=>a[l]);
const names={
"051":["Стаканы. Природа и геометрия", "Склянки. Природа й геометрія", "Drinking Vessels. Nature and Geometry", "Trinkbecher. Natur und Geometrie", "Kubki do napojów. Natura i geometria"],
"053":["Стаканы. Лабиринты и листья", "Склянки. Лабіринти й листя", "Drinking Vessels. Labyrinths and Leaves", "Trinkbecher. Labyrinthe und Blätter", "Kubki do napojów. Labirynty i liście"],
"056":["Сервиз. Листья в движении", "Сервіз. Листя в русі", "Tableware. Leaves in Motion", "Geschirr. Blätter in Bewegung", "Serwis. Liście w ruchu"],
"055":["Чаши. Лес, листья и волны", "Чаші. Ліс, листя й хвилі", "Bowls. Forest, Leaves and Waves", "Schalen. Wald, Blätter und Wellen", "Misy. Las, liście i fale"],
"identity-perspective":["Капитал идентичности. Трансформативная композиция в перспективе", "Капітал ідентичності. Композиція зі змінним розташуванням елементів у перспективі", "Identity Capital. Transformable Composition in Perspective", "Identitätskapital. Transformierbare Komposition in perspektivischer Ansicht", "Kapitał tożsamości. Kompozycja o zmiennym układzie w perspektywie"],
"identity-detail":["Капитал идентичности. Форма и проём", "Капітал ідентичності. Форма й отвір", "Identity Capital. Form and Opening", "Identitätskapital. Form und Öffnung", "Kapitał tożsamości. Forma i prześwit"],
"identity-vertical":["Капитал идентичности. Вертикальная композиция", "Капітал ідентичності. Вертикальна композиція", "Identity Capital. Vertical Composition", "Identitätskapital. Vertikale Komposition", "Kapitał tożsamości. Kompozycja pionowa"],
"identity-layout":["Капитал идентичности. Схема композиции", "Капітал ідентичності. Схема композиції", "Identity Capital. Composition Layout", "Identitätskapital. Kompositionsschema", "Kapitał tożsamości. Schemat kompozycji"],
"identity-render-1":["Капитал идентичности. Визуализация I", "Капітал ідентичності. Візуалізація I", "Identity Capital. Visualisation I", "Identitätskapital. Visualisierung I", "Kapitał tożsamości. Wizualizacja I"],
"identity-render-2":["Капитал идентичности. Визуализация II", "Капітал ідентичності. Візуалізація II", "Identity Capital. Visualisation II", "Identitätskapital. Visualisierung II", "Kapitał tożsamości. Wizualizacja II"],
"identity-render-4":["Капитал идентичности. Визуализация IV", "Капітал ідентичності. Візуалізація IV", "Identity Capital. Visualisation IV", "Identitätskapital. Visualisierung IV", "Kapitał tożsamości. Wizualizacja IV"],
"identity-render-5":["Капитал идентичности. Визуализация V", "Капітал ідентичності. Візуалізація V", "Identity Capital. Visualisation V", "Identitätskapital. Visualisierung V", "Kapitał tożsamości. Wizualizacja V"],
"identity-colour":["Капитал идентичности. Цветовое решение", "Капітал ідентичності. Кольорове рішення", "Identity Capital. Colour Scheme", "Identitätskapital. Farbgestaltung", "Kapitał tożsamości. Kolorystyka"],
'001':["Ритм линий", "Ритм ліній", "Rhythm of Lines", "Rhythmus der Linien", "Rytm linii"],
'0065':["Птицы в круге", "Птахи в колі", "Birds in a Circle", "Vögel im Kreis", "Ptaki w kole"],
'015':["Сервиз «Ветви»", "Сервіз «Гілки»", "Branches — Tableware Study", "Zweige — Geschirrentwurf", "Gałęzie — projekt serwisu"],
'016':["Ветвление цвета", "Розгалуження кольору", "Branching Colour", "Verzweigung der Farbe", "Rozgałęzienia koloru"],
'018':["Диалог силуэтов", "Діалог силуетів", "Dialogue of Silhouettes", "Dialog der Silhouetten", "Dialog sylwet"],
'019':["Вариации чайного сервиза", "Варіації чайного сервізу", "Tea Set Variations", "Variationen eines Teeservices", "Wariacje serwisu do herbaty"],
'023':["Переплетения ритмов", "Переплетення ритмів", "Interwoven Rhythms", "Verflochtene Rhythmen", "Przeplatające się rytmy"],

'028':["Птицы среди узоров", "Птахи серед візерунків", "Birds Among Patterns", "Vögel zwischen Mustern", "Ptaki wśród wzorów"],
'029':["Птица в цветущем саду", "Птах у квітучому саду", "Bird in a Flowering Garden", "Vogel im blühenden Garten", "Ptak w kwitnącym ogrodzie"],
'030':["Цветение и движение", "Цвітіння й рух", "Bloom and Motion", "Blüte und Bewegung", "Kwitnienie i ruch"],
'031':["Птицы над рекой", "Птахи над рікою", "Birds Above the River", "Vögel über dem Fluss", "Ptaki nad rzeką"],
'050':["Птицы на ветвях", "Птахи на гілках", "Birds on Branches", "Vögel auf Zweigen", "Ptaki na gałęziach"],
'032':["Листья и фактуры", "Листя й фактури", "Leaves and Textures", "Blätter und Texturen", "Liście i faktury"],
'033':["Сад у воды", "Сад біля води", "Garden by the Water", "Garten am Wasser", "Ogród nad wodą"],
'049':["Ботанические орнаменты", "Ботанічні орнаменти", "Botanical Ornaments", "Pflanzenornamente", "Ornamenty roślinne"],

'041':["Сад в круге", "Сад у колі", "Garden in a Circle", "Garten im Kreis", "Ogród w kole"],
'042':["Сосуды-сады", "Посудини-сади", "Garden Vessels", "Gartengefäße", "Naczynia-ogrody"],
'040':["Подсолнух над рекой", "Соняшник над рікою", "Sunflower Above the River", "Sonnenblume über dem Fluss", "Słonecznik nad rzeką"],
'058':["Рогатые силуэты", "Рогаті силуети", "Antlered Silhouettes", "Silhouetten mit Geweih", "Sylwety z porożem"],
'059':["Лесные характеры", "Лісові характери", "Forest Characters", "Waldgestalten", "Leśne postacie"],
'060':["Между сосудом и зверем", "Між посудиною і звіром", "Between Vessel and Creature", "Zwischen Gefäß und Tier", "Między naczyniem a zwierzęciem"],
'022':["Рыбы. Поиск формы", "Риби. Пошук форми", "Fish. Studies of Form", "Fische. Formstudien", "Ryby. Poszukiwania formy"],
'moonfish':["Рыба, съевшая луну", "Риба, що з’їла місяць", "The Fish That Ate the Moon", "Der Fisch, der den Mond verschlang", "Ryba, która zjadła księżyc"],
'vase-eight':["Сосуды. Цветовые пробы", "Посудини. Кольорові проби", "Vessels. Colour Studies", "Gefäße. Farbstudien", "Naczynia. Studia kolorystyczne"],
'vase-one':["Конструкция и линия", "Конструкція й лінія", "Structure and Line", "Konstruktion und Linie", "Konstrukcja i linia"],
'vase-two':["Ритмы орнамента", "Ритми орнаменту", "Rhythms of Ornament", "Rhythmen des Ornaments", "Rytmy ornamentu"],
'vase-three':["Цветовые сочетания", "Кольорові поєднання", "Colour Combinations", "Farbkombinationen", "Zestawienia kolorów"],
'botanical-plates':["Листья и цветы. Проект тарелок", "Листя й квіти. Проєкт тарілок", "Leaves and Flowers. Plate Designs", "Blätter und Blumen. Tellerentwürfe", "Liście i kwiaty. Projekty talerzy"],
'bird-moon':["Эскиз к керамическому панно «Солнцестояние» — правая часть триптиха", "Ескіз до керамічного панно «Сонцестояння» — права частина триптиха", "Sketch for “Solstice” ceramic panel — right part of the triptych", "Entwurf für das keramische Wandbild „Sonnenwende“ — rechter Teil des Triptychons", "Szkic do ceramicznego panneau „Przesilenie” — prawa część tryptyku"]};
const groups=[
{title:["Птицы на ветвях", "Птахи на гілках", "Birds on Branches", "Vögel auf Zweigen", "Ptaki na gałęziach"],files:['050']},
{title:["Пластика леса", "Пластика лісу", "Forms of the Forest", "Formen des Waldes", "Formy lasu"],files:['060','059']},
{title:["Линия и силуэт", "Лінія й силует", "Line and Silhouette", "Linie und Silhouette", "Linia i sylweta"],files:['0065','001']},
{title:["Орнаментальные сосуды. Встречи", "Орнаментальні посудини. Зустрічі", "Ornamental Vessels. Encounters", "Ornamentale Gefäße. Begegnungen", "Ornamentalne naczynia. Spotkania"],files:['vase-one','vase-two','vase-eight','vase-three'],realised:true},
{title:["Рыба, съевшая луну", "Риба, що з’їла місяць", "The Fish That Ate the Moon", "Der Fisch, der den Mond verschlang", "Ryba, która zjadła księżyc"],files:['moonfish']},
{title:["Капитал идентичности", "Капітал ідентичності", "Identity Capital", "Identitätskapital", "Kapitał tożsamości"],year:'2022',files:["identity-layout","identity-colour","identity-perspective","identity-render-2","identity-render-5","identity-render-1","identity-vertical","identity-detail","identity-render-4"]},
{title:["Листья и сады", "Листя й сади", "Leaves and Gardens", "Blätter und Gärten", "Liście i ogrody"],files:['033','botanical-plates','032','049']},
{title:["Сад внутри формы", "Сад усередині форми", "A Garden Within a Form", "Garten in einer Form", "Ogród wewnątrz formy"],files:['042','041','040']},
{title:["Переплетения ритмов", "Переплетення ритмів", "Interwoven Rhythms", "Verflochtene Rhythmen", "Przeplatające się rytmy"],files:['023']},
{title:["Птицы, цветы и движение", "Птахи, квіти й рух", "Birds, Flowers and Motion", "Vögel, Blumen und Bewegung", "Ptaki, kwiaty i ruch"],files:['030','031','029','028']},
{title:["Ветви. Поиск сервиза", "Гілки. Пошук сервізу", "Branches. Tableware Studies", "Zweige. Geschirrentwürfe", "Gałęzie. Poszukiwania serwisu"],files:['018','015','016','019']},
{title:["Рыбы. Поиск формы", "Риби. Пошук форми", "Fish. Studies of Form", "Fische. Formstudien", "Ryby. Poszukiwania formy"],files:['022']},
{title:names['bird-moon'],files:['bird-moon']},
{title:["Стаканы. Ритмы поверхности", "Склянки. Ритми поверхні", "Drinking Vessels. Surface Rhythms", "Trinkbecher. Oberflächenrhythmen", "Kubki do napojów. Rytmy powierzchni"],files:['051','053'],materials:true},
{title:["Листья за столом", "Листя за столом", "Leaves at the Table", "Blätter am Tisch", "Liście przy stole"],files:['056','055'],materials:true}];

const materialNames=[['Акварель','белая гуашь','маркер','линер','цветные карандаши','карандаш','3D-моделирование'],['Акварель','біла гуаш','маркер','лінер','кольорові олівці','олівець','3D-моделювання'],['Watercolour','white gouache','marker','fineliner','coloured pencils','pencil','3D modelling'],['Aquarell','weiße Gouache','Marker','Fineliner','Buntstifte','Bleistift','3D-Modellierung'],['Akwarela','biały gwasz','marker','cienkopis','kredki','ołówek','modelowanie 3D']][l];
const specifications=[[0,1,2,3],[0,1,2,3],[3],[0,1,2,3,4],[0,1,2,3,4],[6],[0,5,2,3],[0,1,2,3],[0,2,3],[0,2,3],[0,1,5,2,3],[0,3],[0,1,4,2,3],[0,2,3],[0,2,3]];
groups.forEach((group,i)=>{group.medium=specifications[i].map(n=>materialNames[n]).join(', ');group.medium=group.medium.charAt(0).toUpperCase()+group.medium.slice(1);group.dimensions=i===5?'':i===4?'42 × 59,4':i===12?'50 × 70':'21 × 29,7'});
[groups[12],groups[14]]=[groups[14],groups[12]];
const src=file=>'assets/sketches-projects/paper-v3/'+file+(['identity-render-2','identity-detail','identity-vertical'].includes(file)?'.jpg':'.png')+(['051','053','056','055','063'].includes(file)?'?v=seamless':(['moonfish','bird-moon'].includes(file)?'?v=colour2':''));
for(const group of groups)for(const file of group.files)works.push({id:'sketch-'+file,category:'sketches',title:names[file][l],meta:group.year||'2017–2021',alt:names[file][l]});
const oldImage=imageMarkup;
imageMarkup=function(id,original=false){if(!id.startsWith('sketch-'))return oldImage(id,original);const file=id.slice(7);return '<span class="art-window sketch-window"><img src="'+src(file)+'" alt="'+names[file][l]+'" loading="lazy" decoding="async"></span>'};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
const indexes=new Map();

function carousel(group){
 let index=indexes.get(group)||0;
 const section=el('section','sketch-series');section.setAttribute('aria-label',group.title[l]);section.append(el('h3','sketch-series-title',group.title[l]));
 const region=el('div','project-carousel');region.setAttribute('role','region');region.setAttribute('aria-label',group.title[l]);
 const stage=el('div','project-stage');stage.tabIndex=0;
 const imageButton=el('button','project-image');imageButton.type='button';imageButton.setAttribute('aria-label',text[4]);const image=el('img');image.loading='lazy';image.decoding='async';image.draggable=false;imageButton.append(image);
 const action=(label,txt,cls,fn)=>{const b=el('button',cls,txt);b.type='button';b.setAttribute('aria-label',label);b.onclick=fn;return b};
 stage.append(imageButton,action(text[2],'←','project-arrow project-prev',()=>set(index-1)),action(text[3],'→','project-arrow project-next',()=>set(index+1)));region.append(stage);
 const caption=el('div','project-caption');const name=el('span','sketch-caption');name.setAttribute('aria-live','polite');const counter=el('span','project-counter');caption.append(name,counter,el('span','sketch-period',group.year||'2017–2021'));region.append(caption);
 const thumbs=el('div','project-thumbnails');thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label',group.title[l]);const buttons=group.files.map((file,i)=>{const b=action(names[file][l],'','',()=>set(i));const img=el('img');img.src=src(file);img.alt='';img.loading='lazy';b.append(img);thumbs.append(b);return b});if(group.files.length>1)region.append(thumbs);else{stage.children[1].hidden=true;stage.children[2].hidden=true;counter.hidden=true}section.append(region);
 const details=el('dl','graphic-details');
 details.append(el('dt','',["Материалы", "Матеріали", "Medium", "Materialien", "Materiały"][l]),el('dd','',group.medium));
 if(group.dimensions)details.append(el('dt','',["Размеры (В × Ш)", "Розміри (В × Ш)", "Dimensions (H × W)", "Maße (H × B)", "Wymiary (wys. × szer.)"][l]),el('dd','',(lang==='en'?group.dimensions.replace(/,/g,'.'):group.dimensions)+' '+["см", "см", "cm", "cm", "cm"][l]));
 section.append(details);
 if(group.realised)section.append(el('p','sketch-project-note', ["Эскизы к реализованной керамической композиции «Встречи». Работа представлена в разделе керамики.", "Ескізи до реалізованої керамічної композиції «Зустрічі». Робота представлена в розділі кераміки.", "Sketches for the realised ceramic composition “Encounters”, presented in the ceramics section.", "Entwürfe zur realisierten keramischen Komposition „Begegnungen“, die im Bereich Keramik vorgestellt wird.", "Szkice do zrealizowanej kompozycji ceramicznej „Spotkania”, prezentowanej w dziale ceramiki."][l]));
 function set(n){index=(n+group.files.length)%group.files.length;indexes.set(group,index);const file=group.files[index];image.src=src(file);image.alt=names[file][l];name.textContent=names[file][l];counter.textContent=String(index+1).padStart(2,'0')+' / '+String(group.files.length).padStart(2,'0');buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));b.classList.toggle('selected',i===index)})}
 let start=null,swiped=false;
 stage.addEventListener('touchstart',e=>{if(e.touches.length===1){start={x:e.touches[0].clientX,y:e.touches[0].clientY};swiped=false}},{passive:true});
 stage.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swiped=true;set(index+(dx<0?1:-1))}},{passive:true});
 imageButton.onclick=()=>{if(swiped){swiped=false;return}filtered=group.files.map(file=>byId('sketch-'+file));openArt('sketch-'+group.files[index],imageButton)};
 region.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();set(index+(e.key==='ArrowLeft'?-1:1))}});set(index);return section;
}
const bar=document.querySelector('.filters'),button=el('button');button.type='button';button.dataset.filter='sketches';button.setAttribute('aria-controls','gallery');button.setAttribute('aria-pressed','false');button.append(document.createTextNode(text[0]+' '),el('span','',String(new Set(groups.flatMap(group=>group.files)).size)));bar.append(button);
const oldFilter=filter;
filter=function(category){oldFilter(category);if(category==='sketches'){document.getElementById('category-description').textContent=text[1];document.getElementById('gallery').replaceChildren(...groups.map(carousel))}};
button.onclick=()=>{filter('sketches');history.replaceState(null,'','#sketches')};
const nav=document.getElementById('main-nav'),link=el('a','',text[0]);link.href='#sketches';link.dataset.category='sketches';const graphics=nav.querySelector('[data-category="graphics"]');if(graphics)graphics.after(link);else nav.append(link);
function fromHash(){if(location.hash==='#sketches'){filter('sketches');requestAnimationFrame(()=>document.getElementById('works').scrollIntoView({block:'start'}))}}
window.addEventListener('hashchange',fromHash);fromHash();
})();
