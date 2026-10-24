const fs=require('fs');
const p='dist/graphics-collection.js';let s=fs.readFileSync(p,'utf8');
s=s.replace(" let topic=0;",' const architectureTitles='+"{\"en\":[\"Fragments of the Old City\",\"Urban Industry\",\"Urban Heights\",\"City Traffic\",\"Time Stood Still. Beneath the Trees\",\"The Other Side of the City\",\"Roofs and Streetlights\",\"National Bank — Architecture of Kyiv\"],\"ru\":[\"Фрагменты старого города\",\"Городская индустрия\",\"Городские высоты\",\"Городской трафик\",\"Застывшее время. Под кронами деревьев\",\"Изнанка города\",\"Крыши и фонари\",\"Национальный банк — Архитектура Киева\"],\"uk\":[\"Фрагменти старого міста\",\"Міська індустрія\",\"Міські висоти\",\"Міський трафік\",\"Застиглий час. Під кронами дерев\",\"Зворотний бік міста\",\"Дахи й ліхтарі\",\"Національний банк — Архітектура Києва\"],\"de\":[\"Fragmente der Altstadt\",\"Städtische Industrie\",\"Städtische Höhen\",\"Stadtverkehr\",\"Stillstehende Zeit. Unter Baumkronen\",\"Die Kehrseite der Stadt\",\"Dächer und Straßenlaternen\",\"Nationalbank — Architektur Kyjiws\"],\"pl\":[\"Fragmenty starego miasta\",\"Miejski przemysł\",\"Miejskie wysokości\",\"Ruch miejski\",\"Zatrzymany czas. Pod koronami drzew\",\"Druga strona miasta\",\"Dachy i latarnie\",\"Bank Narodowy — Architektura Kijowa\"]}"+';\n const years=[2019,2018,2017,2018,2019,2018,2017,2019];\n let topic=0;');
s=s.replace("document.getElementById('category-description').textContent=t[11];","document.getElementById('category-description').textContent=topic===0?t[11]:t[topic+1];");
s=s.replace("topic===0?'04':'00'","topic===0?'04':topic===1?'08':'00'");
s=s.replace("if(topic!==0)","if(topic===2)");
s=s.replace("for(let i=0;i<4;i++){","for(let i=0;i<(topic===0?4:8);i++){\n const title=topic===0?t[i+7]:(architectureTitles[lang]||architectureTitles.en)[i];\n const metadata=topic===0?'30 × 21 cm':String(years[i]);");
s=s.replaceAll("t[i+7]","title");
// restore declaration altered by replacement
s=s.replace("const title=topic===0?title:","const title=topic===0?t[i+7]:");
s=s.replace("'assets/graphics/art-'+i+'.png'","'assets/'+(topic===0?'graphics':'architecture')+'/art-'+i+'.png'");
s=s.replace("el('span','','30 × 21 cm')","el('span','',metadata)");
s=s.replace("dialog.append(close,full,el('p','',title+' · 30 × 21 cm'))","const mat=el('div','graphic-mat');mat.append(full);dialog.append(close,mat,el('p','',title+' · '+metadata))");
s=s.replace("previousFilter(category);if","previousFilter(category);const total=document.querySelector('[data-filter=\"graphics\"] span');if(total)total.textContent='12';if");
s=s.replace("count.textContent='04'","count.textContent='12'");
fs.writeFileSync(p,s);
fs.appendFileSync('dist/graphics-collection.css', '\n/* Black passe-partout, independent of the site theme. */\n.graphic-image{box-sizing:border-box;background:#080808;border:1px solid #303030;padding:clamp(22px,3.2vw,42px)}.graphic-image img{display:block;filter:none}.graphic-mat{box-sizing:border-box;display:grid;place-items:center;background:#080808;border:1px solid #303030;padding:clamp(20px,3vw,40px);max-width:88vw}.graphic-mat img{display:block;max-width:100%;max-height:68dvh;object-fit:contain;filter:none}.graphic-work figcaption>span:first-child{min-width:0;overflow-wrap:break-word}.graphic-work figcaption>span:last-child{flex-shrink:0}@media(max-width:650px){.graphic-image{padding:22px}.graphic-mat{max-width:88vw;padding:20px}.graphic-mat img{max-width:100%;max-height:68dvh}}\n');

