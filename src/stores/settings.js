import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    selectedBg: 'monterey_light.webp',
    theme: 'system',
    accentColor: 'var(--accent-blue)',
    darkMode: false,

    // Wallpapers with optional dark/light variants
    wallpaperGroups: [
      {
        id: 'monterey',
        name: 'Monterey',
        light: 'monterey_light.webp',
        dark: 'monterey_dark.webp'
      },
      {
        id: 'bigsur',
        name: 'Big Sur',
        light: 'bigsur_light.webp',
        dark: 'bigsur_dark.webp'
      },
      {
        id: 'ventura',
        name: 'Ventura',
        light: 'ventura_light.webp',
        dark: 'ventura_dark.webp'
      },
      {
        id: 'studio',
        name: 'Studio',
        default: 'studio.webp'
      },
      {
        id: 'black',
        name: 'Black',
        default: 'black.png'
      },
      {
        id: 'blue-violet',
        name: 'Blue Violet',
        default: 'blue-violet.png'
      },
      {
        id: 'cyan',
        name: 'Cyan',
        default: 'cyan.png'
      },
      {
        id: 'dusty-rose',
        name: 'Dusty Rose',
        default: 'dusty-rose.png'
      },
      {
        id: 'electric-blue',
        name: 'Electric Blue',
        default: 'electric-blue.png'
      },
      {
        id: 'gold',
        name: 'Gold',
        default: 'gold.png'
      },
      {
        id: 'gold-2',
        name: 'Gold 2',
        default: 'gold-2.png'
      },
      {
        id: 'ocher',
        name: 'Ocher',
        default: 'ocher.png'
      },
      {
        id: 'plum',
        name: 'Plum',
        default: 'plum.png'
      },
      {
        id: 'red-orange',
        name: 'Red Orange',
        default: 'red-orange.png'
      },
      {
        id: 'rose-gold',
        name: 'Rose Gold',
        default: 'rose-gold.png'
      },
      {
        id: 'silver',
        name: 'Silver',
        default: 'silver.png'
      },
      {
        id: 'soft-pink',
        name: 'Soft Pink',
        default: 'soft-pink.png'
      },
      {
        id: 'space-gray',
        name: 'Space Gray',
        default: 'space-gray.png'
      },
      {
        id: 'space-gray-pro',
        name: 'Space Gray Pro',
        default: 'space-gray-pro.png'
      },
      {
        id: 'stone',
        name: 'Stone',
        default: 'stone.png'
      },
      {
        id: 'teal',
        name: 'Teal',
        default: 'teal.png'
      },
      {
        id: 'turqouise-green',
        name: 'Turqouise Green',
        default: 'turqouise-green.png'
      },
      {
        id: 'yellow',
        name: 'Yellow',
        default: 'yellow.png'
      }
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
  getters: {
    currentWallpaper(state) {
      const group = state.wallpaperGroups.find(g =>
        g.default === state.selectedBg ||
        g.light === state.selectedBg ||
        g.dark === state.selectedBg
      )

      if (!group) return state.selectedBg

      // If wallpaper has variants, return the appropriate one
      if (group.light && group.dark) {
        return state.darkMode ? group.dark : group.light
      }

      // Otherwise return the default/current
      return state.selectedBg
    },
    displayWallpapers(state) {
      return state.wallpaperGroups.map(group => {
        let displayPath
        if (group.light && group.dark) {
          displayPath = state.darkMode ? group.dark : group.light
        } else {
          displayPath = group.default
        }

        return {
          id: group.id,
          name: group.name,
          path: displayPath,
          hasVariants: !!(group.light && group.dark)
        }
      })
    }
  },
  actions: {
    getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    // Update dark mode based on theme setting
    updateDarkMode() {
      let isDark
      if (this.theme === 'system') {
        isDark = this.getSystemTheme()
      } else {
        isDark = this.theme === 'dark'
      }

      this.darkMode = isDark

      if (isDark) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }

      this.updateWallpaperForDarkMode()
    },

    setTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)
      this.updateDarkMode()
    },

    // Load saved theme from localStorage and setup listener
    loadTheme() {
      const saved = localStorage.getItem('theme')
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        this.theme = saved
      }
      this.updateDarkMode()
    },

    // Setup listener for system theme changes
    setupSystemThemeListener() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      mediaQuery.addEventListener('change', (e) => {
        if (this.theme === 'system') {
          this.updateDarkMode()
        }
      })
    },

    // Set wallpaper
    setWallpaper(backgroundPath) {
      // Find which group this wallpaper belongs to
      const group = this.wallpaperGroups.find(g =>
        g.default === backgroundPath ||
        g.light === backgroundPath ||
        g.dark === backgroundPath
      )

      if (group) {
        if (group.light && group.dark) {
          this.selectedBg = this.darkMode ? group.dark : group.light
        } else {
          this.selectedBg = group.default
        }
        localStorage.setItem('selectedBg', this.selectedBg)
      }
    },

    // Load wallpaper from localStorage
    loadWallpaper() {
      const saved = localStorage.getItem('selectedBg')
      if (saved && this.wallpaperGroups.some(bg =>
        bg.default === saved || bg.light === saved || bg.dark === saved
      )) {
        this.selectedBg = saved
      }
    },

    // Switch wallpaper variant when dark mode changes
    updateWallpaperForDarkMode() {
      const group = this.wallpaperGroups.find(g =>
        g.default === this.selectedBg ||
        g.light === this.selectedBg ||
        g.dark === this.selectedBg
      )

      if (group && group.light && group.dark) {
        // This wallpaper has variants, switch to the appropriate one
        this.selectedBg = this.darkMode ? group.dark : group.light
        localStorage.setItem('selectedBg', this.selectedBg)
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
