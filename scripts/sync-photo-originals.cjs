const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {data,authorOriginals,audit}=require('./audit-photo-originals.cjs');
const authorOnly=process.argv.includes('--author-only');
const selected=authorOnly?authorOriginals:[...data,...authorOriginals];
const missing=audit.filter(p=>selected.some(photo=>photo.id===p.id)&&!p.exists);
if(missing.length)throw Error('Missing original files: '+missing.map(p=>p.id).join(', '));
const directory='photography-originals';fs.mkdirSync(directory,{recursive:true});
let bytes=0;
for(const photo of selected){
 const source=audit.find(item=>item.id===photo.id).source;
 const buffer=fs.readFileSync(source);
 const hash=crypto.createHash('sha256').update(buffer).digest('hex');
 const filename=photo.id+'-'+hash.slice(0,16)+path.extname(source).toLowerCase();
 const destination=path.join(directory,filename);
 if(!fs.existsSync(destination))fs.copyFileSync(source,destination);
 if(crypto.createHash('sha256').update(fs.readFileSync(destination)).digest('hex')!==hash)throw Error('Original mismatch: '+photo.id);
 photo.original=`https://raw.githubusercontent.com/SCBProd/mishenko/main/photography-originals/${filename}`;
 photo.originalSha256=hash;
 bytes+=buffer.length;
}
if(!authorOnly)fs.writeFileSync('dist/photography-data.js','window.PHOTOS = '+JSON.stringify(data)+';\n');
console.log(`Preserved ${selected.length} originals byte-for-byte (${Math.round(bytes/1048576)} MiB)`);
