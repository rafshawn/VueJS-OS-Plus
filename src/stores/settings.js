import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    selectedBackground: 'monterey.webp',
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
    accentColors: [
      { id: 'blue', name: 'Blue', value: 'var(--accent-blue)' },
      { id: 'purple', name: 'Purple', value: 'var(--accent-purple)' },
      { id: 'pink', name: 'Pink', value: 'var(--accent-pink)' },
      { id: 'red', name: 'Red', value: 'var(--accent-red)' },
      { id: 'orange', name: 'Orange', value: 'var(--accent-orange)' },
      { id: 'yellow', name: 'Yellow', value: 'var(--accent-yellow)' },
      { id: 'green', name: 'Green', value: 'var(--accent-green)' },
      { id: 'grey', name: 'Grey', value: 'var(--accent-grey)' },
    ],
  }),
  actions: {
    // Persist background to localStorage
    setBackground(backgroundPath) {
      this.selectedBackground = backgroundPath
      localStorage.setItem('selectedBackground', backgroundPath)
    },

    // Load saved background from localStorage
    loadBackground() {
      const saved = localStorage.getItem('selectedBackground')
      if (saved && this.backgrounds.some(bg => bg.path === saved)) {
        this.selectedBackground = saved
      }
    },
    setAccentColor(color) {
      this.accentColor = color
      document.documentElement.style.setProperty('--accent-color', color)
      localStorage.setItem('accentColor', color)
    },
    loadAccentColor() {
      const saved = localStorage.getItem('accentColor')
      if (saved) {
        this.accentColor = saved
        document.documentElement.style.setProperty('--accent-color', saved)
      }
    }
  },
})
