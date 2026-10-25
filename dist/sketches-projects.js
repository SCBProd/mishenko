(()=>{
'use strict';
const lang=document.documentElement.lang;
const l=lang==='ru'?0:lang==='uk'?1:2;
const text=[['Эскизы/проекты','Ескізи/проєкти','Sketches/projects'],['Связанные эскизы объединены в серии. Листайте стрелками или свайпом.','Пов’язані ескізи об’єднано в серії. Гортайте стрілками або свайпом.','Related sketches are grouped into series. Use arrows or swipe.'],['Предыдущий эскиз','Попередній ескіз','Previous sketch'],['Следующий эскиз','Наступний ескіз','Next sketch'],['Увеличить','Збільшити','Enlarge']].map(a=>a[l]);
const names={
'001':['Ритм линий','Ритм ліній','Rhythm of Lines'],
'0065':['Птицы в круге','Птахи в колі','Birds in a Circle'],
'015':['Сервиз «Ветви»','Сервіз «Гілки»','Branches — Tableware Study'],
'016':['Ветвление цвета','Розгалуження кольору','Branching Colour'],
'017':['Течение формы','Плин форми','Flow of Form'],
'018':['Диалог силуэтов','Діалог силуетів','Dialogue of Silhouettes'],
'019':['Вариации чайного сервиза','Варіації чайного сервізу','Tea Set Variations'],
'023':['Орнаментальные ритмы','Орнаментальні ритми','Ornamental Rhythms'],
'024':['Геометрия цвета','Геометрія кольору','Geometry of Colour'],
'025':['Птицы и рыбы','Птахи й риби','Birds and Fish'],
'028':['Птицы среди узоров','Птахи серед візерунків','Birds Among Patterns'],
'029':['Птица в цветущем саду','Птах у квітучому саду','Bird in a Flowering Garden'],
'030':['Цветение и движение','Цвітіння й рух','Bloom and Motion'],
'031':['Птицы над рекой','Птахи над рікою','Birds Above the River'],
'050':['Птицы на ветвях','Птахи на гілках','Birds on Branches'],
'032':['Листья и фактуры','Листя й фактури','Leaves and Textures'],
'033':['Сад у воды','Сад біля води','Garden by the Water'],
'049':['Ботанические орнаменты','Ботанічні орнаменти','Botanical Ornaments'],
'botanical':['Венок из листьев','Вінок із листя','Wreath of Leaves'],
'041':['Сад в круге','Сад у колі','Garden in a Circle'],
'042':['Сосуды-сады','Посудини-сади','Garden Vessels']};
const groups=[
{title:['Линия и силуэт','Лінія й силует','Line and Silhouette'],files:['001','0065']},
{title:['Ветви. Поиск сервиза','Гілки. Пошук сервізу','Branches. Tableware Studies'],files:['015','016','017','018','019']},
{title:['Геометрия орнамента','Геометрія орнаменту','Geometry of Ornament'],files:['023','024']},
{title:['Птицы, цветы и движение','Птахи, квіти й рух','Birds, Flowers and Motion'],files:['025','028','029','030','031','050']},
{title:['Листья и сады','Листя й сади','Leaves and Gardens'],files:['032','033','049','botanical']},
{title:['Сад внутри формы','Сад усередині форми','A Garden Within a Form'],files:['041','042']}];
const src=file=>'assets/sketches-projects/retouched/'+file+'.png';
for(const group of groups)for(const file of group.files)works.push({id:'sketch-'+file,category:'sketches',title:names[file][l],meta:'',alt:names[file][l]});
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
 const caption=el('div','project-caption');const name=el('span','sketch-caption');name.setAttribute('aria-live','polite');const counter=el('span','project-counter');caption.append(name,counter);region.append(caption);
 const thumbs=el('div','project-thumbnails');thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label',group.title[l]);const buttons=group.files.map((file,i)=>{const b=action(names[file][l],'','',()=>set(i));const img=el('img');img.src=src(file);img.alt='';img.loading='lazy';b.append(img);thumbs.append(b);return b});region.append(thumbs);section.append(region);
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
