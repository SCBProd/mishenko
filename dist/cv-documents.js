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
  const path = (kind, format) => `assets/documents/Krystyna-Mishchenko-${kind}-${lang.toUpperCase()}.${format}?v=20261026-cv-order`;
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
  const journey = document.querySelector('.about-links a[href="#cv"]');
  if (journey) {journey.href=path('Artistic-Journey','pdf');journey.download='';journey.textContent=t[3]+' · PDF ↓';}
})();
