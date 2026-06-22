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
