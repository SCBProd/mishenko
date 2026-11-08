const fs=require('node:fs'),path=require('node:path');
const data=JSON.parse(fs.readFileSync('dist/photography-data.js','utf8').replace(/^window.PHOTOS = /,'').replace(/;\s*$/,''));
const script=fs.readFileSync('scripts/prepare-photographs.py','utf8');
const sources={};
for(const match of script.matchAll(/\('([^']+)',\s*'[^']+',\s*'([^']+)'\)/g))sources[match[1]]=match[2].replace(/\\\\/g,'\\');
for(const n of [13,14,15,16,17,18,19,20])sources['azure-bloom-'+n]=`E:/FOTOS/Архив/Unbenannter Export/${n}.jpg`;
for(const n of [22,23,24,25,26])sources['white-silence-'+n]=`E:/FOTOS/Flowers/Pure Bloom Minimalist White Petals/Unbenannter Export/${n}.jpg`;
sources['white-silence-12']='E:/FOTOS/Архив/Unbenannter Export/12.jpg';
sources['young-green-branch']='E:/FOTOS/Flowers/Young green leaves/Young green leaves on a thin branch in spring forest.jpg';
sources['young-green-buds-28']='E:/FOTOS/Архив/Unbenannter Export/28.jpg';
sources['young-green-27']='E:/FOTOS/Flowers/Pure Bloom Minimalist White Petals/Unbenannter Export/27.jpg';
const pastel=['Tiny white spring flowers and bright green new leaves on a branch.jpg','Single branch of plum blossoms with dark leaves on a bright bokeh background.jpg','Soft pink cherry blossoms with brown leaves in gentle light.jpg','Intricate pattern of plum blossoms and branches in soft light.jpg','Wide angle of pink blossoms on a branch in warm evening light.jpg'];
pastel.forEach((name,i)=>sources['spring-pastel-'+(i+1)]='E:/FOTOS/Flowers/Shutterstock 2025/'+name);
sources['night-9']='dist/assets/photography/edited/night-9.png';
sources['bastei-20-gold']='E:/FOTOS/Basteiweg, 01824 Lohmen/Unbenannter Export/29.jpg';
const audit=data.map(p=>{const source=sources[p.id];return {id:p.id,source:source||null,exists:!!source&&fs.existsSync(source),bytes:source&&fs.existsSync(source)?fs.statSync(source).size:0};});
if(require.main===module){fs.writeFileSync('photo-originals-audit.json',JSON.stringify(audit,null,2));console.log(JSON.stringify({count:audit.length,found:audit.filter(p=>p.exists).length,totalMiB:Math.round(audit.reduce((sum,p)=>sum+p.bytes,0)/1048576),missing:audit.filter(p=>!p.exists)},null,2));}
module.exports={data,sources,audit};
