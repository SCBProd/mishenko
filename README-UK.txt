ПОРТФОЛІО KRYSTYNA MISHCHENKO — NEXT.JS

## Запуск локально

Потрібен Node.js 22 або новіший.

```sh
npm ci
npm run dev
```

Відкрийте адресу, яку покаже Next.js (за замовчуванням http://localhost:3000).

## Збірка і запуск production-версії

```sh
npm run build
npm run start
```

Перед запуском і збіркою скрипт `scripts/prepare-legacy.mjs` створює `public/legacy/` з матеріалів у `dist/`. Ця папка генерується автоматично, не редагуйте її вручну.

## Публікація на Vercel

Імпортуйте GitHub-репозиторій у Vercel. Root Directory залиште коренем репозиторію, Framework Preset — Next.js, Build Command — `npm run build`, Output Directory — автоматичний Next.js default. Інші налаштування для стандартного деплою не потрібні.

Workflow `.github/workflows/next-build.yml` перевіряє збірку. Окремий `.github/workflows/pages.yml` публікує статичну копію на GitHub Pages.

## Де редагувати

- `app/` — Next.js-маршрути та оболонка сайту.
- `dist/` — вихідні файли сторінок, стилів, сценаріїв, зображень і документів портфоліо.
- `src/`, `document-source/` та JSON-файли в корені — вихідні дані й генератори окремих матеріалів.
- `scripts/prepare-legacy.mjs` — підготовка runtime-копії та правила для верхньої плашки.
- `archived-artworks/` — архів робіт; він не входить до сайту.

Зберігайте `dist/`, вихідні матеріали та архів робіт: сайт і подальше редагування залежать від цих файлів. Музей та нічна експозиція залишаються поза runtime; хаб містить кераміку, фотографію та 3D-мистецтво.
