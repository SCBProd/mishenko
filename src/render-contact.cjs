module.exports = (script, lang) => {
  const labels = {en:['Phones','DE · Germany','UA · Ukraine'],ru:['Телефоны','DE · Германия','UA · Украина'],uk:['Телефони','DE · Німеччина','UA · Україна'],de:['Telefon','DE · Deutschland','UA · Ukraine'],pl:['Telefony','DE · Niemcy','UA · Ukraina']}[lang];
  const match=script.match(/^const contact=(.*);$/m);
  if(!match) throw Error('Contact section missing');
  const original=require('vm').runInNewContext(match[1]);
  const content=`<dl class="contact-details"><div class="contact-phones"><dt>${labels[0]}</dt><dd><a href="tel:+4915753604617"><span class="contact-country">DE</span> +49 1575 3604617</a><a href="tel:+380931324782"><span class="contact-country">UA</span> +380 93 1324782</a></dd></div><div><dt>E-mail</dt><dd><a href="mailto:m.krystyna.197@gmail.com">m.krystyna.197@gmail.com</a></dd></div><div><dt>Instagram</dt><dd><a href="https://www.instagram.com/less_ceramics/" target="_blank" rel="noopener noreferrer">@less_ceramics <span aria-hidden="true">↗</span></a></dd></div><div><dt>WhatsApp</dt><dd><a href="https://wa.me/4915753604617" target="_blank" rel="noopener noreferrer">+49 1575 3604617 <span aria-hidden="true">↗</span></a></dd></div></dl>`;
  if(!original.includes('class="pending"')) throw Error('Contact placeholder missing');
  const icons=[
    '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 21l1.8-4.9A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="m9 7-1.5.5c-.8 3.7 2.5 7 6 7.5l1.5-1.5-2.5-1.5-1 1c-1.6-.7-2.8-1.9-3.5-3.5l1-1L9 7Z"/>'
  ];
  let index=0;
  const withIcons=content.replace(/<dt>/g,()=>'<dt><svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+icons[index++]+'</svg>');
  const html=original.replace(/<p class="pending">[\s\S]*?<\/p>/,withIcons);
  return script.replace(/^const contact=.*;$/m,()=>`const contact=${JSON.stringify(html)};`);
};
