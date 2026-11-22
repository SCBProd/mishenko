(()=>{
 const section=document.querySelector('#about.about-editorial');if(!section)return;
 const biography=section.querySelector('.artist-biography');
 const details=biography?.querySelector('.about-more');
 const continuation=details?.querySelector('.about-continuation');
 const paragraphs=biography?Array.from(biography.children).filter(el=>el.tagName==='P'):[];
 if(!continuation||paragraphs.length<4)return;
 const extra=paragraphs.slice(3);
 const phone=matchMedia('(max-width:700px)');
 function sync(){for(const paragraph of extra){if(phone.matches)continuation.insertBefore(paragraph,continuation.firstChild);else biography.insertBefore(paragraph,details)}details.open=false}
 phone.addEventListener('change',sync);sync();
})();
