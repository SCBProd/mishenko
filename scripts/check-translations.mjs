import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const languages=['ru','uk','en','de','pl'];
const context={window:{}};
vm.createContext(context);
const files=['white-poppies-data.js',...fs.readdirSync('dist').filter(f=>f.endsWith('-data.js')&&!['white-poppies-data.js','cv-data.js'].includes(f))];
for(const file of files)vm.runInContext(fs.readFileSync(`dist/${file}`,'utf8'),context);
const projects=context.window.portfolioProjects;
for(const project of projects){
  assert.equal(new Set(Object.keys(project.text)).size,5,project.id);
  for(const language of languages){
    const text=project.text[language];
    for(const key of ['title','medium','intro'])assert.ok(text[key]?.trim(),`${project.id}/${language}/${key}`);
    assert.equal(text.paragraphs.length,project.text.ru.paragraphs.length,`${project.id}/${language}: missing paragraphs`);
    if(text.views)for(const photo of project.photos)assert.ok(text.views[photo.view],`${project.id}/${language}: missing photo caption`);
    if(['en','de','pl'].includes(language))assert.ok(!/[А-Яа-яІіЇїЄє]/u.test(JSON.stringify(text)),`${project.id}/${language}: untranslated Cyrillic`);
  }
}
const sketches=fs.readFileSync('dist/sketches-projects.js','utf8').replace('for(const group of groups)for(const file of group.files)works.push', 'window.audit={groups,names,text,materialNames,src};return;\nfor(const group of groups)for(const file of group.files)works.push');
for(const language of languages){
  const c={document:{documentElement:{lang:language}},window:{}};
  vm.createContext(c);vm.runInContext(sketches,c);
  const {groups,names,text,materialNames,src}=c.window.audit;
  assert.equal(groups.length,15);assert.equal(materialNames.length,7);assert.equal(text.length,5);
  const index=languages.indexOf(language);
  for(const values of Object.values(names))assert.equal(values.length,5);
  for(const group of groups){
    assert.ok(group.title[index]);assert.ok(group.medium&&!group.medium.includes('undefined'));
    if(['de','pl'].includes(language))assert.notEqual(group.title[index],group.title[2]);
    for(const file of group.files)assert.ok(fs.existsSync('dist/'+src(file).split('?')[0]),file);
  }
  assert.equal(groups[1].files.join(','),'060,059');
  assert.equal(groups.at(-1).files[0],'bird-moon');
  assert.equal(groups[5].files.length,9);assert.equal(groups[5].year,'2022');
}
for(const file of ['artwork-descriptions.js']){
  vm.runInContext(fs.readFileSync(`dist/${file}`,'utf8').split('(()=>{')[0],context);
  const data=context.window.artworkDescriptions;
  const keys=Object.keys(data.ru).sort().join(',');
  for(const language of languages)assert.equal(Object.keys(data[language]).sort().join(','),keys,`${file}/${language}`);
}
console.log(`Translation coverage passed: ${projects.length} ceramic/tableware projects, 15 sketch series, five languages, all photo captions and graphic descriptions.`);
// Exercise hub and placeholder language selection without a remote browser.
for(const route of ['index.html','photography.html','3d-art.html'])for(const language of languages){
  const nodes=new Map();
  const node=selector=>{
    if(!nodes.has(selector))nodes.set(selector,{textContent:'',attributes:{},children:[],firstChild:{},
      setAttribute(name,value){this.attributes[name]=value},
      replaceChildren(...children){this.children=children},
      addEventListener(name,handler){this[name]=handler}
    });
    return nodes.get(selector);
  };
  const cards=[0,1,2].map(i=>({querySelector:s=>node(`card-${i}-${s}`)}));
  const paragraphs=[node('paragraph-0'),node('paragraph-1')];
  const c={URL,URLSearchParams,document:{documentElement:{},
    getElementById:()=>node('select'),
    querySelector:s=>s==='main.detail'?(route==='index.html'?null:node('detail')):node(s),
    querySelectorAll:s=>s==='.grid .card'?cards:paragraphs,
    createTextNode:text=>({textContent:text}),createElement:tag=>({tagName:tag})},
    location:{pathname:'/'+route,search:'?lang='+language,href:'https://example.test/'+route+'?lang='+language},
    localStorage:{getItem:()=>null,setItem(){}},history:{replaceState(){}}
  };
  vm.createContext(c);vm.runInContext(fs.readFileSync('dist/hub-language.js','utf8'),c);
  assert.equal(c.document.documentElement.lang,language);
  assert.equal(node('select').value,language);
  if(route==='index.html')assert.ok(node('card-1-.open').firstChild.textContent);
  else{assert.ok(paragraphs[1].textContent);assert.ok(node('.back').href.endsWith('?lang='+language))}
  node('select').value='pl';node('select').change();assert.equal(c.document.documentElement.lang,'pl');
}
console.log('Hub, photography and 3D language selection passed in all five languages.');
