# Сайт-открытка «Моя Маша» — Дизайн-спек

**Дата:** 2026-06-22  
**Проект:** Подарочный сайт на годовщину отношений  
**Стек:** React + TypeScript + Vite + Tailwind + SCSS + Framer Motion

---

## 1. Концепция

Сайт-открытка с 7 полноэкранными экранами, каждый из которых — отдельный «момент». Пользователь переходит между экранами по клику (театральная навигация). Никаких роутов, никакого скролл-жакинга — только чистое состояние `currentScreen: 0..6` и Framer Motion между ними.

**Настроение:** Космическая ночь — глубокий тёмно-синий фон, розово-фиолетовые акценты, мерцающие звёзды, плавные переходы.

**Аудитория:** Один человек. Открывается один раз. Должно захватить дыхание.

---

## 2. Дизайн-токены

### Цвета
```
--bg:          #050510   /* основной фон */
--surface:     #0d0d2b   /* карточки, поверхности */
--accent:      #cc44aa   /* основной акцент (розово-фиолетовый) */
--highlight:   #ff88cc   /* светлый акцент, hover */
--text:        #ffffff   /* основной текст */
--text-muted:  rgba(255,255,255,0.6)  /* второстепенный текст */
--gold:        #d4af37   /* редкие золотые детали */
```

### Шрифты
- **Заголовки:** Cormorant Garamond — italic, weight 300/600, letter-spacing широкий
- **Тело:** DM Sans — weight 300, letter-spacing 1px
- Подключение: Google Fonts

### Анимации (общие правила)
- Все transitions: `ease` или `easeOut`, никакого `linear`
- Минимальная длительность: 0.4s, максимальная для появления экрана: 1.2s
- stagger между дочерними элементами: 0.15–0.25s
- Все анимации оптимизированы через `will-change: transform, opacity`

---

## 3. Архитектура

### Структура файлов
```
src/
├── main.tsx
├── App.tsx                    # AnimatePresence + ScreenManager
├── store/
│   └── useScreenStore.ts      # Zustand: currentScreen, goNext, goPrev
├── screens/
│   ├── Screen0_Splash.tsx     # Заставка
│   ├── Screen1_Timer.tsx      # Таймер
│   ├── Screen2_Letter.tsx     # Письмо
│   ├── Screen3_LoveIs.tsx     # Love Is карточка
│   ├── Screen4_Rose.tsx       # Роза + слова
│   ├── Screen5_Galaxy.tsx     # Галактика
│   └── Screen6_Final.tsx      # Финал
├── components/
│   ├── StarField.tsx          # tsParticles звёзды (переиспользуется)
│   ├── NavigationArrow.tsx    # Кнопка "вперёд"
│   ├── MobileGuard.tsx        # Предупреждение для телефонов
│   └── MusicPlayer.tsx        # Заглушка для музыки (выкл по умолчанию)
├── styles/
│   ├── globals.scss
│   ├── rose.scss              # CSS-анимации розы
│   └── galaxy.scss            # CSS-анимации галактики
└── constants/
    ├── words.ts               # Массив слов для Экрана 4 (placeholder)
    └── config.ts              # START_DATE, WORDS и прочие константы
```

### Навигация
```typescript
// useScreenStore.ts
interface ScreenStore {
  currentScreen: number;   // 0..6
  goNext: () => void;
  goPrev: () => void;
}
```

`App.tsx` оборачивает все экраны в `<AnimatePresence mode="wait">`. Каждый экран — `<motion.div>` с `initial`, `animate`, `exit`. Переход: предыдущий экран уходит вверх + fade-out (0.5s), новый приходит снизу + fade-in (0.7s).

### Мобильная защита
`MobileGuard.tsx` — `useEffect` на mount, если `window.innerWidth < 1024` рендерит fullscreen overlay:
> *"Этот подарок создан для большого экрана 💻*  
> *Открой с компьютера — там тебя ждёт кое-что особенное ❤️"*

Overlay не закрывается, не скроллится. Кнопки нет.

---

## 4. Экраны

### Экран 0 — Заставка (`Screen0_Splash`)

**Фон:** `StarField` — tsParticles, ~200 частиц, белые точки 1–3px, opacity 0.2–1.0, анимация twinkle (scale + opacity), случайный темп 2–5s.

**Появление (stagger sequence):**
1. `0s` — звёзды появляются (fade-in 1s)
2. `1.5s` — первая строка: *"Для самой любимой девочки ❤️"* (Cormorant Garamond, italic, 36px, `--highlight`, slide-up + fade-in 0.8s)
3. `1.9s` — вторая строка: *"Нажми, чтобы открыть нашу маленькую историю"* (DM Sans, 16px, `--text-muted`, slide-up + fade-in 0.8s)
4. `2.5s` — кнопка «Открыть» появляется (fade-in + scale 0.95→1)

**Кнопка «Открыть»:**
- Стиль: border 1px `--accent`, rounded-full, px-8 py-3, DM Sans
- Hover: box-shadow розовое свечение, background `--accent` (transition 0.3s)
- Клик: `goNext()` + экран растворяется

---

### Экран 1 — Таймер (`Screen1_Timer`)

**Фон:** тёмный + 8–12 сердечек (Framer Motion `animate: y` от 0 до -80px, opacity 0→1→0, случайный x-позиция, stagger, бесконечный loop).

**Контент (по центру):**
```
❤️ Мы вместе уже

[ 02 ] [ 05 ] [ 01 ]    ← years / months / days  
  лет   месяцев  день

[ 17 ] [ 24 ] [ 31 ]    ← hours / minutes / seconds
  часов  минут  секунд
```
- React CountUp для каждой ячейки. `START_DATE = new Date('2024-01-21T00:00:00')`.
- Секунды обновляются через `setInterval(1000)`.
- Цифры: Cormorant Garamond 72px bold, белые. Подписи: DM Sans 12px, `--text-muted`.

**Подпись внизу:**  
*"И я бы прожил каждый из этих дней с тобой снова."*  
Появляется через TypeIt с задержкой 2s после mount. DM Sans italic, `--text-muted`.

---

### Экран 2 — Письмо (`Screen2_Letter`)

**Фаза 1 — конверт:**
- Центр экрана: CSS-конверт (чистый SCSS). Крышка (`::before`) чуть приоткрыта и покачивается (keyframe: rotate -2deg → +2deg, 3s infinite).
- Сверху: *"тыкай тыкай ↓"* DM Sans 14px, opacity 0.6, bounce анимация.

**Фаза 2 — открытие (по клику на конверт):**
1. Крышка открывается (rotate 0 → -150deg, 0.6s ease-out)
2. Из конверта выезжает бумага (translateY +60px → -20px, 0.8s)
3. Бумага раскрывается в fullscreen карточку (scale + borderRadius, 0.6s)
4. Текст письма fade-in построчно (stagger 0.1s)

**Содержимое письма:** `LETTER_TEXT` константа (placeholder lorem ipsum). Lenis для внутреннего скролла если текст длиннее экрана.

**Закрытие / продолжение:** крестик в углу возвращает к конверту (обратная анимация). После закрытия появляется `NavigationArrow` — можно идти дальше.

---

### Экран 3 — Love Is (`Screen3_LoveIs`)

**Фон:** `StarField` (разреженный, 80 частиц).

**Карточка:**
- Размер: 380×520px
- Появление: Framer Motion `rotateY: 90→0, opacity: 0→1` (0.8s, delay 0.3s) — эффект перелистывания
- Содержимое: `<img>` заглушка с overlay-текстом *"← твоя картинка"*
- react-parallax-tilt: `tiltMaxAngleDegree=8, glareEnable=true, glareMaxOpacity=0.15`
- Подпись под карточкой: `LOVE_IS_CAPTION` (placeholder)

---

### Экран 4 — Роза (`Screen4_Rose`)

**Фон:** `#050510`, CSS-роза конвертирована в React-компонент `<RoseInGlass />`.  
SCSS-переменные и keyframes (bloom, glowing, falling) сохраняются без изменений, только обёрнуты в CSS Modules.

**Падающие слова:**
- Источник: `WORDS: string[]` из `src/constants/words.ts` (сейчас 20 lorem ipsum слов)
- Рендер: каждые 1.2s появляется новое слово в случайной x-позиции (10–90% ширины)
- Анимация: `translateY: -80px → 110vh`, `rotate: -15deg → +15deg`, opacity 0→1→0, duration 8–12s случайный
- Цвет слов: `--highlight` или `white` случайно

---

### Экран 5 — Галактика (`Screen5_Galaxy`)

**Фон:** CSS-галактика:
- Звёзды `.star` (5000 штук) генерируются в `useEffect` через vanilla DOM (без jQuery) и вставляются в ref на `.galaxy`
- Дополнительно 700 фоновых звёзд рендерятся в отдельный контейнер (не в `body`, а в корневой div экрана)
- Cleanup в return useEffect — удаляет все звёзды при размонтировании
- `.galaxy` вращается (rotate 300s linear infinite)
- `.universe` трансформирован через `perspective(50em) rotateX(-120deg) rotateY(20deg)`

**Текст (TypeIt, построчно):**
```
Во Вселенной миллиарды звезд,     → пауза 1500ms
миллиарды людей,                   → пауза 1000ms
миллиарды случайностей.            → пауза 2500ms

И каким-то невероятным образом    → пауза 800ms
мы нашли друг друга ❤️
```
Шрифт: Cormorant Garamond italic 28px, белый, text-shadow розовое свечение.  
Текст появляется через 2s после mount, чтобы галактика успела раскрутиться.

---

### Экран 6 — Финал (`Screen6_Final`)

**Фаза 1 — вопрос:**
- Центр: *"А сколько ещё?"* — Cormorant Garamond 48px, fade-in 1s
- Кнопка: *"Узнать"* — аналогична кнопке на Экране 0

**Фаза 2 — ответ (по клику, AnimatePresence):**
- Вопрос уходит (fade-out + scale 0.9, 0.4s)
- Появляется финальный блок (fade-in + scale 0.95→1, 0.8s):

```
Надеюсь, впереди ещё:

∞  дней
∞  объятий
∞  поцелуев
∞  счастливых моментов вместе ❤️
```

- Символы `∞` появляются по одному (stagger 0.4s), каждый пульсирует (`scale: 1→1.15→1`, 2s infinite)
- Через 0.5s после появления финала: `canvas-confetti` + `Fireworks.js` запускаются одновременно (5–7 секунд, потом останавливаются сами)

---

## 5. Компоненты

### `StarField`
```typescript
interface StarFieldProps {
  count?: number;       // default 200
  speed?: number;       // default 1 (множитель twinkle)
  opacity?: number;     // default 1
}
```
Переиспользуется на Экранах 0, 3. На Экране 3 — `count=80, opacity=0.6`.

### `NavigationArrow`
- Фиксированная позиция bottom-right
- Chevron вниз / вправо
- **Скрыт на Экране 0** — там роль кнопки выполняет «Открыть»
- **Скрыт пока письмо открыто** (Экран 2, Фаза 2) — чтобы не мешать чтению; появляется снова при закрытии письма
- Скрывается на последнем экране (Экран 6, Фаза 2) — после финального раскрытия
- Hover: scale 1.1, glow

### `MusicPlayer`
- Иконка в top-right углу (музыкальная нота)
- По умолчанию: выключена (серая)
- Клик: включает/выключает (Howler.js)
- `MUSIC_SRC = ''` — пустая строка, плеер показывает tooltip *"Скоро добавим музыку ♫"*

---

## 6. Конфигурационные константы (`src/constants/config.ts`)

```typescript
export const START_DATE = new Date('2024-01-21T00:00:00');

export const WORDS: string[] = [
  // placeholder — замени своими словами
  'нежность', 'тепло', 'смех', 'доверие', 'уют', 'счастье',
  'утро', 'объятия', 'глаза', 'улыбка', 'дом', 'вместе',
  // ... добавь сколько угодно
];

export const LETTER_TEXT = `Lorem ipsum dolor sit amet...`; // замени письмом

export const LOVE_IS_CAPTION = ''; // подпись под карточкой Love Is
export const LOVE_IS_IMAGE = '';   // путь к картинке
```

---

## 7. Placeholder'ы (что нужно заполнить потом)

| Что | Где | Как заменить |
|---|---|---|
| Текст письма | `config.ts → LETTER_TEXT` | Вставить свой текст |
| Картинка Love Is | `config.ts → LOVE_IS_IMAGE` | Путь к файлу или URL |
| Подпись Love Is | `config.ts → LOVE_IS_CAPTION` | Любой текст |
| Слова для розы | `config.ts → WORDS[]` | Массив строк |
| Музыка | `config.ts → MUSIC_SRC` | Путь к mp3 или URL |

---

## 8. Решения и обоснования

- **Vite вместо CRA** — быстрее, нет legacy overhead
- **Zustand вместо useState** — состояние экрана нужно в нескольких компонентах (NavigationArrow, MusicPlayer)
- **CSS-анимации для розы и галактики** — оригинальный код уже готов, конвертировать в JS лишняя работа; SCSS Modules изолируют стили
- **TypeIt вместо самописного** — надёжнее, поддерживает паузы и удаление
- **Один StarField компонент** — не дублировать логику tsParticles
- **Мобильная блокировка без кнопки** — сайт не адаптирован, давать иллюзию что "можно попробовать" — плохой UX

---

## 9. Зависимости

```json
{
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "vite": "^5",
  "framer-motion": "^11",
  "@tsparticles/react": "^3",
  "@tsparticles/slim": "^3",
  "react-countup": "^6",
  "typeit-react": "^3",
  "howler": "^2",
  "@types/howler": "^2",
  "react-parallax-tilt": "^1",
  "canvas-confetti": "^1",
  "@types/canvas-confetti": "^1",
  "fireworks-js": "^2",
  "zustand": "^4",
  "@studio-freight/lenis": "^1",
  "tailwindcss": "^3",
  "sass": "^1"
}
```
