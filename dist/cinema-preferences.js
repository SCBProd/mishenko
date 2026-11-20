(()=>{
 'use strict';
 let theme='dark';
 try{theme=localStorage.getItem('km-cinema-theme')==='light'?'light':'dark'}catch{}
 document.documentElement.dataset.theme=theme;
 const labels={en:['Switch to light theme','Switch to dark theme','Light','Dark'],uk:['Увімкнути світлу тему','Увімкнути темну тему','Світла','Темна'],ru:['Включить светлую тему','Включить тёмную тему','Светлая','Тёмная'],de:['Zum hellen Design wechseln','Zum dunklen Design wechseln','Hell','Dunkel'],pl:['Włącz jasny motyw','Włącz ciemny motyw','Jasny','Ciemny']};
 document.addEventListener('DOMContentLoaded',()=>{
  const statement=document.querySelector('.cinema-statement p');
  if(statement&&!statement.querySelector('.statement-line')){const lines=statement.innerHTML.split(/<br\s*\/?\s*>/i);if(lines.length===3)statement.replaceChildren(...lines.map(line=>{const span=document.createElement('span');span.className='statement-line';span.textContent=line;return span}))}
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
   button.firstElementChild.innerHTML=light?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>';
  }
  render();
  button.onclick=()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('km-cinema-theme',theme)}catch{}render()};
  const select=document.getElementById('language-select');
  const menuToggle=document.getElementById('menu-toggle');
  menuToggle.setAttribute('aria-label',menuToggle.textContent.replace('+','').trim());
  menuToggle.insertAdjacentHTML('beforeend','<svg class="menu-symbol" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14"/></svg>');
  document.querySelector('.preferences').prepend(menuToggle);
  const picker=document.createElement('div');
  picker.className='language-picker';
  const trigger=document.createElement('button');
  trigger.type='button';trigger.className='language-trigger';
  const fullName=document.createElement('span');fullName.className='language-full';fullName.textContent=select.selectedOptions[0].textContent;
  const shortName=document.createElement('span');shortName.className='language-short';shortName.textContent=select.value.toUpperCase();
  trigger.append(fullName,shortName);
  trigger.setAttribute('aria-expanded','false');
  trigger.setAttribute('aria-controls','language-options');
  trigger.setAttribute('aria-label',select.getAttribute('aria-label'));
  const options=document.createElement('div');
  options.id='language-options';options.className='language-options';options.hidden=true;
  function closePicker(){options.hidden=true;trigger.setAttribute('aria-expanded','false')}
  for(const option of select.options){
   const item=document.createElement('button');item.type='button';item.lang=option.value;item.textContent=option.textContent;
   if(option.selected)item.setAttribute('aria-current','true');
   item.onclick=()=>{closePicker();if(select.value!==option.value){select.value=option.value;select.dispatchEvent(new Event('change'))}else trigger.focus()};
   options.append(item);
  }
  picker.append(trigger,options);select.parentElement.after(picker);select.parentElement.hidden=true;
  trigger.onclick=()=>{const open=options.hidden;options.hidden=!open;trigger.setAttribute('aria-expanded',String(open))};
  picker.addEventListener('keydown',e=>{if(e.key==='Escape'){closePicker();trigger.focus()}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options.hidden=false;trigger.setAttribute('aria-expanded','true');const items=[...options.querySelectorAll('button')];const current=items.indexOf(document.activeElement);items[(current+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}});
  document.addEventListener('click',e=>{if(!picker.contains(e.target))closePicker()});
  picker.addEventListener('focusout',e=>{if(!picker.contains(e.relatedTarget))closePicker()});
  menuToggle.addEventListener('click',closePicker);
  select.onchange=e=>{
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
