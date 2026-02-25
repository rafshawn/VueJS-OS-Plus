import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    selectedBackground: 'monterey_light.webp',
    // Base wallpapers with optional dark/light variants
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
    darkMode: false,
  }),
  getters: {
    // Get the actual wallpaper path based on current dark mode setting
    currentBackground(state) {
      const group = state.wallpaperGroups.find(g =>
        g.default === state.selectedBackground ||
        g.light === state.selectedBackground ||
        g.dark === state.selectedBackground
      )

      if (!group) return state.selectedBackground

      // If wallpaper has variants, return the appropriate one
      if (group.light && group.dark) {
        return state.darkMode ? group.dark : group.light
      }

      // Otherwise return the default/current
      return state.selectedBackground
    },
    // Get display wallpapers (one per group, respecting dark mode)
    displayWallpapers(state) {
      return state.wallpaperGroups.map(group => {
        // Determine which path to show based on dark mode
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
    // Set background - store the base wallpaper ID, not the variant
    setBackground(backgroundPath) {
      // Find which group this wallpaper belongs to
      const group = this.wallpaperGroups.find(g =>
        g.default === backgroundPath ||
        g.light === backgroundPath ||
        g.dark === backgroundPath
      )

      if (group) {
        // Store the appropriate variant based on current dark mode
        if (group.light && group.dark) {
          this.selectedBackground = this.darkMode ? group.dark : group.light
        } else {
          this.selectedBackground = group.default
        }
        localStorage.setItem('selectedBackground', this.selectedBackground)
      }
    },

    // Load saved background from localStorage
    loadBackground() {
      const saved = localStorage.getItem('selectedBackground')
      if (saved && this.wallpaperGroups.some(bg =>
        bg.default === saved || bg.light === saved || bg.dark === saved
      )) {
        this.selectedBackground = saved
      }
    },

    // Switch wallpaper variant when dark mode changes
    updateWallpaperForDarkMode() {
      const group = this.wallpaperGroups.find(g =>
        g.default === this.selectedBackground ||
        g.light === this.selectedBackground ||
        g.dark === this.selectedBackground
      )

      if (group && group.light && group.dark) {
        // This wallpaper has variants, switch to the appropriate one
        this.selectedBackground = this.darkMode ? group.dark : group.light
        localStorage.setItem('selectedBackground', this.selectedBackground)
      }
    },

    setDarkMode(enabled) {
      this.darkMode = enabled
      if (enabled) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
      localStorage.setItem('darkMode', enabled)

      // Auto-switch wallpaper variant if current wallpaper supports it
      this.updateWallpaperForDarkMode()
    },
    loadDarkMode() {
      const saved = localStorage.getItem('darkMode')
      if (saved != null) {
        const enabled = saved === 'true'
        this.darkMode = enabled
        if (enabled) {
          document.documentElement.classList.add('dark-mode')
        }
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
