const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
module.exports = (script, lang) => {
  const data = require(`./about-${lang}.json`);
  if (data.paragraphs.length !== 14) throw Error(`Incomplete about text: ${lang}`);
  const match = script.match(/^const about=(.*);$/m);
  if (!match) throw Error('About section not found');
  // Retain the portrait; document downloads belong to the following CV section.
  const original = require('vm').runInNewContext(match[1]);
  const image = original.match(/<div class="about-image">[\s\S]*?<\/div>/)[0];
  const labels = {
    ru:['Читать полный замысел','Свернуть'],
    uk:['Читати повний задум','Згорнути'],
    en:['Read the full concept','Show less'],
    de:['Das vollständige Konzept lesen','Weniger anzeigen'],
    pl:['Przeczytaj pełną koncepcję','Zwiń']
  }[lang];
  const quotes = {ru:['«','»'],uk:['«','»'],en:['“','”'],de:['„','“'],pl:['„','”']}[lang];
  const paragraphs = data.paragraphs.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${[0,3,8,13].includes(i) ? `<strong>${escape(p)}</strong>` : escape(p)}</p>`);
  const more = `<details class="about-more"><summary><span class="about-read-label">${labels[0]}</span><span class="about-close-label">${labels[1]}</span><span class="about-toggle-icon" aria-hidden="true">+</span></summary><div class="about-continuation">${paragraphs.slice(5).join('')}</div></details>`;
  const html = `<section id="about" class="about section about-editorial" aria-labelledby="about-heading">${image}<div class="about-copy"><p class="eyebrow">02 / ${escape(data.title)}</p><h2 id="about-heading">KRYSTYNA<br>MISHCHENKO</h2><p class="about-discipline">${escape(data.discipline)}</p><blockquote class="artist-quote"><p><em>${quotes[0]}${escape(data.quote)}${quotes[1]}</em></p></blockquote><div class="artist-biography">${paragraphs.slice(0,5).join('')}${more}</div></div></section>`;
  return script.replace(/^const about=.*;$/m, () => `const about=${JSON.stringify(html)};`);
};
