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
