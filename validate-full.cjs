const fs=require('node:fs');
const pages=['museum','exhibition','cinema'];
for(const slug of pages){
 const h=fs.readFileSync('dist/'+slug+'.html','utf8');
 for(const m of h.matchAll(/(?:href|src)="([^"#]+)"/g)){
  if(!m[1].startsWith('http')&&!fs.existsSync('dist/'+m[1]))throw Error('Missing '+m[1]);
 }
 if(!h.includes('data-concept="'+slug+'"'))throw Error('Wrong concept');
 if(h.includes('\ufffd'))throw Error('Invalid encoding');
}
const s=fs.readFileSync('dist/full-sites.js','utf8');
for(const m of s.matchAll(/id:'([cpg]\d+)'/g))if(!fs.existsSync('dist/assets/'+m[1]+'.webp'))throw Error('Missing image '+m[1]);
for(const id of ['works','about','cv','contact'])if(!s.includes('id="'+id+'"'))throw Error('Missing section '+id);
if(!s.includes('Кристина Мищенко'))throw Error('Missing biography');
if(!fs.existsSync('dist/assets/Krystyna-Mishchenko-CV.docx'))throw Error('Missing CV');
console.log('Three pages, scripts, styles, works, sections, UTF-8 and CV verified.');
