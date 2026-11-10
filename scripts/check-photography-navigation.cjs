const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('dist/photography.js','utf8');
function makeContext(url){
 const ctx={window:{},URL,location:{href:url},history:{replaceState(_state,_title,next){ctx.location.href=String(next);}}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/photography-data.js','utf8'),ctx);
 vm.runInContext(script.slice(0,script.indexOf('const heroPhotos')),ctx);
 vm.runInContext("let active='all',activeCollection=null;",ctx);
 const start=script.indexOf('function initializeGalleryRoute()');
 vm.runInContext(script.slice(start,script.indexOf("$('#top-link')",start)),ctx);
 return ctx;
}
for(const [query,expected] of [['?lang=ru&series=azure-bloom','botanical'],['?lang=ru&group=botanical','botanical'],['?series=not-found','all'],['?group=people','people']]){
 const ctx=makeContext('https://example.com/photography.html'+query);
 assert.equal(vm.runInContext('active',ctx),expected);
 assert.equal(vm.runInContext('activeCollection',ctx),null);
 assert.equal(new URL(ctx.location.href).searchParams.has('series'),false);
}
const ctx=makeContext('https://example.com/photography.html?lang=ru&series=azure-bloom');
vm.runInContext("let current=7,scrolledToFirst=false;function requestAnimationFrame(fn){fn()};function renderGallery(){};const document={querySelector(){return {focus(){},scrollIntoView(){scrolledToFirst=true}}}};function matchMedia(){return {matches:true}};",ctx);
for(const name of ['filter','selectCollection']){
 const line=script.split('\n').find(line=>line.startsWith('function '+name+'('));vm.runInContext(line,ctx);
}
vm.runInContext("selectCollection('white-silence')",ctx);
assert.equal(vm.runInContext('activeCollection',ctx),'white-silence');
assert.equal(vm.runInContext('current',ctx),0);
assert.equal(vm.runInContext('scrolledToFirst',ctx),true);
vm.runInContext("filter('botanical')",ctx);
assert.equal(vm.runInContext('activeCollection',ctx),null);
assert.equal(new URL(ctx.location.href).searchParams.get('group'),'botanical');
assert.equal(new URL(ctx.location.href).searchParams.has('series'),false);
console.log('Passed: saved collection opens category list; category survives reload; cards open; category resets selection.');
