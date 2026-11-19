(()=>{
 const select=document.getElementById('language'),settings=document.querySelector('.header .settings'),nav=document.querySelector('.header nav');if(!select)return;
 nav.id='photo-main-nav';const menu=document.createElement('button');menu.type='button';menu.className='photo-menu-toggle';menu.setAttribute('aria-controls',nav.id);menu.setAttribute('aria-expanded','false');menu.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14"/></svg>';
 const picker=document.createElement('div');picker.className='photo-language-picker';const trigger=document.createElement('button');trigger.type='button';trigger.className='photo-language-trigger';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','photo-language-options');
 const options=document.createElement('div');options.id='photo-language-options';options.className='photo-language-options';options.hidden=true;
 function close(){options.hidden=true;trigger.setAttribute('aria-expanded','false')}
 function update(){const lang=select.value;trigger.replaceChildren();const full=document.createElement('span');full.className='photo-language-full';full.textContent=select.selectedOptions[0].textContent;const short=document.createElement('span');short.className='photo-language-short';short.textContent=lang.toUpperCase();trigger.append(full,short);trigger.setAttribute('aria-label',({ru:'Язык',uk:'Мова',en:'Language',de:'Sprache',pl:'Język'})[lang]);menu.setAttribute('aria-label',({ru:'Меню',uk:'Меню',en:'Menu',de:'Menü',pl:'Menu'})[lang]);for(const b of options.children){if(b.lang===lang)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')}}
 for(const option of select.options){const b=document.createElement('button');b.type='button';b.lang=option.value;b.textContent=option.textContent;b.onclick=()=>{select.value=option.value;select.dispatchEvent(new Event('change'));close();trigger.focus()};options.append(b)}
 picker.append(trigger,options);select.hidden=true;settings.append(picker,menu);select.addEventListener('change',update);update();
 trigger.onclick=()=>{const open=options.hidden;options.hidden=!open;trigger.setAttribute('aria-expanded',String(open));nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false')};
 menu.onclick=()=>{close();const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('mobile-open',open)};
 nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false')}});
 document.addEventListener('click',e=>{if(!picker.contains(e.target))close()});picker.addEventListener('focusout',e=>{if(!picker.contains(e.relatedTarget))close()});
 picker.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus()}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options.hidden=false;trigger.setAttribute('aria-expanded','true');const items=[...options.children],i=items.indexOf(document.activeElement);items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}});
 document.querySelector('.header').addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');menu.focus()}});
})();

(()=>{
 const select=document.getElementById('shoot-type');if(!select)return;
 const field=document.createElement('div');field.className='shoot-type-picker';
 const trigger=document.createElement('button');trigger.type='button';trigger.className='shoot-type-trigger';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','shoot-type-options');trigger.setAttribute('aria-labelledby','shoot-type-label shoot-type-value');
 const value=document.createElement('span');value.id='shoot-type-value';trigger.append(value);
 const options=document.createElement('div');options.id='shoot-type-options';options.className='shoot-type-options';options.hidden=true;
 function close(){options.hidden=true;trigger.setAttribute('aria-expanded','false')}
 function sync(){value.textContent=select.selectedOptions[0]?.textContent||'';options.replaceChildren();for(const [i,option] of [...select.options].entries()){const b=document.createElement('button');b.type='button';b.textContent=option.textContent;if(option.selected)b.setAttribute('aria-current','true');b.onclick=()=>{select.selectedIndex=i;select.dispatchEvent(new Event('change'));close();trigger.focus()};options.append(b)}}
 select.hidden=true;select.after(field);field.append(trigger,options);sync();select.addEventListener('change',sync);document.getElementById('language').addEventListener('change',()=>{close();sync()});
 trigger.onclick=()=>{const open=options.hidden;options.hidden=!open;trigger.setAttribute('aria-expanded',String(open))};
 document.addEventListener('click',e=>{if(!field.contains(e.target))close()});field.addEventListener('focusout',e=>{if(!field.contains(e.relatedTarget))close()});
 field.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus()}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options.hidden=false;trigger.setAttribute('aria-expanded','true');const items=[...options.children],i=items.indexOf(document.activeElement);items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}});
})();
