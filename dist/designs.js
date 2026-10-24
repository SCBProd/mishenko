const concepts=[
['Молочная галерея','Светлый','Спокойная симметрия, крупные работы и минимум текста. Керамика как основа портфолио.'],
['Тёмный музей','Тёмный','Одна работа в центре, широкие поля и мягкий контраст. Медленный, сосредоточенный просмотр.'],
['Авторский журнал','Светлый','Редакционная композиция: крупное имя, смещённые изображения и короткие подписи.'],
['Графический манифест','Тёмный','Выразительная типографика и чёрно-белая графика. Чёткая геометрия без цветового шума.'],
['Ателье','Светлый','Боковая навигация и свободная сетка. Чуть теплее и камернее классической галереи.'],
['Ночная экспозиция','Тёмный','Горизонтальная лента работ. Керамику можно рассматривать последовательно, как в выставочном зале.'],
['Бумажный каталог','Светлый','Строгий каталог с номерами, названиями и тонкими линиями. Все три направления отделены друг от друга.'],
['Кинематографичный','Тёмный','Крупный фрагмент фактуры, короткий заголовок и целые работы ниже. Акцент на материале.'],
['Тихая живопись','Светлый','Живопись на первом плане. Молочный фон, мягкая типографика и простор между изображениями.'],
['Современный архив','Тёмный','Компактная модульная сетка и боковая колонка. Портфолио как собрание работ.']
];
const art={
c05:['Керамическая композиция','Керамика'],c09:['Керамический объект','Керамика'],c11:['Керамический объект','Керамика'],c19:['Композиция с цветной глазурью','Керамика'],
p01:['Натюрморт со скрипкой','Акварель · 2017'],p02:['Голландский натюрморт','Акварель · 2017'],p03:['Голландский натюрморт','Масло · 2017'],
g01:['В ожидании','Графика · 30 × 21'],g02:['Сквозь пальцы','Графика · 30 × 21'],g03:['Композиция 3','Графика'],g04:['Композиция 9','Графика']
};
const $=s=>document.querySelector(s);
function pic(id,cls=''){return '<button class="picture '+cls+'" data-art="'+id+'" aria-label="Рассмотреть: '+art[id][0]+'"><span class="image-window '+(id.startsWith('c')?'rotated':'')+'"><img src="assets/'+id+'.webp" alt="'+art[id][0]+'"></span></button>'}
function card(id,n=''){return '<figure>'+pic(id)+'<figcaption><span>'+n+' '+art[id][0]+'</span><small>'+art[id][1]+'</small></figcaption></figure>'}
const nav='<nav><a href="#collection">Работы</a><a href="#artist">О художнице</a></nav>';
function head(label){return '<header class="site-head"><a class="wordmark" href="#top">KRYSTYNA<br>MISHCHENKO</a><span class="discipline">'+label+'</span>'+nav+'</header>'}
const bio='<section id="artist" class="bio"><span class="kicker">О ХУДОЖНИЦЕ</span><h2>Кристина Мищенко</h2><p>Художница и керамист. Художественная керамика, живопись и графика. Магистр декоративно-прикладного искусства — Киевская академия имени Михаила Бойчука.</p><p>Выставки и художественные проекты в Украине, Польше, Латвии и Финляндии.</p></section><footer><span>KRYSTYNA MISHCHENKO</span><a href="#top">Наверх ↑</a></footer>';
function content(n){switch(n){
case 1:return head('ХУДОЖЕСТВЕННАЯ КЕРАМИКА')+'<section class="opening"><span class="kicker">ФОРМА / МАТЕРИАЛ / РИТМ</span><h2>Искусство<br>приобретает форму.</h2><p>Krystyna Mishchenko · Художница, керамист</p></section><section id="collection" class="gallery equal">'+card('c09','01 —')+card('c11','02 —')+'</section><div class="wide-work">'+card('c05','03 —')+'</div>';
case 2:return head('SELECTED WORKS / КЕРАМИКА')+'<section class="opening"><span class="kicker">KRYSTYNA MISHCHENKO</span><h2>Присутствие<br>формы.</h2></section><section id="collection" class="museum">'+card('c09','01 /')+'<p>Фактура, линия и объём.<br>Художественная керамика.</p></section><section class="gallery equal narrow">'+card('c05','02 /')+card('c11','03 /')+'</section>';
case 3:return head('КЕРАМИКА И ГРАФИКА')+'<section class="editorial"><h2>Krystyna<br><i>Mishchenko</i></h2><div class="editor-note"><span class="kicker">АВТОРСКОЕ ПОРТФОЛИО</span><p>Диалог объёма<br>и плоскости.</p></div>'+pic('c05','main-pic')+pic('g01','small-pic')+'</section><section id="collection" class="gallery stagger">'+card('c11')+card('g02')+'</section>';
case 4:return head('ГРАФИКА / КОМПОЗИЦИЯ')+'<section class="manifest"><span class="kicker">KRYSTYNA MISHCHENKO</span><h2>ЛИНИЯ.<br>РИТМ.<br><em>ФОРМА.</em></h2>'+pic('g03')+'</section><section id="collection" class="gallery equal">'+card('g04','01')+card('g02','02')+'</section>';
case 5:return '<div class="atelier"><aside><img class="monogram" src="assets/logo.webp" alt="Монограмма"><h2>Krystyna<br>Mishchenko</h2><p>Художница.<br>Керамист.</p>'+nav+'<span class="kicker">КЕРАМИКА · ГРАФИКА</span></aside><section id="collection" class="atelier-grid">'+card('c19')+card('c05')+card('g01')+card('c11')+'</section></div>';
case 6:return head('КЕРАМИКА / ЭКСПОЗИЦИЯ')+'<section class="strip-heading"><h2>Форма<br>в пространстве.</h2><div><p>Krystyna Mishchenko<br>Художественная керамика</p><button class="scroll-next">Следующая работа →</button></div></section><section id="collection" class="strip" tabindex="0" aria-label="Горизонтальная галерея">'+card('c05','01')+card('c09','02')+card('c11','03')+card('c19','04')+'</section><p class="scroll-hint">Листай горизонтально →</p>';
case 7:return head('КАТАЛОГ РАБОТ')+'<section class="catalog-title"><h2>Krystyna<br>Mishchenko</h2><p>Керамика<br>Живопись<br>Графика</p></section><section id="collection" class="catalog">'+[['01','Керамика','c05','c11'],['02','Живопись','p02','p03'],['03','Графика','g01','g02']].map(x=>'<div class="catalog-row"><h3><small>'+x[0]+'</small>'+x[1]+'</h3>'+card(x[2])+card(x[3])+'</div>').join('')+'</section>';
case 8:return head('МАТЕРИАЛ И ФАКТУРА')+'<section class="cinema"><img src="assets/c19.webp" alt="Деталь керамической композиции"><div><span class="kicker">KRYSTYNA MISHCHENKO</span><h2>Почувствовать<br>материал.</h2><a href="#collection">Рассмотреть работы ↓</a></div></section><section id="collection" class="gallery equal">'+card('c19','01 — Целиком')+card('c05','02 —')+'</section>';
case 9:return head('ЖИВОПИСЬ / АКВАРЕЛЬ')+'<section class="painting-hero"><div><span class="kicker">KRYSTYNA MISHCHENKO</span><h2>Цвет.<br>Свет.<br><i>Тишина.</i></h2><p>Живопись и акварель.<br>Избранные натюрморты.</p><a href="#collection">Перейти к работам ↓</a></div>'+pic('p02')+'</section><section id="collection" class="gallery equal">'+card('p01')+card('p03')+'</section>';
case 10:return '<div class="archive"><aside><span class="kicker">ПОРТФОЛИО / АРХИВ</span><h2>KRYSTYNA<br>MISHCHENKO</h2><p>Керамика.<br>Живопись.<br>Графика.</p>'+nav+'</aside><section id="collection" class="archive-grid">'+['c09','c11','c05','c19','g01','g02'].map((id,i)=>card(id,String(i+1).padStart(2,'0'))).join('')+'</section></div>';
}}
let current=1,lastFocus;
concepts.forEach((c,i)=>{let b=document.createElement('button');b.innerHTML='<b>'+String(i+1).padStart(2,'0')+'</b><span>'+c[0]+'<small>'+c[1]+'</small></span>';b.onclick=()=>choose(i+1);b.dataset.n=i+1;$('#choices').append(b)});
function choose(n){current=n;const c=concepts[n-1];$('#choice-name').textContent=String(n).padStart(2,'0')+' / '+c[0];$('#choice-description').textContent=c[2];document.querySelectorAll('[data-n]').forEach(b=>{b.classList.toggle('chosen',+b.dataset.n===n);b.setAttribute('aria-pressed',String(+b.dataset.n===n))});$('#preview').className='v'+n+(n%2===0?' dark':' light');$('#preview').innerHTML='<div id="top"></div>'+content(n)+bio;document.querySelectorAll('[data-art]').forEach(b=>b.onclick=()=>{lastFocus=b;const id=b.dataset.art;$('#zoom-art').innerHTML=pic(id);$('#zoom-title').textContent=art[id][0]+' · '+art[id][1];$('#zoom').showModal();$('#close').focus()});document.querySelector('.scroll-next')?.addEventListener('click',()=>document.querySelector('.strip').scrollBy({left:600,behavior:'smooth'}));try{history.replaceState(null,'','#variant-'+n)}catch{}}
$('#close').onclick=()=>$('#zoom').close();$('#zoom').addEventListener('close',()=>lastFocus?.focus());
$('#focus').onclick=()=>{document.body.classList.add('focused');$('#restore').hidden=false;$('#preview').scrollIntoView();$('#preview').focus({preventScroll:true})};$('#restore').onclick=()=>{document.body.classList.remove('focused');$('#restore').hidden=true;window.scrollTo({top:0,behavior:'smooth'})};
const initial=Number(location.hash.match(/variant-(\d+)/)?.[1]);choose(initial>=1&&initial<=10?initial:1);

