# Masha Love Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-screen animated gift website for an anniversary, using React + Framer Motion + tsParticles + SCSS animations.

**Architecture:** Single-page React app with Zustand state machine (`currentScreen: 0–6`). Each screen is a full-viewport component wrapped in Framer Motion `AnimatePresence`. Navigation is theatrical — the user clicks to advance; no scroll-jacking.

**Tech Stack:** Vite 5 · React 18 · TypeScript 5 · Tailwind 3 · SCSS · Framer Motion 11 · Zustand 4 · tsParticles · React CountUp · TypeIt React · Howler.js · react-parallax-tilt · canvas-confetti · fireworks-js · Lenis

**Spec:** `docs/superpowers/specs/2026-06-22-masha-love-site-design.md`

---

## File Map

```
src/
├── main.tsx
├── App.tsx
├── store/
│   └── useScreenStore.ts
├── constants/
│   ├── config.ts
│   └── words.ts
├── hooks/
│   └── useTimer.ts
├── components/
│   ├── StarField.tsx
│   ├── NavigationArrow.tsx
│   ├── MobileGuard.tsx
│   └── MusicPlayer.tsx
├── screens/
│   ├── Screen0_Splash.tsx
│   ├── Screen1_Timer.tsx
│   ├── Screen2_Letter.tsx
│   ├── Screen3_LoveIs.tsx
│   ├── Screen4_Rose.tsx
│   ├── Screen5_Galaxy.tsx
│   └── Screen6_Final.tsx
└── styles/
    ├── globals.scss
    ├── rose.module.scss
    └── galaxy.module.scss
```

---

## Task 1: Project Scaffolding ✅

**Files:**
- Create: `package.json` (via Vite CLI)
- Create: `tailwind.config.js`
- Create: `vite.config.ts`
- Create: `src/main.tsx`

- [x] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
npx create-vite@latest . --template react-ts --overwrite ignore
```

- [x] **Step 2: Install all dependencies**

```bash
npm install
npm install framer-motion zustand @tsparticles/react @tsparticles/slim react-countup typeit-react howler @types/howler react-parallax-tilt canvas-confetti @types/canvas-confetti fireworks-js @studio-freight/lenis
npm install -D tailwindcss postcss autoprefixer sass
npx tailwindcss init -p
```

- [x] **Step 3: Configure Tailwind**

Replace contents of `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#050510',
        surface:   '#0d0d2b',
        accent:    '#cc44aa',
        highlight: '#ff88cc',
        gold:      '#d4af37',
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', 'serif'],
        sans:   ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [x] **Step 4: Configure vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
})
```

- [x] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: dev server starts on `http://localhost:5173`. No errors.

- [x] **Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold vite react-ts project with dependencies"
```

---

## Task 2: Global Styles & Fonts

**Files:**
- Create: `src/styles/globals.scss`
- Modify: `index.html`
- Modify: `src/main.tsx`

- [ ] **Step 1: Add Google Fonts to index.html**

In `index.html`, add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Write globals.scss**

Create `src/styles/globals.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #050510;
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
}

::selection {
  background: rgba(204, 68, 170, 0.3);
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #050510;
}
::-webkit-scrollbar-thumb {
  background: #cc44aa;
  border-radius: 2px;
}
```

- [ ] **Step 3: Import globals in main.tsx**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Verify fonts load**

Run `npm run dev`. Open DevTools → Network → filter "font". Confirm Cormorant Garamond and DM Sans requests succeed (200).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global styles, fonts, tailwind config"
```

---

## Task 3: Constants & Config

**Files:**
- Create: `src/constants/config.ts`
- Create: `src/constants/words.ts`

- [ ] **Step 1: Create config.ts**

```ts
// src/constants/config.ts

/** Дата начала отношений */
export const START_DATE = new Date('2024-01-21T00:00:00');

/** Текст письма (Экран 2). Замени на своё письмо. */
export const LETTER_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
Nisi ut aliquip ex ea commodo consequat duis aute irure dolor. 
In reprehenderit in voluptate velit esse cillum dolore eu fugiat.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

/** Путь или URL к картинке Love Is (Экран 3). Замени когда будет готова. */
export const LOVE_IS_IMAGE = '';

/** Подпись под картинкой Love Is (Экран 3). */
export const LOVE_IS_CAPTION = '';

/** Путь или URL к музыкальному файлу mp3. Оставь пустым — плеер покажет заглушку. */
export const MUSIC_SRC = '';
```

- [ ] **Step 2: Create words.ts**

```ts
// src/constants/words.ts

/** Слова, которые падают на Экране 4 (Роза). Добавь свои. */
export const WORDS: string[] = [
  'нежность', 'тепло', 'смех', 'доверие', 'уют', 'счастье',
  'утро', 'объятия', 'глаза', 'улыбка', 'дом', 'вместе',
  'навсегда', 'моя', 'родная', 'любовь', 'мечта', 'свет',
  'радость', 'покой', 'бесконечность', 'ты',
];
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add config constants and words placeholder"
```

---

## Task 4: Zustand Screen Store

**Files:**
- Create: `src/store/useScreenStore.ts`

- [ ] **Step 1: Create the store**

```ts
// src/store/useScreenStore.ts
import { create } from 'zustand'

export const TOTAL_SCREENS = 7 // 0..6

interface ScreenStore {
  currentScreen: number
  goNext: () => void
  goPrev: () => void
  goTo: (n: number) => void
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
  currentScreen: 0,

  goNext: () => {
    const { currentScreen } = get()
    if (currentScreen < TOTAL_SCREENS - 1) {
      set({ currentScreen: currentScreen + 1 })
    }
  },

  goPrev: () => {
    const { currentScreen } = get()
    if (currentScreen > 0) {
      set({ currentScreen: currentScreen - 1 })
    }
  },

  goTo: (n: number) => {
    if (n >= 0 && n < TOTAL_SCREENS) {
      set({ currentScreen: n })
    }
  },
}))
```

- [ ] **Step 2: Write unit test and run**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add zustand screen store with tests"
```

---

## Task 5: Timer Hook

**Files:**
- Create: `src/hooks/useTimer.ts`

- [ ] **Step 1: Implement useTimer.ts**

```ts
// src/hooks/useTimer.ts
import { useState, useEffect } from 'react'

export interface Elapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function calcElapsed(start: Date, now: Date): Elapsed {
  let years  = now.getFullYear() - start.getFullYear()
  let months = now.getMonth()    - start.getMonth()
  let days   = now.getDate()     - start.getDate()
  let hours  = now.getHours()    - start.getHours()
  let mins   = now.getMinutes()  - start.getMinutes()
  let secs   = now.getSeconds()  - start.getSeconds()

  if (secs < 0)  { secs  += 60; mins--  }
  if (mins < 0)  { mins  += 60; hours-- }
  if (hours < 0) { hours += 24; days--  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) { months += 12; years-- }

  return { years, months, days, hours, minutes: mins, seconds: secs }
}

export function useTimer(start: Date): Elapsed {
  const [elapsed, setElapsed] = useState<Elapsed>(() => calcElapsed(start, new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(calcElapsed(start, new Date()))
    }, 1000)
    return () => clearInterval(id)
  }, [start])

  return elapsed
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add useTimer hook"
```

---

## Task 6: MobileGuard Component

**Files:**
- Create: `src/components/MobileGuard.tsx`

---

## Task 7: StarField Component

**Files:**
- Create: `src/components/StarField.tsx`

---

## Task 8: NavigationArrow Component

**Files:**
- Create: `src/components/NavigationArrow.tsx`

---

## Task 9: MusicPlayer Component (Stub)

**Files:**
- Create: `src/components/MusicPlayer.tsx`

---

## Task 10: App.tsx — Screen Switcher

**Files:**
- Modify: `src/App.tsx`

---

## Task 11: Screen 0 — Splash

**Files:**
- Modify: `src/screens/Screen0_Splash.tsx`

---

## Task 12: Screen 1 — Timer

**Files:**
- Modify: `src/screens/Screen1_Timer.tsx`

---

## Task 13: Screen 2 — Letter

**Files:**
- Modify: `src/screens/Screen2_Letter.tsx`

---

## Task 14: Screen 3 — Love Is Card

**Files:**
- Modify: `src/screens/Screen3_LoveIs.tsx`

---

## Task 15: Screen 4 — Rose & Falling Words

**Files:**
- Create: `src/styles/rose.module.scss`
- Modify: `src/screens/Screen4_Rose.tsx`

---

## Task 16: Screen 5 — Galaxy

**Files:**
- Create: `src/styles/galaxy.module.scss`
- Modify: `src/screens/Screen5_Galaxy.tsx`

---

## Task 17: Screen 6 — Final

**Files:**
- Modify: `src/screens/Screen6_Final.tsx`

---

## Task 18: Final Wiring & Polish

**Files:**
- Modify: `src/App.tsx`
- Modify: `index.html`
- Run: full manual walkthrough
