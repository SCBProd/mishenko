(()=>{
'use strict';
const lang=document.documentElement.lang;
const l=lang==='ru'?0:lang==='uk'?1:2;
const text=[['Эскизы/проекты','Ескізи/проєкти','Sketches/projects'],['Связанные эскизы объединены в серии. Листайте стрелками или свайпом.','Пов’язані ескізи об’єднано в серії. Гортайте стрілками або свайпом.','Related sketches are grouped into series. Use arrows or swipe.'],['Предыдущий эскиз','Попередній ескіз','Previous sketch'],['Следующий эскиз','Наступний ескіз','Next sketch'],['Увеличить','Збільшити','Enlarge']].map(a=>a[l]);
const names={
"identity-layout":["Капитал идентичности. Схема композиции","Капітал ідентичності. Схема композиції","Identity Capital. Composition Layout"],
"identity-render-1":["Капитал идентичности. Визуализация I","Капітал ідентичності. Візуалізація I","Identity Capital. Visualisation I"],
"identity-render-2":["Капитал идентичности. Визуализация II","Капітал ідентичності. Візуалізація II","Identity Capital. Visualisation II"],
"identity-render-3":["Капитал идентичности. Визуализация III","Капітал ідентичності. Візуалізація III","Identity Capital. Visualisation III"],
"identity-render-4":["Капитал идентичности. Визуализация IV","Капітал ідентичності. Візуалізація IV","Identity Capital. Visualisation IV"],
"identity-render-5":["Капитал идентичности. Визуализация V","Капітал ідентичності. Візуалізація V","Identity Capital. Visualisation V"],
"identity-colour":["Капитал идентичности. Цветовое решение","Капітал ідентичності. Кольорове рішення","Identity Capital. Colour Scheme"],
'identity-010':['Капитал идентичности. Форма и фактура','Капітал ідентичності. Форма й фактура','Identity Capital. Form and Texture'],
'identity-1':['Капитал идентичности. Поиск силуэта','Капітал ідентичності. Пошук силуету','Identity Capital. Silhouette Studies'],
'identity-2':['Капитал идентичности. Вариации композиции','Капітал ідентичності. Варіації композиції','Identity Capital. Composition Variations'],
'001':['Ритм линий','Ритм ліній','Rhythm of Lines'],
'0065':['Птицы в круге','Птахи в колі','Birds in a Circle'],
'015':['Сервиз «Ветви»','Сервіз «Гілки»','Branches — Tableware Study'],
'016':['Ветвление цвета','Розгалуження кольору','Branching Colour'],
'017':['Течение формы','Плин форми','Flow of Form'],
'018':['Диалог силуэтов','Діалог силуетів','Dialogue of Silhouettes'],
'019':['Вариации чайного сервиза','Варіації чайного сервізу','Tea Set Variations'],
'023':['Орнаментальные ритмы','Орнаментальні ритми','Ornamental Rhythms'],

'028':['Птицы среди узоров','Птахи серед візерунків','Birds Among Patterns'],
'029':['Птица в цветущем саду','Птах у квітучому саду','Bird in a Flowering Garden'],
'030':['Цветение и движение','Цвітіння й рух','Bloom and Motion'],
'031':['Птицы над рекой','Птахи над рікою','Birds Above the River'],
'050':['Птицы на ветвях','Птахи на гілках','Birds on Branches'],
'032':['Листья и фактуры','Листя й фактури','Leaves and Textures'],
'033':['Сад у воды','Сад біля води','Garden by the Water'],
'049':['Ботанические орнаменты','Ботанічні орнаменти','Botanical Ornaments'],

'041':['Сад в круге','Сад у колі','Garden in a Circle'],
'042':['Сосуды-сады','Посудини-сади','Garden Vessels'],
'040':['Подсолнух над рекой','Соняшник над рікою','Sunflower Above the River'],
'058':['Рогатые силуэты','Рогаті силуети','Antlered Silhouettes'],
'059':['Лесные характеры','Лісові характери','Forest Characters'],
'060':['Между сосудом и зверем','Між посудиною і звіром','Between Vessel and Creature'],
'067':['Птицы в листве','Птахи в листі','Birds Among Leaves'],
'005':['Солнце, луна и птицы','Сонце, місяць і птахи','Sun, Moon and Birds'],
'066':['Полёт сквозь ветви','Політ крізь гілки','Flight Through Branches'],
'022':['Рыбы. Поиск формы','Риби. Пошук форми','Fish. Studies of Form'],
'moonfish':['Рыба, съевшая луну','Риба, що з’їла місяць','The Fish That Ate the Moon'],
'vase-eight':['Сосуды. Цветовые пробы','Посудини. Кольорові проби','Vessels. Colour Studies'],
'vase-one':['Конструкция и линия','Конструкція й лінія','Structure and Line'],
'vase-two':['Ритмы орнамента','Ритми орнаменту','Rhythms of Ornament'],
'vase-three':['Цветовые сочетания','Кольорові поєднання','Colour Combinations'],
'botanical-plates':['Листья и цветы. Проект тарелок','Листя й квіти. Проєкт тарілок','Leaves and Flowers. Plate Designs'],
'bird-moon':['Эскиз к керамическому панно «Солнцестояние» — правая часть триптиха','Ескіз до керамічного панно «Сонцестояння» — права частина триптиха','Sketch for “Solstice” ceramic panel — right part of the triptych']};
const groups=[
{title:['Птицы на ветвях','Птахи на гілках','Birds on Branches'],files:['050']},
{title:['Пластика леса','Пластика лісу','Forms of the Forest'],files:['060','059','058']},
{title:['Линия и силуэт','Лінія й силует','Line and Silhouette'],files:['0065','001','067','005','066']},
{title:['Орнаментальные сосуды','Орнаментальні посудини','Ornamental Vessels'],files:['vase-one','vase-eight','vase-two','vase-three'],realised:true},
{title:['Рыба, съевшая луну','Риба, що з’їла місяць','The Fish That Ate the Moon'],files:['moonfish']},
{title:['Капитал идентичности','Капітал ідентичності','Identity Capital'],files:['identity-010','identity-1','identity-2',"identity-layout","identity-render-1","identity-render-2","identity-render-3","identity-render-4","identity-render-5","identity-colour"]},
{title:['Листья и сады','Листя й сади','Leaves and Gardens'],files:['033','botanical-plates','032','049']},
{title:['Сад внутри формы','Сад усередині форми','A Garden Within a Form'],files:['042','041','040']},
{title:['Геометрия орнамента','Геометрія орнаменту','Geometry of Ornament'],files:['023']},
{title:['Птицы, цветы и движение','Птахи, квіти й рух','Birds, Flowers and Motion'],files:['030','031','029','028']},
{title:['Ветви. Поиск сервиза','Гілки. Пошук сервізу','Branches. Tableware Studies'],files:['018','015','016','017','019']},
{title:['Рыбы. Поиск формы','Риби. Пошук форми','Fish. Studies of Form'],files:['022']},
{title:names['bird-moon'],files:['bird-moon']}];
const src=file=>'assets/sketches-projects/paper-v3/'+file+(file==='identity-render-2'?'.jpg':'.png')+(['moonfish','bird-moon'].includes(file)?'?v=colour2':'');
for(const group of groups)for(const file of group.files)works.push({id:'sketch-'+file,category:'sketches',title:names[file][l],meta:'2017–2021',alt:names[file][l]});
const oldImage=imageMarkup;
imageMarkup=function(id,original=false){if(!id.startsWith('sketch-'))return oldImage(id,original);const file=id.slice(7);return '<span class="art-window sketch-window"><img src="'+src(file)+'" alt="'+names[file][l]+'" loading="lazy" decoding="async"></span>'};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
const indexes=new Map();
function carousel(group){
 let index=indexes.get(group)||0;
 const section=el('section','sketch-series');section.setAttribute('aria-label',group.title[l]);section.append(el('h3','sketch-series-title',group.title[l]),el('p','sketch-period','2017–2021'));
 const region=el('div','project-carousel');region.setAttribute('role','region');region.setAttribute('aria-label',group.title[l]);
 const stage=el('div','project-stage');stage.tabIndex=0;
 const imageButton=el('button','project-image');imageButton.type='button';imageButton.setAttribute('aria-label',text[4]);const image=el('img');image.loading='lazy';image.decoding='async';image.draggable=false;imageButton.append(image);
 const action=(label,txt,cls,fn)=>{const b=el('button',cls,txt);b.type='button';b.setAttribute('aria-label',label);b.onclick=fn;return b};
 stage.append(imageButton,action(text[2],'←','project-arrow project-prev',()=>set(index-1)),action(text[3],'→','project-arrow project-next',()=>set(index+1)));region.append(stage);
 const caption=el('div','project-caption');const name=el('span','sketch-caption');name.setAttribute('aria-live','polite');const counter=el('span','project-counter');caption.append(name,counter);region.append(caption);
 const thumbs=el('div','project-thumbnails');thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label',group.title[l]);const buttons=group.files.map((file,i)=>{const b=action(names[file][l],'','',()=>set(i));const img=el('img');img.src=src(file);img.alt='';img.loading='lazy';b.append(img);thumbs.append(b);return b});if(group.files.length>1)region.append(thumbs);else{stage.children[1].hidden=true;stage.children[2].hidden=true;counter.hidden=true}section.append(region);
 if(group.realised)section.append(el('p','sketch-project-note', ['Эскизы к реализованной керамической композиции «Встречи». Работа представлена в разделе керамики.','Ескізи до реалізованої керамічної композиції «Зустрічі». Робота представлена в розділі кераміки.','Sketches for the realised ceramic composition “Encounters”, presented in the ceramics section.'][l]));
 function set(n){index=(n+group.files.length)%group.files.length;indexes.set(group,index);const file=group.files[index];image.src=src(file);image.alt=names[file][l];name.textContent=names[file][l];counter.textContent=String(index+1).padStart(2,'0')+' / '+String(group.files.length).padStart(2,'0');buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));b.classList.toggle('selected',i===index)})}
 let start=null,swiped=false;
 stage.addEventListener('touchstart',e=>{if(e.touches.length===1){start={x:e.touches[0].clientX,y:e.touches[0].clientY};swiped=false}},{passive:true});
 stage.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swiped=true;set(index+(dx<0?1:-1))}},{passive:true});
 imageButton.onclick=()=>{if(swiped){swiped=false;return}filtered=group.files.map(file=>byId('sketch-'+file));openArt('sketch-'+group.files[index],imageButton)};
 region.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();set(index+(e.key==='ArrowLeft'?-1:1))}});set(index);return section;
}
const bar=document.querySelector('.filters'),button=el('button');button.type='button';button.dataset.filter='sketches';button.setAttribute('aria-controls','gallery');button.setAttribute('aria-pressed','false');button.append(document.createTextNode(text[0]+' '),el('span','',String(Object.keys(names).length)));bar.append(button);
const oldFilter=filter;
filter=function(category){oldFilter(category);if(category==='sketches'){document.getElementById('category-description').textContent=text[1];document.getElementById('gallery').replaceChildren(...groups.map(carousel))}};
button.onclick=()=>{filter('sketches');history.replaceState(null,'','#sketches')};
const nav=document.getElementById('main-nav'),link=el('a','',text[0]);link.href='#sketches';link.dataset.category='sketches';const graphics=nav.querySelector('[data-category="graphics"]');if(graphics)graphics.after(link);else nav.append(link);
function fromHash(){if(location.hash==='#sketches'){filter('sketches');requestAnimationFrame(()=>document.getElementById('works').scrollIntoView({block:'start'}))}}
window.addEventListener('hashchange',fromHash);fromHash();
})();
