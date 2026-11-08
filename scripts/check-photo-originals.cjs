const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('dist/photography-data.js','utf8'),ctx);
const data=ctx.window.PHOTOS;
for(const p of data){
 assert.ok(p.original&&p.originalSha256,'Missing original: '+p.id);
 const filename=path.basename(new URL(p.original).pathname);
 const file=fs.readFileSync(path.join('photography-originals',filename));
 assert.equal(crypto.createHash('sha256').update(file).digest('hex'),p.originalSha256,'Original changed: '+p.id);
}
const script=fs.readFileSync('dist/photography.js','utf8');
const helper=script.slice(script.indexOf('const asset='),script.indexOf(',title=p=>'));
vm.runInContext(helper+';',ctx);
for(const p of data)assert.equal(vm.runInContext(`asset({id:${JSON.stringify(p.id)}},720)`,ctx),p.original);
assert.ok(!script.includes('img.srcset='),'Gallery must not select compressed variants');
console.log(`Verified ${data.length} original file hashes and original-only rendering.`);
