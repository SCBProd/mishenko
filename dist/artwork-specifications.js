// Transcribed from the artist's supplied specification cards, 20 October 2026.
(()=>{
 const specifications={
  "encounters": {
    "size": ["42 × 28 × 3.3", "31 × 26 × 5.5", "26 × 22 × 4", "19 × 18.5 × 4", "17 × 18.5 × 4", "15 × 15 × 3.5"],
    "pigments": true,
    "glazePaintingOnly": true,
    "photographer": "Anna Medvedska"
  },
  "deep-exhalation": {
    "size": ["18.2 × 13.9 × 5.9"],
    "custom": {
      "en": ["Porcelain, glaze", "Casting in plaster moulds, painting with coloured glaze"],
      "ru": ["Фарфор, глазурь", "Литьё в гипсовые формы, роспись цветной глазурью"],
      "uk": ["Порцеляна, полива", "Лиття в гіпсові форми, розпис кольоровою поливою"],
      "de": ["Porzellan, Glasur", "Gießen in Gipsformen, Bemalung mit farbiger Glasur"],
      "pl": ["Porcelana, szkliwo", "Odlewanie w formach gipsowych, malowanie kolorowym szkliwem"]
    }
  },
  "from-the-inside": {
    "size": ["13 × 7.5 × 5.9"],
    "custom": {
      "en": ["Porcelain, glaze", "Casting in plaster moulds, painting with coloured glaze"],
      "ru": ["Фарфор, глазурь", "Литьё в гипсовые формы, роспись цветной глазурью"],
      "uk": ["Порцеляна, полива", "Лиття в гіпсові форми, розпис кольоровою поливою"],
      "de": ["Porzellan, Glasur", "Gießen in Gipsformen, Bemalung mit farbiger Glasur"],
      "pl": ["Porcelana, szkliwo", "Odlewanie w formach gipsowych, malowanie kolorowym szkliwem"]
    }
  },
  "shadows-of-2022": {
    "size": ["52.3 × 32 × 11", "51 × 31 × 11"],
    "custom": {
      "en": ["Chamotte clay, glaze, pigments, oxide", "Hand forming, engraving, painting with coloured pigments and glaze"],
      "ru": ["Шамотная масса, глазурь, пигменты, оксид", "Ручная формовка, гравировка, роспись цветными пигментами и глазурью"],
      "uk": ["Шамотна маса, полива, пігменти, оксид", "Ручна формовка, гравірування, розпис кольоровими пігментами та поливою"],
      "de": ["Schamottemasse, Glasur, Pigmente, Oxid", "Handformung, Gravur, Bemalung mit farbigen Pigmenten und Glasur"],
      "pl": ["Masa szamotowa, szkliwo, pigmenty, tlenek", "Formowanie ręczne, grawerowanie, malowanie kolorowymi pigmentami i szkliwem"]
    }
  },
  "devastated": {
    "size": [
      "18.2 × 11 × 6.5"
    ],
    "raku": true
  },
  "moment": {
    "size": [
      "25 × 17 × 6"
    ],
    "raku": true
  },
  "goodness": {
    "size": [
      "40 × 45 × 15"
    ],
    "pigments": true
  },
  "white-poppies": {
    "size": [
      "33.7 × 32.5 × 8",
      "23 × 20.2 × 9.1"
    ],
    "raku": true
  },
  "in-the-line-of-fire": {
    "size": [
      "14 × 13 × 6.5"
    ],
    "raku": true
  },
  "different": {
    "size": [
      "32.5 × 15.5 × 11",
      "32.5 × 15.5 × 11"
    ],
    "raku": true
  },
  "shadows-2021": {
    "size": [
      "72 × 35.5 × 10",
      "72 × 35.5 × 10"
    ],
    "pigments": true
  }
};
 const translations={
  "en": {
    "labels": [
      "Dimensions (H × W × D)",
      "Material",
      "Technique"
    ],
    "material": "Chamotte clay, effect glazes",
    "pigments": ", pigments",
    "technique": "Hand forming, engraving, painting with coloured glazes",
    "pigmentTechnique": "Hand forming, engraving, painting with pigments and glazes",
    "raku": ", raku firing",
    "unit": "cm",
    "part": "Element"
  },
  "ru": {
    "labels": [
      "Размеры (В × Ш × Г)",
      "Материал",
      "Техника"
    ],
    "material": "Шамотная масса, эффектарные глазури",
    "pigments": ", пигменты",
    "technique": "Ручная формовка, гравировка, роспись цветными глазурями",
    "pigmentTechnique": "Ручная формовка, гравировка, роспись пигментами и глазурями",
    "raku": ", обжиг раку",
    "unit": "см",
    "part": "Элемент"
  },
  "uk": {
    "labels": [
      "Розміри (В × Ш × Г)",
      "Матеріал",
      "Техніка"
    ],
    "material": "Шамотна маса, ефектарні поливи",
    "pigments": ", пігменти",
    "technique": "Ручна формовка, гравірування, розпис кольоровими поливами",
    "pigmentTechnique": "Ручна формовка, гравірування, розпис пігментами та поливами",
    "raku": ", випал раку",
    "unit": "см",
    "part": "Елемент"
  },
  "de": {
    "labels": [
      "Maße (H × B × T)",
      "Material",
      "Technik"
    ],
    "material": "Schamottemasse, Effektglasuren",
    "pigments": ", Pigmente",
    "technique": "Handformung, Gravur, Bemalung mit farbigen Glasuren",
    "pigmentTechnique": "Handformung, Gravur, Bemalung mit Pigmenten und Glasuren",
    "raku": ", Rakubrand",
    "unit": "cm",
    "part": "Element"
  },
  "pl": {
    "labels": [
      "Wymiary (wys. × szer. × gł.)",
      "Materiał",
      "Technika"
    ],
    "material": "Masa szamotowa, szkliwa efektowe",
    "pigments": ", pigmenty",
    "technique": "Formowanie ręczne, grawerowanie, malowanie kolorowymi szkliwami",
    "pigmentTechnique": "Formowanie ręczne, grawerowanie, malowanie pigmentami i szkliwami",
    "raku": ", wypał raku",
    "unit": "cm",
    "part": "Element"
  }
};
 for(const project of window.portfolioProjects||[]){
  const spec=specifications[project.id];if(!spec)continue;
  for(const [lang,data] of Object.entries(project.text)){
   const t=translations[lang];if(!t)continue;
   const dimensions=spec.size.map((size,i)=>(spec.size.length>1?t.part+' '+(i+1)+': ':'')+(lang==='en'?size:size.replace(/\./g,','))+' '+t.unit).join('\n');
   const custom=spec.custom?.[lang];
   data.facts=[[t.labels[0],dimensions],[t.labels[1],custom?custom[0]:t.material+(spec.pigments?t.pigments:'')],[t.labels[2],custom?custom[1]:(spec.pigments&&!spec.glazePaintingOnly?t.pigmentTechnique:t.technique)+(spec.raku?t.raku:'')]];
   if(spec.photographer)project.photoCredit=spec.photographer;
  }
 }
})();
