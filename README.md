# Moya Masha — Love Site

Анимированный подарок-сайт на React + TypeScript с 7 полноэкранными сценами, плавными переходами и эффектами.

## Что внутри

- 7 экранов с последовательным сценарием: от заставки до финала
- Глобальная навигация на Zustand (`currentScreen: 0..6`)
- Анимации на Framer Motion
- Звездный фон через `@tsparticles/react`
- Таймер отношений + эффекты (TypeIt, CountUp, confetti, fireworks)
- Стили на SCSS + Tailwind v4

## Технологии

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Vitest + jsdom

## Быстрый старт

```bash
npm install
npm run dev
```

По умолчанию dev-сервер открывается автоматически (`vite --open`).

## Скрипты

- `npm run dev` — запуск локальной разработки
- `npm run build` — production-сборка
- `npm run preview` — предпросмотр production-сборки
- `npm run lint` — запуск ESLint

## Структура проекта

```text
src/
  components/      # Переиспользуемые UI-компоненты
  constants/       # Конфигурация и контент-плейсхолдеры
  hooks/           # Кастомные хуки
  screens/         # 7 основных экранов
  store/           # Zustand-хранилище
  styles/          # Глобальные и модульные SCSS-стили
```

## Где менять контент

Основные плейсхолдеры находятся в `src/constants/config.ts`:

- `LETTER_TEXT` — текст письма
- `LOVE_IS_IMAGE` — путь/URL к картинке
- `LOVE_IS_CAPTION` — подпись под карточкой
- `MUSIC_SRC` — ссылка на mp3
- `START_DATE` — дата начала отношений

Слова для экрана с розой: `src/constants/words.ts`.

## Документация

- Индекс: `docs/README.md`
- Дизайн-спека: `docs/superpowers/specs/2026-06-22-masha-love-site-design.md`
- План реализации: `docs/superpowers/plans/2026-06-22-masha-love-site.md`
