(() => {
  const lang=document.documentElement.lang;
  const strings={
    ru:['Скульптура','Декорирование посуды','Декоративное панно','Графика','Живопись','Форма. Чувство. Смысл.','Орнамент, цвет и повседневный предмет.','Цвет, рельеф и ритм.'],
    uk:['Скульптура','Декорування посуду','Декоративне панно','Графіка','Живопис','Форма. Почуття. Сенс.','Орнамент, колір і повсякденний предмет.','Колір, рельєф і ритм.'],
    en:['Sculpture','Decorated tableware','Decorative panels','Graphic art','Painting','Form. Feeling. Meaning.','Ornament, colour and the everyday object.','Colour, relief and rhythm.'],
    de:['Skulptur','Geschirrdekoration','Dekorative Wandbilder','Grafik','Malerei','Form. Gefühl. Bedeutung.','Ornament, Farbe und das Alltagsobjekt.','Farbe, Relief und Rhythmus.'],
    pl:['Rzeźba','Dekorowanie naczyń','Panele dekoracyjne','Grafika','Malarstwo','Forma. Uczucie. Znaczenie.','Ornament, kolor i przedmiot codzienny.','Kolor, relief i rytm.']
  };
  const t=strings[lang]||strings.en;
  const bar=document.querySelector('.filters'),nav=document.getElementById('main-nav');
  const categories=['ceramics','tableware','graphics','painting'];
  const projects=window.portfolioProjects||[];
  ['tableware'].forEach((category,i)=>{
    const b=document.createElement('button');b.type='button';b.dataset.filter=category;b.textContent=t[i+1]+' ';
    const count=document.createElement('span');count.textContent=String(projects.filter(p=>p.category===category).length).padStart(2,'0');b.append(count);bar.append(b);
  });
  categories.forEach(category=>{const b=bar.querySelector(`[data-filter="${category}"]`);b.setAttribute('aria-controls','gallery');bar.append(b)});
  document.querySelector('#works .section-heading>p').textContent=t[5];
  const sculpture=nav.querySelector('[href="#works"]');sculpture.textContent=t[0];sculpture.dataset.category='ceramics';
  let previous=sculpture;
  [['tableware',t[1]],['graphics',t[3]]].forEach(([category,label])=>{const a=document.createElement('a');a.href=category==='tableware'?'#tableware':'#graphics';a.textContent=label;a.dataset.category=category;previous.after(a);previous=a});
  const baseFilter=filter;
  filter=function(category){
    baseFilter(category);
    if(category==='tableware')document.getElementById('category-description').textContent=t[6];
  };
  const paintingYears={p01:2019,p02:2017,p03:2017,'study-copy-2016':2016,'university-embankment-copy-2016':2016};
  works.filter(w=>w.category==='painting').forEach(w=>{w.meta=String(paintingYears[w.id]||w.meta.match(/\b(?:19|20)\d{2}\b/)?.[0]||'')});
  function select(category,scroll=true){
    filter(category);
    if(scroll)document.getElementById('works').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    nav.classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
  }
  bar.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>select(b.dataset.filter));
  function scrollToSection(target){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const header=document.querySelector('.site-header');
      const top=target.getBoundingClientRect().top+window.scrollY-(header?.getBoundingClientRect().height||0)-16;
      window.scrollTo({top:Math.max(0,top),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }));
  }
  document.querySelector('.site-header').addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a)return;
    const category=a.dataset.category;
    const target=category?document.getElementById('works'):document.querySelector(a.getAttribute('href'));
    if(!target)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(category)select(category,false);
    nav.classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
    history.replaceState(null,'',a.getAttribute('href'));
    scrollToSection(target);
  },true);
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>select(b.dataset.go));
  function fromHash(){const category={tableware:'tableware',panels:'ceramics',solstice:'ceramics',graphics:'graphics',painting:'painting'}[location.hash.slice(1)];if(category)select(category)}
  window.addEventListener('hashchange',fromHash);
  select(document.querySelector('[data-filter].active')?.dataset.filter||'ceramics',false);
  if(location.hash)fromHash();
})();
