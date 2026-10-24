(()=>{
 'use strict';
 const labels={ru:['Эскизы/проекты','Эскиз / проект','Поиск формы, орнамента и цвета. Страницы из рабочих альбомов.'],uk:['Ескізи/проєкти','Ескіз / проєкт','Пошук форми, орнаменту й кольору. Сторінки з робочих альбомів.'],en:['Sketches/projects','Sketch / project','Exploring form, ornament and colour. Pages from working sketchbooks.'],de:['Skizzen/Projekte','Skizze / Projekt','Form, Ornament und Farbe. Seiten aus Arbeitsbüchern.'],pl:['Szkice/projekty','Szkic / projekt','Poszukiwanie formy, ornamentu i koloru. Strony ze szkicowników.']};
 const t=labels[document.documentElement.lang]||labels.en;
 const files=['056','001','003','015','016','018','019','023','024','025','028','029','030','031','032','033','042','049','050','052','055'];
 for(const file of files)works.push({id:'sketch-'+file,category:'sketches',title:t[1]+' '+file,meta:'',alt:t[1]+' '+file});
 const previousImage=imageMarkup;
 imageMarkup=function(id,original=false){if(!id.startsWith('sketch-'))return previousImage(id,original);const file=id.slice(7);return '<span class="art-window sketch-window"><img src="assets/sketches-projects/'+file+'.jpg" alt="'+t[1]+' '+file+'" loading="lazy" decoding="async"></span>'};
 const bar=document.querySelector('.filters');
 const button=document.createElement('button');button.type='button';button.dataset.filter='sketches';button.setAttribute('aria-controls','gallery');button.setAttribute('aria-pressed','false');button.append(document.createTextNode(t[0]+' '));const count=document.createElement('span');count.textContent=String(files.length);button.append(count);bar.append(button);
 const previousFilter=filter;
 filter=function(category){previousFilter(category);if(category==='sketches')document.getElementById('category-description').textContent=t[2]};
 button.onclick=()=>{filter('sketches');history.replaceState(null,'','#sketches')};
 const nav=document.getElementById('main-nav');const link=document.createElement('a');link.href='#sketches';link.dataset.category='sketches';link.textContent=t[0];const graphics=nav.querySelector('[data-category="graphics"]');if(graphics)graphics.after(link);else nav.append(link);
 function fromHash(){if(location.hash==='#sketches'){filter('sketches');requestAnimationFrame(()=>document.getElementById('works').scrollIntoView({block:'start'}))}}
 window.addEventListener('hashchange',fromHash);fromHash();
})();
