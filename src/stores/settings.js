import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // Available backgrounds
    backgrounds: [
      { id: 'monterey', name: 'Monterey', path: 'monterey.webp' },
      { id: 'monterey-dark', name: 'Monterey Dark', path: 'monterey_dark.webp' },
      { id: 'monterey-light', name: 'Monterey Light', path: 'monterey_light.webp' },
      { id: 'bigsur-dark', name: 'Big Sur Dark', path: 'bigsur_dark.webp' },
      { id: 'bigsur-light', name: 'Big Sur Light', path: 'bigsur_light.webp' },
      { id: 'ventura-dark', name: 'Ventura Dark', path: 'ventura_dark.webp' },
      { id: 'ventura-light', name: 'Ventura Light', path: 'ventura_light.webp' },
      { id: 'studio', name: 'Studio', path: 'studio.webp' },
    ],
    // Currently selected background (default: monterey)
    selectedBackground: 'monterey.webp',
  }),
  getters: {
    getCurrentBackground(state) {
      return state.backgrounds.find(bg => bg.path === state.selectedBackground)
    },
    getBackgroundPath(state) {
      return state.selectedBackground
    },
  },
  actions: {
    // Persist background to localStorage
    setBackground(backgroundPath) {
      this.selectedBackground = backgroundPath
      localStorage.setItem('selectedBackground', backgroundPath)
    },

    // Load saved background from localStorage
    loadSavedBackground() {
      const saved = localStorage.getItem('selectedBackground')
      if (saved && this.backgrounds.some(bg => bg.path === saved)) {
        this.selectedBackground = saved
      }
    },
  },
})
