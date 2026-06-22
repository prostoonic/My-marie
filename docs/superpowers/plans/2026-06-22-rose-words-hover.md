# Rose Words Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the falling words on `Screen4_Rose` appear more often and add a soft magical hover effect without changing navigation or the rose animation.

**Architecture:** Extract the word-spawn logic into a tiny helper module so the frequency and list-limiting behavior can be tested with Vitest. Keep the visual hover behavior inside `Screen4_Rose.tsx` and `rose.module.scss` using existing `framer-motion` plus a CSS glow layer.

**Tech Stack:** React 19, TypeScript, Framer Motion, SCSS Modules, Vitest

---

## File Map

```text
src/screens/
├── Screen4_Rose.tsx              # Screen markup, interval setup, framer-motion hover animation
├── screen4RoseWords.ts           # Pure helpers/constants for word creation and trimming
└── screen4RoseWords.test.ts      # Vitest coverage for helper behavior

src/styles/
└── rose.module.scss              # Hover glow/orbit styling for falling words
```

---

### Task 1: Testable Falling Word Helpers

**Files:**
- Create: `src/screens/screen4RoseWords.ts`
- Test: `src/screens/screen4RoseWords.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it, vi } from 'vitest'
import { createFallingWord, FALLING_WORD_INTERVAL_MS, MAX_FALLING_WORDS, trimFallingWords } from './screen4RoseWords'

describe('screen4RoseWords helpers', () => {
  it('uses the faster word spawn interval', () => {
    expect(FALLING_WORD_INTERVAL_MS).toBe(650)
  })

  it('creates a falling word from the active text and random values', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.9)

    expect(createFallingWord(7, 'Моя любовь')).toEqual({
      id: 7,
      text: 'Моя любовь',
      x: 30,
      duration: 9.6,
      color: '#ff88cc',
    })
  })

  it('keeps only the most recent words up to the screen limit', () => {
    const words = Array.from({ length: MAX_FALLING_WORDS + 3 }, (_, index) => ({
      id: index,
      text: `word-${index}`,
      x: 20,
      duration: 10,
      color: '#ffffff',
    }))

    const trimmed = trimFallingWords(words)

    expect(trimmed).toHaveLength(MAX_FALLING_WORDS)
    expect(trimmed[0]?.id).toBe(3)
    expect(trimmed.at(-1)?.id).toBe(MAX_FALLING_WORDS + 2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/screens/screen4RoseWords.test.ts`

Expected: FAIL because `src/screens/screen4RoseWords.ts` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export interface FallingWord {
  id: number
  text: string
  x: number
  duration: number
  color: string
}

export const FALLING_WORD_INTERVAL_MS = 650
export const MAX_FALLING_WORDS = 24

export function createFallingWord(id: number, text: string): FallingWord {
  return {
    id,
    text,
    x: 10 + Math.random() * 80,
    duration: 8 + Math.random() * 4,
    color: Math.random() > 0.5 ? '#ff88cc' : '#ffffff',
  }
}

export function trimFallingWords(words: FallingWord[]): FallingWord[] {
  return words.slice(-MAX_FALLING_WORDS)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/screens/screen4RoseWords.test.ts`

Expected: PASS

---

### Task 2: Screen Integration And Hover Polish

**Files:**
- Modify: `src/screens/Screen4_Rose.tsx`
- Modify: `src/styles/rose.module.scss`

- [ ] **Step 1: Update screen to use helpers and interactive hover**

```tsx
import { createFallingWord, FALLING_WORD_INTERVAL_MS, trimFallingWords } from './screen4RoseWords'

// ...

setFallingWords((prev) => trimFallingWords([...prev, createFallingWord(wordIdCounter++, text)]))

// ...

<motion.span
  className={styles.fallingWord}
  whileHover={{
    scale: 1.14,
    y: -10,
    rotate: 0,
    filter: 'drop-shadow(0 0 12px rgba(255, 136, 204, 0.95)) drop-shadow(0 0 26px rgba(255, 136, 204, 0.6))',
    textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,136,204,0.95), 0 0 42px rgba(255,136,204,0.65)',
  }}
>
  <span className={styles.fallingWordGlow} aria-hidden="true">
    {word.text}
  </span>
  <span className={styles.fallingWordLabel}>{word.text}</span>
</motion.span>
```

- [ ] **Step 2: Add hover glow classes in `rose.module.scss`**

```scss
.fallingWord {
  position: absolute;
  top: -40px;
  z-index: 3;
  pointer-events: auto;
  cursor: default;
  user-select: none;
  transform-origin: center;
  will-change: transform, opacity, filter;
}

.fallingWordGlow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translate(8px, 8px) scale(1.03);
  filter: blur(10px);
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.fallingWordLabel {
  position: relative;
  z-index: 1;
}

.fallingWord:hover .fallingWordGlow {
  opacity: 0.55;
  transform: translate(14px, 12px) scale(1.06);
}
```

- [ ] **Step 3: Run verification**

Run:
- `npx vitest run src/screens/screen4RoseWords.test.ts`
- `npm run lint`

Expected:
- Vitest passes for the new helper module
- ESLint reports no new issues in touched files
