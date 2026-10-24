const fs=require('fs');
const p='dist/graphics-collection.js';let s=fs.readFileSync(p,'utf8');
const names={"en":"Geometry of Everyday Life","ru":"Геометрия быта","uk":"Геометрія побуту","de":"Geometrie des Alltags","pl":"Geometria codzienności"};
s=s.replace(' let topic=0;',' const stillLifeTitles='+JSON.stringify(names)+';\n const architectureIndices=[0,1,3,4,5,6,7];\n let topic=0;');
s=s.replace("topic===1?'08':'00'","topic===1?'07':'01'");
s=s.replace(" if(topic===2){grid.append(el('p','graphics-empty',t[4]));return}\n",'');
s=s.replace('for(let i=0;i<(topic===0?4:8);i++){','for(let i=0;i<(topic===0?4:topic===1?7:1);i++){\n const artworkIndex=topic===1?architectureIndices[i]:i;');
s=s.replace('(architectureTitles[lang]||architectureTitles.en)[i]','topic===1?(architectureTitles[lang]||architectureTitles.en)[artworkIndex]:(stillLifeTitles[lang]||stillLifeTitles.en)');
s=s.replace('String(years[i])',"topic===1?String(years[artworkIndex]):'2018'");
s=s.replace("(topic===0?'graphics':'architecture')+'/art-'+i+'.png'","(topic===0?'graphics':topic===1?'architecture':'still-life')+'/art-'+artworkIndex+'.png'");
fs.writeFileSync(p,s);
fs.mkdirSync('dist/assets/still-life',{recursive:true});
fs.writeFileSync('dist/assets/still-life/art-0.png',Buffer.from(fs.readFileSync('../still-life-input/enhanced.b64','utf8'),'base64'));
console.log('Updated: 4 animals, 7 architecture, 1 still life.');

