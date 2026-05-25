# Зелёное Поле — Сельхозтехника

Адаптация дилерского сайта под тематику сельхозтехники.

## Стек

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (тёмная тема)
- React Router 7
- CMS/API через JSON (`public/api/`)

## Запуск

```bash
npm install
npm run dev
```

## Возможности

- **CMS/API** — каталог (`/api/equipment.json`) и контент сайта (`/api/site.json`)
- **Реальные фото** — по 3 снимка на единицу техники, галерея на странице модели
- **Сравнение** — до 3 моделей, панель внизу, страница `/compare`
- **Лизинг** — калькулятор на `/leasing`, переход с ценой из карточки
- **Тёмная тема** — переключатель в шапке, сохранение в `localStorage`

## Фотоальбомы техники

Для каждой модели — 3 фото в `public/images/equipment/`:

```
john-deere-8r-410-1.jpeg
john-deere-8r-410-2.jpeg
john-deere-8r-410-3.jpeg
```

Имя файла = `{slug}-1.jpeg` … `{slug}-3.jpeg` (slug из каталога).

Пересобрать ссылки в JSON после добавления файлов:

```bash
node scripts/setup-albums.mjs
```

На карточках: стрелки и точки; на странице модели — полная галерея с превью.

## API (mock CMS)

| Endpoint | Описание |
|----------|----------|
| `GET /api/equipment.json` | Каталог техники |
| `GET /api/site.json` | Тексты hero, features, about, параметры лизинга |

## Структура

```
public/api/          # JSON-данные (замена headless CMS)
src/api/             # HTTP-клиент
src/context/         # Theme, Equipment, Site, Compare
src/components/      # UI, catalog, leasing, home
src/pages/           # Маршруты приложения
```
