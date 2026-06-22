import { describe, it, expect } from 'vitest'
import { calcElapsed } from './useTimer'

describe('calcElapsed', () => {
  it('returns zeroes when start equals now', () => {
    const now = new Date('2024-01-21T00:00:00')
    const result = calcElapsed(now, now)
    expect(result).toEqual({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
  })

  it('counts exactly 1 year', () => {
    const start = new Date('2024-01-21T00:00:00')
    const now   = new Date('2025-01-21T00:00:00')
    const result = calcElapsed(start, now)
    expect(result.years).toBe(1)
    expect(result.months).toBe(0)
    expect(result.days).toBe(0)
  })

  it('counts 2 years 3 months', () => {
    const start = new Date('2024-01-21T00:00:00')
    const now   = new Date('2026-04-21T00:00:00')
    const result = calcElapsed(start, now)
    expect(result.years).toBe(2)
    expect(result.months).toBe(3)
    expect(result.days).toBe(0)
  })

  it('counts seconds', () => {
    const start = new Date('2024-01-21T00:00:00')
    const now   = new Date('2024-01-21T00:00:45')
    const result = calcElapsed(start, now)
    expect(result.seconds).toBe(45)
  })
})
