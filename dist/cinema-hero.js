(()=>{
 const text={
 en:['Opening image','01 / The object','02 / The detail','Ceramic object with light circular decoration on a pale background','Close-up of ceramic surfaces with geometric decoration','CERAMICS / FORM','CERAMICS / SURFACE DETAIL'],
 ru:['Фотография на заставке','01 / Объект','02 / Фрагмент','Керамический объект со светлым круглым декором на светлом фоне','Крупный план керамики с геометрическим декором','КЕРАМИКА / ФОРМА','КЕРАМИКА / ФРАГМЕНТ ПОВЕРХНОСТИ'],
 uk:['Фотографія на заставці','01 / Об’єкт','02 / Фрагмент','Керамічний об’єкт зі світлим круглим декором на світлому тлі','Крупний план кераміки з геометричним декором','КЕРАМІКА / ФОРМА','КЕРАМІКА / ФРАГМЕНТ ПОВЕРХНІ'],
 de:['Titelbild','01 / Das Objekt','02 / Das Detail','Keramikobjekt mit hellem Kreisdekor vor hellem Hintergrund','Nahaufnahme keramischer Oberflächen mit geometrischem Dekor','KERAMIK / FORM','KERAMIK / OBERFLÄCHENDETAIL'],
 pl:['Zdjęcie otwierające','01 / Obiekt','02 / Fragment','Obiekt ceramiczny z jasnym okrągłym dekorem na jasnym tle','Zbliżenie ceramiki z dekoracją geometryczną','CERAMIKA / FORMA','CERAMIKA / FRAGMENT POWIERZCHNI']
 }[document.documentElement.lang];
 const hero=document.querySelector('.cinema-intro');
 const image=document.createElement('img');image.className='hero-photograph';image.fetchPriority='high';image.decoding='async';
 const caption=document.createElement('span');caption.className='hero-caption';
 const controls=document.createElement('div');controls.className='hero-arrows';controls.setAttribute('role','group');controls.setAttribute('aria-label',text[0]);
 const labels={ru:['Предыдущее фото','Следующее фото'],uk:['Попереднє фото','Наступне фото'],en:['Previous photo','Next photo'],de:['Vorheriges Foto','Nächstes Foto'],pl:['Poprzednie zdjęcie','Następne zdjęcie']}[document.documentElement.lang];
 let current=1;
 [-1,1].forEach((step,i)=>{const b=document.createElement('button');b.type='button';b.className=i?'hero-next':'hero-prev';b.setAttribute('aria-label',labels[i]);b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(i?'M9 5l7 7-7 7':'M15 5l-7 7 7 7')+'"/></svg>';b.onclick=()=>set(current===1?2:1,true);controls.append(b)});
 hero.prepend(image);hero.append(caption,controls);
 function set(n,update){
  hero.dataset.hero=String(n);image.src=`assets/hero-${n}.jpg`;image.alt=text[n+2];caption.textContent=text[n+4];
  current=n;
  if(update){const url=new URL(location.href);url.searchParams.set('hero',String(n));history.replaceState(null,'',url)}
 }
 // Always open with the selected object photograph, including older detail links.
 set(1,true);
 let startX=null;
 hero.addEventListener('touchstart',e=>{startX=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
 hero.addEventListener('touchend',e=>{if(!startX)return;const dx=e.changedTouches[0].clientX-startX.x,dy=e.changedTouches[0].clientY-startX.y;startX=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)set(current===1?2:1,true)},{passive:true});
 window.addEventListener('popstate',()=>set(new URLSearchParams(location.search).get('hero')==='2'?2:1,false));
})();
