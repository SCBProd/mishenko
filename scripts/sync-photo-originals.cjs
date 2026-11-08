const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {data,audit}=require('./audit-photo-originals.cjs');
const missing=audit.filter(p=>!p.exists);
if(missing.length)throw Error('Missing original files: '+missing.map(p=>p.id).join(', '));
const directory='photography-originals';fs.mkdirSync(directory,{recursive:true});
let bytes=0;
for(const photo of data){
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
fs.writeFileSync('dist/photography-data.js','window.PHOTOS = '+JSON.stringify(data)+';\n');
console.log(`Preserved ${data.length} originals byte-for-byte (${Math.round(bytes/1048576)} MiB)`);
