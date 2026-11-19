(()=>{
'use strict';
const translations={
uk:['Три напрями','КЕРАМІКА / ФОТОГРАФІЯ / 3D','ТРИ НАПРЯМИ. ОДИН ПОГЛЯД.',['Форма.','Світло. Уява.'],'Працюю з матеріалом, зображенням і цифровим простором. Обери напрям, щоб познайомитися з моїми роботами.',['Кераміка','Фотографія','Візуальне 3D'],['01 / МАТЕРІАЛ','02 / ПОГЛЯД','03 / УЯВА'],['Форма, фактура та присутність матеріалу. Керамічні об’єкти й мистецькі проєкти.','Світло, простір і мить. Мій погляд через об’єктив камери.','Цифрова форма, об’єм і нові простори для візуального мистецтва.'],['Відкрити портфоліо','Відкрити напрям','Відкрити напрям'],'МАТЕРІАЛ · СВІТЛО · ЦИФРОВИЙ ПРОСТІР','Портфоліо за напрямами','Чорна кераміка зі світлими круглими вкрапленнями — «Білі маки»'],
ru:['Три направления','КЕРАМИКА / ФОТОГРАФИЯ / 3D','ТРИ НАПРАВЛЕНИЯ. ОДИН ВЗГЛЯД.',['Форма.','Свет. Воображение.'],'Работаю с материалом, изображением и цифровым пространством. Выберите направление, чтобы познакомиться с моими работами.',['Керамика','Фотография','Визуальное 3D'],['01 / МАТЕРИАЛ','02 / ВЗГЛЯД','03 / ВООБРАЖЕНИЕ'],['Форма, фактура и присутствие материала. Керамические объекты и художественные проекты.','Свет, пространство и мгновение. Мой взгляд через объектив камеры.','Цифровая форма, объём и новые пространства для визуального искусства.'],['Открыть портфолио','Открыть направление','Открыть направление'],'МАТЕРИАЛ · СВЕТ · ЦИФРОВОЕ ПРОСТРАНСТВО','Портфолио по направлениям','Чёрная керамика со светлыми круглыми вкраплениями — «Белые маки»'],
en:['Three disciplines','CERAMICS / PHOTOGRAPHY / 3D','THREE DISCIPLINES. ONE VISION.',['Form.','Light. Imagination.'],'I work with material, images and digital space. Choose a discipline to explore my work.',['Ceramics','Photography','Visual / 3D art'],['01 / MATERIAL','02 / VISION','03 / IMAGINATION'],['Form, texture and the presence of material. Ceramic objects and artistic projects.','Light, space and a moment in time. My view through the camera lens.','Digital form, volume and new spaces for visual art.'],['Explore the portfolio','Explore the discipline','Explore the discipline'],'MATERIAL · LIGHT · DIGITAL SPACE','Portfolio by discipline','Black ceramic with light circular inclusions — White Poppies'],
de:['Drei Disziplinen','KERAMIK / FOTOGRAFIE / 3D','DREI DISZIPLINEN. EIN BLICK.',['Form.','Licht. Fantasie.'],'Ich arbeite mit Material, Bildern und digitalem Raum. Wählen Sie eine Disziplin und entdecken Sie meine Arbeiten.',['Keramik','Fotografie','Visuelle / 3D-Kunst'],['01 / MATERIAL','02 / BLICK','03 / FANTASIE'],['Form, Oberfläche und die Präsenz des Materials. Keramische Objekte und künstlerische Projekte.','Licht, Raum und Augenblick. Mein Blick durch das Kameraobjektiv.','Digitale Form, Volumen und neue Räume für die visuelle Kunst.'],['Portfolio öffnen','Disziplin entdecken','Disziplin entdecken'],'MATERIAL · LICHT · DIGITALER RAUM','Portfolio nach Disziplinen','Schwarze Keramik mit hellen runden Einschlüssen — Weiße Mohnblumen'],
pl:['Trzy dziedziny','CERAMIKA / FOTOGRAFIA / 3D','TRZY DZIEDZINY. JEDNO SPOJRZENIE.',['Forma.','Światło. Wyobraźnia.'],'Pracuję z materiałem, obrazem i przestrzenią cyfrową. Wybierz dziedzinę, aby poznać moje prace.',['Ceramika','Fotografia','Sztuka wizualna / 3D'],['01 / MATERIAŁ','02 / SPOJRZENIE','03 / WYOBRAŹNIA'],['Forma, faktura i obecność materiału. Obiekty ceramiczne i projekty artystyczne.','Światło, przestrzeń i chwila. Moje spojrzenie przez obiektyw aparatu.','Cyfrowa forma, objętość i nowe przestrzenie dla sztuki wizualnej.'],['Otwórz portfolio','Poznaj dziedzinę','Poznaj dziedzinę'],'MATERIAŁ · ŚWIATŁO · PRZESTRZEŃ CYFROWA','Portfolio według dziedzin','Czarna ceramika z jasnymi okrągłymi wtrąceniami — Białe maki']
};
const select=document.getElementById('hub-language');if(!select)return;
const detailTranslations={
uk:[['Побачити.','Відчути. Зберегти.'],['Уявити.','Надати форму.'],'Добірка фотографій готується до публікації.','Добірка 3D-робіт готується до публікації.','← Усі портфоліо','Мова'],
ru:[['Увидеть.','Почувствовать. Сохранить.'],['Представить.','Придать форму.'],'Подборка фотографий готовится к публикации.','Подборка 3D-работ готовится к публикации.','← Все портфолио','Язык'],
en:[['See.','Feel. Preserve.'],['Imagine.','Give it form.'],'A selection of photographs is being prepared for publication.','A selection of 3D works is being prepared for publication.','← All portfolios','Language'],
de:[['Sehen.','Spüren. Bewahren.'],['Vorstellen.','Form geben.'],'Eine Auswahl von Fotografien wird für die Veröffentlichung vorbereitet.','Eine Auswahl von 3D-Arbeiten wird für die Veröffentlichung vorbereitet.','← Alle Portfolios','Sprache'],
pl:[['Zobaczyć.','Poczuć. Zachować.'],['Wyobrazić sobie.','Nadać formę.'],'Wybór fotografii jest przygotowywany do publikacji.','Wybór prac 3D jest przygotowywany do publikacji.','← Wszystkie portfolio','Język']
};
function render(lang){
 if(!Object.hasOwn(translations,lang))lang='uk';const t=translations[lang];select.value=lang;document.documentElement.lang=lang;document.querySelectorAll('.top>a').forEach(a=>a.href='concepts.html?lang='+lang);document.title=t[0]+' — Krystyna Mishchenko';
 const dt=detailTranslations[lang];select.setAttribute('aria-label',dt[5]);document.querySelector('.hub-language .sr-only').textContent=dt[5];
 if(document.querySelector('main.detail')){
  const index=location.pathname.endsWith('photography.html')?0:1;
  document.title=t[5][index+1]+' — Krystyna Mishchenko';
  document.querySelector('.top>a:nth-child(2)').textContent=t[1];
  const title=document.querySelector('.detail h1');title.replaceChildren(document.createTextNode(dt[index][0]),document.createElement('br'),document.createTextNode(dt[index][1]));
  document.querySelector('.detail .eyebrow').textContent=t[5][index+1];
  const paragraphs=document.querySelectorAll('.detail p');paragraphs[0].textContent=t[7][index+1];paragraphs[1].textContent=dt[index+2];
  const back=document.querySelector('.back');back.textContent=dt[4];back.href='concepts.html?lang='+lang;
  document.querySelector('meta[name="description"]').content=t[7][index+1];
  document.querySelector('.foot span:last-child').textContent=t[9];
  return;
 }
 document.querySelector('.top>a:nth-child(2)').textContent=t[1];document.querySelector('.intro .eyebrow').textContent=t[2];const title=document.querySelector('.intro h1');title.replaceChildren(document.createTextNode(t[3][0]),document.createElement('br'),document.createTextNode(t[3][1]));document.querySelector('.intro>p').textContent=t[4];
 document.querySelector('.grid').setAttribute('aria-label',t[10]);document.querySelectorAll('.grid .card').forEach((card,i)=>{card.querySelector('h2').textContent=t[5][i];card.querySelector('.visual-label').textContent=t[5][i].toUpperCase();card.querySelector('.number').textContent=t[6][i].replace(/^\d+\s*\/\s*/, '');card.querySelector('.caption p').textContent=t[7][i];const open=card.querySelector('.open');open.firstChild.textContent=t[8][i];if(i===0){card.href=lang==='en'?'cinema.html':`cinema-${lang}.html`;card.querySelector('img').alt=t[11]}else{card.href=(i===1?'photography.html':'3d-art.html')+'?lang='+lang+(i===1?'&v=20261028-carousel-r2':'')}});document.querySelector('.foot span:last-child').textContent=t[9];document.querySelector('meta[name="description"]').content=t[7].join(' ');
}
let lang=new URLSearchParams(location.search).get('lang');if(!Object.hasOwn(translations,lang)){try{lang=localStorage.getItem('km-hub-language')}catch{}}render(lang);
select.addEventListener('change',()=>{const lang=select.value;render(lang);try{localStorage.setItem('km-hub-language',lang)}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url)});
})();

(()=>{
 const select=document.getElementById('hub-language');if(!select)return;
 const picker=document.createElement('div');picker.className='hub-language-picker';
 const trigger=document.createElement('button');trigger.type='button';trigger.className='hub-language-trigger';trigger.setAttribute('aria-label',select.getAttribute('aria-label'));trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','hub-language-options');
 const options=document.createElement('div');options.id='hub-language-options';options.className='hub-language-options';options.hidden=true;
 function close(){options.hidden=true;trigger.setAttribute('aria-expanded','false')}
 function update(){trigger.textContent=select.value.toUpperCase();for(const item of options.children){if(item.lang===select.value)item.setAttribute('aria-current','true');else item.removeAttribute('aria-current')}}
 for(const option of select.options){const item=document.createElement('button');item.type='button';item.lang=option.value;item.textContent=option.textContent;item.onclick=()=>{select.value=option.value;select.dispatchEvent(new Event('change'));close();trigger.focus()};options.append(item)}
 picker.append(trigger,options);select.parentElement.after(picker);select.parentElement.hidden=true;update();select.addEventListener('change',update);
 trigger.onclick=()=>{const open=options.hidden;options.hidden=!open;trigger.setAttribute('aria-expanded',String(open))};
 document.addEventListener('click',e=>{if(!picker.contains(e.target))close()});
 picker.addEventListener('focusout',e=>{if(!picker.contains(e.relatedTarget))close()});
 picker.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus()}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options.hidden=false;trigger.setAttribute('aria-expanded','true');const items=[...options.children];const i=items.indexOf(document.activeElement);items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}});
})();

(()=>{
 const picker=document.querySelector('.hub-language-picker');if(!picker)return;
 const controls=document.createElement('div');controls.className='hub-controls';picker.before(controls);controls.append(picker);
 const button=document.createElement('button');button.type='button';button.className='hub-theme-toggle';controls.prepend(button);
 let theme='dark';try{theme=localStorage.getItem('km-hub-theme')==='light'?'light':'dark'}catch{}
 const labels={ru:['Включить светлую тему','Включить тёмную тему'],uk:['Увімкнути світлу тему','Увімкнути темну тему'],en:['Switch to light theme','Switch to dark theme'],de:['Zum hellen Design wechseln','Zum dunklen Design wechseln'],pl:['Włącz jasny motyw','Włącz ciemny motyw']};
 function render(){const light=theme==='light';document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]').content=light?'#f2eee6':'#171c18';button.setAttribute('aria-label',(labels[document.documentElement.lang]||labels.en)[light?1:0]);button.setAttribute('aria-pressed',String(light));button.innerHTML=light?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>'}
 button.onclick=()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('km-hub-theme',theme)}catch{}render()};document.getElementById('hub-language').addEventListener('change',render);render();
})();
