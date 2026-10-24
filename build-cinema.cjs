const fs = require('fs');
const vm = require('vm');
const rows = require('./cinema-translations.json');
const langs = ['ru','en','uk','de','pl'];
const names = {en:'English',uk:'Українська',ru:'Русский',de:'Deutsch',pl:'Polski'};
const ui = {
en:['Language','Switch to light theme','Switch to dark theme','Light','Dark'],
uk:['Мова','Увімкнути світлу тему','Увімкнути темну тему','Світла','Темна'],
ru:['Язык','Включить светлую тему','Включить тёмную тему','Светлая','Тёмная'],
de:['Sprache','Zum hellen Design wechseln','Zum dunklen Design wechseln','Hell','Dunkel'],
pl:['Język','Włącz jasny motyw','Włącz ciemny motyw','Jasny','Ciemny']
};
fs.mkdirSync('src',{recursive:true});
if(!fs.existsSync('src/cinema-shell.html')) fs.copyFileSync('dist/cinema.html','src/cinema-shell.html');
let shell=fs.readFileSync('src/cinema-shell.html','utf8');
let script=fs.readFileSync('dist/full-sites.js','utf8');
script=script.replace('<img src="assets/c07.webp" alt="Деталь авторской керамики" loading="lazy">','<img class="artist-portrait" src="assets/artist-portrait-2023.png" alt="Krystyna Mishchenko" width="1088" height="1448" loading="lazy">').replace('<span>МАТЕРИАЛ / ФАКТУРА / ЛИНИЯ</span>','<span>KRYSTYNA MISHCHENKO / 2023</span>');
script=script.replace('Отдельные работы.<br>Разные способы видеть.','Разные способы видеть.');
// Keep the established cinema layout and all artwork interactions.
script=script.replace(/^museum:.*\r?\n/gm,'').replace(/^exhibition:.*\r?\n/gm,'');
script=script.replace(/<img class="texture"[^>]*>/,'').replace(/<span class="detail-label">.*?<\/span>/,'');
// These branches belong to the separate exhibition page, not this concept.
script=script.replace("(concept==='exhibition'?'ЭКСПОЗИЦИЯ.':'КОЛЛЕКЦИЯ.')","'КОЛЛЕКЦИЯ.'");
script=script.replace(/\+\(concept==='exhibition'\?'.*?':''\)/,'');
script=script.replace(/^if\(concept==='exhibition'\).*\r?\n/gm,'');
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const pattern=new RegExp(rows.map(r=>r[0]).sort((a,b)=>b.length-a.length).map(escape).join('|'),'g');
if(new Set(rows.map(r=>r[0])).size!==rows.length) throw Error('Duplicate translation keys');
for(const lang of langs){
 const index=langs.indexOf(lang);
 const dict=new Map(rows.map(r=>{if(r.length!==5||r.some(s=>!s)) throw Error('Incomplete translation'); return [r[0],r[index]]}));
 const translate=s=>s.replace(pattern,key=>dict.get(key));
 const filename=lang==='en'?'cinema.html':`cinema-${lang}.html`;
 const options=['en','de','uk','pl','ru'].map(l=>`<option value="${l}"${l===lang?' selected':''}>${names[l]}</option>`).join('');
 const controls=`<div class="preferences"><button id="theme-toggle" type="button" aria-label="${ui[lang][1]}" aria-pressed="false"><span aria-hidden="true">☼</span><span class="theme-label">${ui[lang][3]}</span></button><label class="language-label"><span class="sr-only">${ui[lang][0]}</span><select id="language-select" aria-label="${ui[lang][0]}">${options}</select></label></div>`;
 let html=translate(shell).replace('lang="ru"',`lang="${lang}"`)
 .replace('content="#171b18"','content="#191919"')
 .replace('<script src="full-sites.js" defer></script>',`<link rel="stylesheet" href="cinema-theme.css"><link rel="stylesheet" href="cinema-hero.css"><link rel="stylesheet" href="project-carousel.css"><script src="cinema-preferences.js"></script><script src="cinema-${lang}.js" defer></script><script src="cinema-hero.js" defer></script><script src="white-poppies-data.js" defer></script><script src="moment-data.js" defer></script><script src="encounters-data.js" defer></script><script src="fire-data.js" defer></script><script src="inside-data.js" defer></script><script src="exhalation-data.js" defer></script><script src="different-data.js" defer></script><script src="goodness-data.js" defer></script><script src="shadows-data.js" defer></script><script src="shadows2021-data.js" defer></script><script src="devastated-data.js" defer></script><script src="identity-capital-data.js" defer></script><script src="tableware-data.js" defer></script><script src="artwork-specifications.js" defer></script><script src="project-carousel.js" defer></script><link rel="stylesheet" href="graphics-collection.css"><script src="artwork-descriptions.js" defer></script><script src="graphics-collection.js" defer></script><script src="painting-updates.js" defer></script><link rel="stylesheet" href="cv-documents.css"><script src="cv-documents.js" defer></script>`)
 .replace('<button id="menu-toggle"',controls+'<button id="menu-toggle"')
 .replace('href="cinema.html" aria-current',`href="${filename}" aria-current`);
 html=html.replaceAll('assets/Krystyna-Mishchenko-CV.docx', `assets/documents/Krystyna-Mishchenko-CV-${lang.toUpperCase()}.docx?v=20261023-editorial3`);
 let translated=translate(script).replaceAll('assets/Krystyna-Mishchenko-CV.docx', `assets/documents/Krystyna-Mishchenko-CV-${lang.toUpperCase()}.docx?v=20261023-editorial3`);
 translated=require('./src/render-about.cjs')(translated,lang);
 translated=require('./src/render-contact.cjs')(translated,lang);
 html=html.replace('</head>','<link rel="stylesheet" href="contact-details.css"></head>');
 html=html.replace('</head>','<link rel="stylesheet" href="collection-refinements.css"><script src="collection-navigation.js" defer></script></head>');
 html=html.replace('</head>','<link rel="stylesheet" href="about-editorial.css"></head>');
 if(['en','de','pl'].includes(lang)&&/[\u0400-\u04ff]/.test(html.replace(/<option[^>]*>.*?<\/option>/g,'')+translated)){
   throw Error(lang+' untranslated: '+(html+translated).match(/[^<>\n]*[\u0400-\u04ff][^<>\n]*/g)?.join('\n'));
 }
 new vm.Script(translated);
 fs.writeFileSync('dist/'+filename,html);
 fs.writeFileSync(`dist/cinema-${lang}.js`,translated);
}
// The main Site address must always serve the current portfolio as well.
fs.copyFileSync('dist/cinema.html','dist/index.html');
console.log('Built five complete cinema languages and current homepage; all translation entries and script syntax verified.');
