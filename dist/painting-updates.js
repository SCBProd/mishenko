(()=>{
const language=document.documentElement.lang;
const titles={en:['Dutch still life','Dutch still life','Silence and the Violin'],ru:['Голландский натюрморт','Голландский натюрморт','Тишина и скрипка'],uk:['Голландський натюрморт','Голландський натюрморт','Тиша і скрипка'],de:['Niederländisches Stillleben','Niederländisches Stillleben','Stille und Violine'],pl:['Holenderska martwa natura','Holenderska martwa natura','Cisza i skrzypce']};
const media={en:['Watercolour','Oil'],ru:['Акварель','Масло'],uk:['Акварель','Олія'],de:['Aquarell','Öl'],pl:['Akwarela','Olej']};
const names=titles[language]||titles.en,materials=media[language]||media.en;
const indices={p02:0,p03:1,p01:2};
Object.entries(indices).forEach(([id,i])=>{const work=byId(id);if(work){work.title=names[i];work.meta=materials[i===1?1:0]+' · '+(i===2?'2019':'2017');work.alt=names[i]}});
const lobsterIndex=works.findIndex(w=>w.id==='p03');const paintingIndex=works.findIndex(w=>w.category==='painting');if(lobsterIndex>=0&&paintingIndex>=0){const [lobster]=works.splice(lobsterIndex,1);works.splice(paintingIndex,0,lobster)}
const previousImageMarkup=imageMarkup;
imageMarkup=function(id,original=false){if(!(id in indices))return previousImageMarkup(id,original);return '<span class="art-window painting-window"><img src="assets/paintings/'+id+(id==='p01'?'-original.jpg':'-enhanced.png')+'" alt="'+byId(id).alt+'" loading="lazy"></span>'};
const discovery=document.querySelector('[data-go="painting"] img');if(discovery)discovery.src='assets/paintings/p03-enhanced.png';
if(document.querySelector('[data-filter="painting"].active'))filter('painting');
})();


(()=>{
const copyText={"ru":["Учебная живописная копия","Университетская набережная","Учебная копия произведения.","Копия произведения Глеба Савинова «Университетская набережная».","Холст, масляная живопись","Материал и техника","Размеры","60 × 80 см"],"en":["Painting Study — Copy","University Embankment","An educational copy of a painting.","A copy after Gleb Savinov’s “University Embankment”.","Oil on canvas","Material and technique","Dimensions","60 × 80 cm"],"uk":["Навчальна живописна копія","Університетська набережна","Навчальна копія живописного твору.","Копія твору Гліба Савінова «Університетська набережна».","Полотно, олійний живопис","Матеріал і техніка","Розміри","60 × 80 см"],"de":["Malerische Studienkopie","Universitätskai","Studienkopie eines Gemäldes.","Kopie nach Gleb Sawinows „Universitätskai“.","Öl auf Leinwand","Material und Technik","Maße","60 × 80 cm"],"pl":["Studium malarskie — kopia","Nabrzeże Uniwersyteckie","Edukacyjna kopia obrazu.","Kopia obrazu Gleba Sawinowa „Nabrzeże Uniwersyteckie”.","Olej na płótnie","Materiał i technika","Wymiary","60 × 80 cm"]};
const t=copyText[document.documentElement.lang]||copyText.en;
const ids=['study-copy-2016','university-embankment-copy-2016'];
ids.forEach((id,i)=>works.push({id,category:'painting',title:t[i],meta:t[4]+' · 2016 · '+t[7],alt:t[i]+' — '+t[i+2]}));
const previousImage=imageMarkup;
imageMarkup=function(id,original=false){const i=ids.indexOf(id);if(i<0)return previousImage(id,original);return '<span class="art-window painting-window"><img src="assets/paintings/copy-2016-'+i+'.jpg" alt="'+byId(id).alt+'" loading="lazy"></span>'};
function copyFacts(i){return '<div class="painting-copy-facts"><p>'+t[i+2]+'</p><dl class="graphic-details"><dt>'+t[5]+'</dt><dd>'+t[4]+'</dd><dt>'+t[6]+'</dt><dd>'+t[7]+'</dd></dl></div>'}
const previousCard=card;card=function(w,i){const markup=previousCard(w,i),n=ids.indexOf(w.id);return n<0?markup:markup.replace('</figure>',copyFacts(n)+'</figure>')};
const previousViewer=updateViewer;updateViewer=function(){previousViewer();document.querySelectorAll('#viewer .painting-copy-facts').forEach(n=>n.remove());const i=ids.indexOf(viewSet[current].id);if(i>=0)document.getElementById('viewer').insertAdjacentHTML('beforeend',copyFacts(i));};
const count=document.querySelector('[data-filter="painting"] span');if(count)count.textContent=String(works.filter(w=>w.category==='painting').length).padStart(2,'0');
if(document.querySelector('[data-filter="painting"].active'))filter('painting');
})();

(()=>{
const translations={"ru":["Материал и техника","Размеры","Холст, масло","Акварель","см"],"en":["Material and technique","Dimensions","Oil on canvas","Watercolour","cm"],"uk":["Матеріал і техніка","Розміри","Полотно, олія","Акварель","см"],"de":["Material und Technik","Maße","Öl auf Leinwand","Aquarell","cm"],"pl":["Materiał i technika","Wymiary","Płótno, olej","Akwarela","cm"]};
const t=translations[document.documentElement.lang]||translations.en;
const facts={p03:[t[2],'50 × 60 '+t[4]],p02:[t[3],'50 × 60 '+t[4]],p01:[t[3],'42 × 59,4 '+t[4]+' (A2)']};
function markup(id){const f=facts[id];return '<dl class="graphic-details painting-still-life-facts"><dt>'+t[0]+'</dt><dd>'+f[0]+'</dd><dt>'+t[1]+'</dt><dd>'+f[1]+'</dd></dl>'}
const previousCard=card;card=function(w,i){const html=previousCard(w,i);return facts[w.id]?html.replace('</figcaption>','</figcaption>'+markup(w.id)):html};
const previousViewer=updateViewer;updateViewer=function(){previousViewer();document.querySelectorAll('#viewer .painting-still-life-facts').forEach(n=>n.remove());const id=viewSet[current].id;if(facts[id])document.getElementById('viewer').insertAdjacentHTML('beforeend',markup(id));};
if(document.querySelector('[data-filter="painting"].active'))filter('painting');
})();
