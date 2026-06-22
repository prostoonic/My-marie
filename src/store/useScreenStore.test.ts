import { describe, it, expect, beforeEach } from 'vitest'
import { useScreenStore, TOTAL_SCREENS } from './useScreenStore'

beforeEach(() => {
  useScreenStore.setState({ currentScreen: 0 })
})

describe('useScreenStore', () => {
  it('starts at screen 0', () => {
    expect(useScreenStore.getState().currentScreen).toBe(0)
  })

  it('goNext increments screen', () => {
    useScreenStore.getState().goNext()
    expect(useScreenStore.getState().currentScreen).toBe(1)
  })

  it('goNext does not go past last screen', () => {
    useScreenStore.setState({ currentScreen: TOTAL_SCREENS - 1 })
    useScreenStore.getState().goNext()
    expect(useScreenStore.getState().currentScreen).toBe(TOTAL_SCREENS - 1)
  })

  it('goPrev decrements screen', () => {
    useScreenStore.setState({ currentScreen: 3 })
    useScreenStore.getState().goPrev()
    expect(useScreenStore.getState().currentScreen).toBe(2)
  })

  it('goPrev does not go below 0', () => {
    useScreenStore.getState().goPrev()
    expect(useScreenStore.getState().currentScreen).toBe(0)
  })

  it('goTo sets exact screen', () => {
    useScreenStore.getState().goTo(5)
    expect(useScreenStore.getState().currentScreen).toBe(5)
  })

  it('goTo ignores invalid screen numbers', () => {
    useScreenStore.getState().goTo(-1)
    expect(useScreenStore.getState().currentScreen).toBe(0)
    useScreenStore.getState().goTo(999)
    expect(useScreenStore.getState().currentScreen).toBe(0)
  })
})
