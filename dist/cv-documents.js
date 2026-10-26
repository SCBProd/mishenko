(() => {
  const language = document.documentElement.lang;
  const labels = {
    en: ['Documents', 'Artist CV', 'Education, professional experience and languages.', 'Artistic journey', 'Artistic development, exhibitions, projects and awards.', 'Download'],
    ru: ['Документы', 'CV художницы', 'Образование, опыт работы и языки.', 'Творческий путь', 'Творческое развитие, выставки, проекты и награды.', 'Скачать'],
    uk: ['Документи', 'CV художниці', 'Освіта, досвід роботи та мови.', 'Творчий шлях', 'Творчий розвиток, виставки, проєкти та нагороди.', 'Завантажити'],
    de: ['Dokumente', 'Künstlerischer Lebenslauf', 'Ausbildung, Berufserfahrung und Sprachkenntnisse.', 'Künstlerischer Werdegang', 'Künstlerische Entwicklung, Ausstellungen, Projekte und Auszeichnungen.', 'Herunterladen'],
    pl: ['Dokumenty', 'CV artystyczne', 'Wykształcenie, doświadczenie zawodowe i języki.', 'Droga artystyczna', 'Rozwój artystyczny, wystawy, projekty i nagrody.', 'Pobierz']
  };
  const lang = labels[language] ? language : 'en';
  const t = labels[lang];
  const path = (kind, format) => `assets/documents/Krystyna-Mishchenko-${kind}-${lang.toUpperCase()}.${format}?v=20261026-reviewed`;
  const section = document.querySelector('#cv');
  if (!section) return;
  section.querySelector('.section-heading > a[download]')?.remove();
  const group = document.createElement('div');
  group.className = 'cv-documents';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', t[0]);
  [['CV',1,2],['Artistic-Journey',3,4]].forEach(([kind,title,description]) => {
    const card = document.createElement('article');
    card.className = 'cv-document';
    const heading = document.createElement('h3'); heading.textContent = t[title];
    const copy = document.createElement('p'); copy.textContent = t[description];
    const links = document.createElement('div'); links.className = 'cv-document-links';
    const preview=document.createElement('a');preview.href=path(kind,'pdf');preview.target='_blank';preview.rel='noopener noreferrer';preview.textContent=({ru:'Открыть PDF ↗',uk:'Відкрити PDF ↗',en:'View PDF ↗',de:'PDF ansehen ↗',pl:'Otwórz PDF ↗'})[lang];links.append(preview);
    ['pdf','docx'].forEach(format => {
      const a = document.createElement('a');
      a.href = path(kind,format); a.download = '';
      a.textContent = format === 'pdf' ? 'PDF ↓' : 'Word ↓';
      a.setAttribute('aria-label', `${t[5]}: ${t[title]} (${format.toUpperCase()})`);
      links.append(a);
    });
    card.append(heading,copy,links); group.append(card);
  });
  section.querySelector('.section-heading').after(group);
  document.querySelectorAll('a[href="assets/Krystyna-Mishchenko-CV.docx"]').forEach(a => {a.href=path('CV','docx');});
  const reviewed=window.portfolioCV?.[lang];
  if(reviewed){
    const heading=section.querySelector('h2');if(heading)heading.textContent=({ru:'CV И РЕЗЮМЕ',uk:'CV ТА РЕЗЮМЕ',en:'CV AND RÉSUMÉ',de:'LEBENSLAUF',pl:'CV I ŻYCIORYS'})[lang];
    const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
    const block=(label)=>{const panel=el('div','cv-layout');const body=el('div','cv-reviewed-content');panel.append(el('h3','',label),body);section.append(panel);return body};
    const experience=block(reviewed.head[2]);
    [['SAGA POTTERY','11.2020–02.2022'],['PROCS','2018–2021'],['Studio Gozhar','2020']].forEach(([studio,date],i)=>{const item=el('article','cv-experience');item.append(el('p','cv-date',date),el('h4','',studio),el('p','',reviewed.jobs[i]));experience.append(item)});
    const exhibitions=block(reviewed.head[5]);
    reviewed.ex.slice(0,4).forEach(text=>exhibitions.append(el('p','cv-record',text)));
    const more=el('details','cv-more');more.append(el('summary','',({ru:'Все выставки и проекты',uk:'Усі виставки та проєкти',en:'All exhibitions and projects',de:'Alle Ausstellungen und Projekte',pl:'Wszystkie wystawy i projekty'})[lang]));reviewed.ex.slice(4).forEach(text=>more.append(el('p','cv-record',text)));exhibitions.append(more);
    const awards=block(reviewed.head[6]);reviewed.aw.forEach(text=>awards.append(el('p','cv-record',text)));
    const languages=block(reviewed.head[3]);reviewed.langs.forEach(text=>languages.append(el('p','cv-record',text.trim())));
    const archive=el('a','cv-archive',({ru:'Скачать все документы на пяти языках · ZIP',uk:'Завантажити всі документи п’ятьма мовами · ZIP',en:'Download all documents in five languages · ZIP',de:'Alle Dokumente in fünf Sprachen herunterladen · ZIP',pl:'Pobierz wszystkie dokumenty w pięciu językach · ZIP'})[lang]);archive.href='assets/documents/Krystyna-Mishchenko-CV-and-Artistic-Journey-5-languages.zip?v=20261026-reviewed';archive.download='';section.append(archive);
  }
  const journey = document.querySelector('.about-links a[href="#cv"]');
  if (journey) {journey.href=path('Artistic-Journey','pdf');journey.download='';journey.textContent=t[3]+' · PDF ↓';}
})();
