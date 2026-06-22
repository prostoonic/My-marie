import { describe, expect, it, vi } from 'vitest'
import { createFallingWord, FALLING_WORD_INTERVAL_MS, MAX_FALLING_WORDS, trimFallingWords } from './screen4RoseWords'

describe('screen4RoseWords helpers', () => {
  it('uses the faster word spawn interval', () => {
    expect(FALLING_WORD_INTERVAL_MS).toBe(650)
  })

  it('creates a falling word from the active text and random values', () => {
    const randomSpy = vi.spyOn(Math, 'random')
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

    randomSpy.mockRestore()
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
