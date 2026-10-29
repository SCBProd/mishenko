(()=>{
 'use strict';
 let theme='dark';
 try{theme=localStorage.getItem('km-cinema-theme')==='light'?'light':'dark'}catch{}
 document.documentElement.dataset.theme=theme;
 const labels={en:['Switch to light theme','Switch to dark theme','Light','Dark'],uk:['Увімкнути світлу тему','Увімкнути темну тему','Світла','Темна'],ru:['Включить светлую тему','Включить тёмную тему','Светлая','Тёмная'],de:['Zum hellen Design wechseln','Zum dunklen Design wechseln','Hell','Dunkel'],pl:['Włącz jasny motyw','Włącz ciemny motyw','Jasny','Ciemny']};
 document.addEventListener('DOMContentLoaded',()=>{
  const button=document.getElementById('theme-toggle');
  const lang=document.documentElement.lang;
  const text=labels[lang]||labels.en;
  function render(){
   const light=theme==='light';
   document.documentElement.dataset.theme=theme;
   document.querySelector('meta[name="theme-color"]').content=light?'#f2eee6':'#191919';
   button.setAttribute('aria-label',text[light?1:0]);
   button.setAttribute('title',text[light?1:0]);
   button.setAttribute('aria-pressed',String(light));
   button.querySelector('.theme-label').textContent=text[light?3:2];
   button.firstElementChild.textContent=light?'☾':'☼';
  }
  render();
  button.onclick=()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('km-cinema-theme',theme)}catch{}render()};
  document.getElementById('language-select').onchange=e=>{
   const language=e.target.value;
   if(!Object.hasOwn(labels,language))return;
   const sections=[...document.querySelectorAll('main section[id]')];
   const current=sections.filter(s=>s.getBoundingClientRect().top<=150).at(-1);
   const hash=current?'#'+current.id:location.hash;
   const page=language==='en'?'cinema.html':`cinema-${language}.html`;
   location.assign(page+location.search+hash);
  };
 });
})();
