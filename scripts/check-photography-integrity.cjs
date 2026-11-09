const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('dist/photography-data.js','utf8'),ctx);
const script=fs.readFileSync('dist/photography.js','utf8');
vm.runInContext(script.slice(0,script.indexOf('const heroPhotos')),ctx);
const result=vm.runInContext('({groups,covers,photos,collections})',ctx);
assert.equal(result.groups.length,6);
for(const [i,group] of result.groups.entries()){
 if(i<result.covers.length){const photo=result.photos.find(p=>p.id===result.covers[i]);assert.ok(photo,'Missing category cover: '+group);assert.ok(photo.original,'Missing cover original: '+group);}
}
for(const collection of result.collections){
 assert.ok(result.photos.some(p=>p.id===collection.cover),'Missing collection cover: '+collection.id);
 for(const id of collection.photos)assert.ok(result.photos.some(p=>p.id===id),'Missing photograph '+id+' in '+collection.id);
}
console.log('Verified all 6 categories, category covers, collection covers and gallery photographs.');
