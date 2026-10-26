(()=>{
 'use strict';
 const lang=document.documentElement.lang;
 const translations={
 en:{previous:'Previous photo',next:'Next photo',enlarge:'Enlarge photo',close:'Close',read:'Read the full concept',less:'Hide the full text',hint:'9 photographs · use arrows or swipe',photo:'Photo',carousel:'carousel',views:['Two parts — front view','Composition with the figure in front','Three-quarter view','The two elements, separated','View from above','The independent figure','Connection between the elements','Poppies and geometric ornament','Surface and glaze detail']},
 ru:{previous:'Предыдущее фото',next:'Следующее фото',enlarge:'Увеличить фото',close:'Закрыть',read:'Читать полный замысел',less:'Свернуть полный текст',hint:'9 фотографий · листайте стрелками или свайпом',photo:'Фото',carousel:'карусель',views:['Две части — вид спереди','Композиция с фигурой на переднем плане','Вид в три четверти','Два элемента отдельно','Вид сверху','Самостоятельная фигура','Взаимосвязь элементов','Маки и геометрический орнамент','Фактура и глазурь']},
 uk:{previous:'Попереднє фото',next:'Наступне фото',enlarge:'Збільшити фото',close:'Закрити',read:'Читати повний задум',less:'Згорнути повний текст',hint:'9 фотографій · гортайте стрілками або свайпом',photo:'Фото',carousel:'карусель',views:['Дві частини — вигляд спереду','Композиція з постаттю на передньому плані','Вигляд у три чверті','Два елементи окремо','Вигляд згори','Самостійна постать','Взаємозв’язок елементів','Маки та геометричний орнамент','Фактура та полива']},
 de:{previous:'Vorheriges Foto',next:'Nächstes Foto',enlarge:'Foto vergrößern',close:'Schließen',read:'Das vollständige Konzept lesen',less:'Vollständigen Text einklappen',hint:'9 Fotos · mit Pfeilen oder Wischen blättern',photo:'Foto',carousel:'Karussell',views:['Zwei Teile — Vorderansicht','Komposition mit Figur im Vordergrund','Dreiviertelansicht','Die beiden getrennten Elemente','Ansicht von oben','Die eigenständige Figur','Verbindung der Elemente','Mohnblumen und geometrisches Ornament','Oberfläche und Glasur im Detail']},
 pl:{previous:'Poprzednie zdjęcie',next:'Następne zdjęcie',enlarge:'Powiększ zdjęcie',close:'Zamknij',read:'Przeczytaj pełną koncepcję',less:'Zwiń pełny tekst',hint:'9 zdjęć · użyj strzałek lub przesuń palcem',photo:'Zdjęcie',carousel:'karuzela',views:['Dwie części — widok z przodu','Kompozycja z postacią na pierwszym planie','Widok z trzech czwartych','Dwa oddzielne elementy','Widok z góry','Samodzielna postać','Relacja między elementami','Maki i ornament geometryczny','Faktura i szkliwo']}
 };
 const t=translations[lang]||translations.en;
 const collectionOrder=['devastated','moment','goodness','white-poppies','in-the-line-of-fire','encounters','from-the-inside','deep-exhalation','different','shadows-of-2022','identity-capital','shadows-2021'];
 const rank=new Map(collectionOrder.map((id,i)=>[id,i]));
 const projects=[...(window.portfolioProjects||[])].sort((a,b)=>(rank.get(a.id)??Infinity)-(rank.get(b.id)??Infinity));
 const indexes=new Map();
 function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
 function btn(label,content,action){const b=el('button','',content);b.type='button';b.setAttribute('aria-label',label);b.title=label;b.onclick=action;return b}
 function makeProject(project){
  const data=project.text[lang]||project.text.en,photos=project.photos;
  const views=data.views||t.views;
  const hint=photos.length>1?t.hint.replace('9',String(photos.length)):t.enlarge;
  let index=indexes.get(project.id)||0,lastTrigger;
  const article=el('article','project-work');article.id=project.id;
  if(photos.length===1)article.classList.add('single-photo');
  if(!data.question)article.classList.add('no-question');
  if(!data.paragraphs.length)article.classList.add('short-concept');
  const heading=el('header','project-heading');const identity=el('div');
  identity.append(el('p','eyebrow',data.medium+(project.year?' / '+project.year:'')),el('h3','project-title',data.title));
  heading.append(identity);if(project.year)heading.append(el('span','project-year',String(project.year)));article.append(heading);
  const layout=el('div','project-layout');article.append(layout);
  const carousel=el('div','project-carousel');carousel.setAttribute('role','region');carousel.setAttribute('aria-roledescription',t.carousel);carousel.setAttribute('aria-label',data.title);
  const stage=el('div','project-stage');stage.tabIndex=0;stage.setAttribute('aria-label',data.title+' — '+hint);
  const main=el('img');main.loading='lazy';main.decoding='async';main.width=2048;main.height=1536;main.draggable=false;
  const imageButton=btn(t.enlarge,'',()=>openViewer(imageButton));imageButton.className='project-image';imageButton.append(main);
  const prev=btn(t.previous,'←',()=>step(-1));prev.className='project-arrow project-prev';
  const next=btn(t.next,'→',()=>step(1));next.className='project-arrow project-next';
  const zoom=btn(t.enlarge,'',()=>openViewer(zoom));zoom.className='project-zoom';zoom.innerHTML='<svg class="zoom-vector" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18 18 6M7 6h11v11"/></svg>';
  stage.append(imageButton,prev,next,zoom);carousel.append(stage);
  const caption=el('div','project-caption'),viewLabel=el('span'),counter=el('span','project-counter');counter.setAttribute('aria-live','polite');counter.setAttribute('aria-atomic','true');caption.append(viewLabel,counter);carousel.append(caption);
  carousel.append(el('p','project-hint',hint));
  if(project.photoCredit){const label={ru:'Фото',uk:'Фото',en:'Photography',de:'Fotografie',pl:'Fotografia'}[lang]||'Photography';carousel.append(el('p','project-photo-credit',label+': '+project.photoCredit))}
  const thumbnails=el('div','project-thumbnails');thumbnails.setAttribute('role','group');thumbnails.setAttribute('aria-label',data.title+' — '+t.photo);
  const thumbButtons=photos.map((photo,i)=>{
   const b=btn(t.photo+' '+(i+1)+' — '+views[photo.view],'',()=>set(i));
   const img=el('img');img.src=photo.src;img.alt='';img.loading='lazy';img.width=80;img.height=60;b.append(img);thumbnails.append(b);return b;
  });carousel.append(thumbnails);layout.append(carousel);
  const copy=el('div','project-intro');copy.append(el('p','project-question',data.question),el('p','project-summary',data.intro));
  if(data.facts){const facts=el('dl','project-facts');for(const [label,value] of data.facts){const row=el('div');row.append(el('dt','',label),el('dd','',value));facts.append(row)}copy.append(facts)}
  layout.append(copy);
  const details=el('details','project-concept');details.id=project.id+'-concept';
  const summary=el('summary'),summaryLabel=el('span','',t.read),sign=el('span','','+');sign.setAttribute('aria-hidden','true');summary.append(summaryLabel,sign);
  const prose=el('div','project-prose');data.paragraphs.forEach((p,i)=>prose.append(el('p',(project.emphasis||[5,11,13]).includes(i)?'project-emphasis':'',p)));
  details.append(summary,prose);article.append(details);details.ontoggle=()=>{summaryLabel.textContent=details.open?t.less:t.read};
  const dialog=el('dialog','project-dialog');dialog.setAttribute('aria-label',data.title);article.append(dialog);
  const modalHeader=el('header'),modalTitle=el('span','',data.title),close=btn(t.close,t.close+' ×',()=>dialog.close());modalHeader.append(modalTitle,close);
  const modalStage=el('div','project-modal-stage');modalStage.tabIndex=0;
  const modalImage=el('img');modalImage.draggable=false;
  modalStage.append(btn(t.previous,'←',()=>step(-1)),modalImage,btn(t.next,'→',()=>step(1)));
  const modalFooter=el('footer'),modalCaption=el('span'),modalCounter=el('span');modalCounter.setAttribute('aria-live','polite');modalFooter.append(modalCaption,modalCounter);dialog.append(modalHeader,modalStage,modalFooter);
  function set(n){
   index=(n+photos.length)%photos.length;indexes.set(project.id,index);
   const photo=photos[index],alt=data.title+' — '+views[photo.view];
   main.src=photo.src;main.alt=alt;viewLabel.textContent=views[photo.view];counter.textContent=String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');
   thumbButtons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));b.classList.toggle('selected',i===index)});
   const selected=thumbButtons[index];thumbnails.scrollTo({left:Math.max(0,selected.offsetLeft-thumbnails.offsetLeft-thumbnails.clientWidth/2+selected.clientWidth/2),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
   if(dialog.open)updateModal();
  }
  function step(n){set(index+n)}
  function updateModal(){modalImage.src=photos[index].src;modalImage.alt=main.alt;modalCaption.textContent=viewLabel.textContent;modalCounter.textContent=counter.textContent}
  function openViewer(trigger){lastTrigger=trigger;dialog.showModal();updateModal();document.body.classList.add('modal-open');close.focus()}
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus({preventScroll:true})});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  function keys(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1)}}
  carousel.addEventListener('keydown',keys);dialog.addEventListener('keydown',keys);
  function swipe(target){let start,swiped=false;target.addEventListener('touchstart',e=>{if(e.touches.length===1){start={x:e.touches[0].clientX,y:e.touches[0].clientY};swiped=false}},{passive:true});target.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){swiped=true;step(dx<0?1:-1)}},{passive:true});target.addEventListener('click',e=>{if(swiped){e.preventDefault();e.stopPropagation();swiped=false}},true)}
  swipe(stage);swipe(modalStage);set(index);return article;
 }
 // Replace the provisional single-photo entry only for this selected concept.
 const replaced=new Set(projects.flatMap(p=>p.replaces||[]));
 // c09 is an empty provisional asset; omit that broken card in the active concept.
 for(let i=works.length-1;i>=0;i--)if(replaced.has(works[i].id)||['c09','c11'].includes(works[i].id))works.splice(i,1);
 const originalFilter=filter;
 filter=function(category){
  originalFilter(category);
  const selected=projects.filter(p=>p.category===category),gallery=document.getElementById('gallery');
  for(const project of [...selected].reverse())gallery.prepend(makeProject(project));
  const count=works.filter(w=>w.category===category).length+selected.length;
  const counter=document.getElementById('work-count');counter.textContent=counter.textContent.replace(/^\d+/,String(count).padStart(2,'0'));
  const tab=document.querySelector(`[data-filter="${category}"] span`);if(tab)tab.textContent=String(count).padStart(2,'0');
 };
 filter(document.querySelector('[data-filter].active')?.dataset.filter||'ceramics');
})();
