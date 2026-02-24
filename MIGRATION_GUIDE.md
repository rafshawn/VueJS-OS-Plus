# Vue 2 → Vue 3 Migration Guide

This guide walks through migrating this project from **Vue 2 + Vuex + Vue CLI** to **Vue 3 + Pinia + Vite**.

---

## Quick Reference: What Changes

| Area | Vue 2 | Vue 3 |
|------|-------|-------|
| Framework | `vue@2.6` | `vue@3.3+` |
| State | Vuex | Pinia |
| Build | Vue CLI | Vite |
| API Style | Options API | Options API or Composition API |
| Global Properties | `Vue.prototype` | `app.config.globalProperties` |
| Component Registration | `components: {}` | Same (or use `<script setup>`) |

---

## Step 1: Install Dependencies

```bash
# Remove old dependencies
npm uninstall vue vuex vue-template-compiler @vue/cli-service @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-vuex

# Install Vue 3 + Vite
npm install vue@latest pinia
npm install -D vite @vitejs/plugin-vue

# Optional: Keep eslint with Vue 3 support
npm install -D eslint-plugin-vue@latest
```

---

## Step 2: Create Vite Config

**vite.config.js** (project root):
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
})
```

---

## Step 3: Update `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.vue src"
  }
}
```

---

## Step 4: Update `index.html`

Move `public/index.html` to project root as `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.ico">
    <title>Vue OS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

## Step 5: Update `src/main.js`

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'  // Will be migrated to Pinia

const app = createApp(App)
const pinia = createPinia()

// Migrate global properties
import moment from 'moment'
app.config.globalProperties.moment = moment
app.config.globalProperties.$moment = moment

app.use(pinia)
app.use(store)  // Remove after Pinia migration

app.mount('#app')
```

---

## Step 6: Migrate Store to Pinia

Create `src/stores/window.js`:

```javascript
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', {
  state: () => ({
    fullscreenWindowHeight: window.innerHeight + 'px',
    activeWindow: 'nil',
    activeWindows: [],
    zIndex: 2,
    aboutDialogOpen: false,
    appleMenuOpen: false,
    fileMenuOpen: false,
    controlCenterOpen: false,
    windows: [
      {
        windowId: 'LoremIpsum',
        windowState: 'close',
        displayName: 'Lorem Ipsum',
        windowComponent: 'window',
        windowContent: 'Placeholder',
        windowContentPadding: { top: null, right: null, bottom: null, left: null },
        position: 'absolute',
        positionX: '10vw',
        positionY: '15vh',
        iconImage: 'placeholder.png',
        altText: 'Placeholder Icon',
        fullscreen: false
      },
      // ... rest of windows
    ],
  }),

  getters: {
    getActiveWindow: (state) => state.activeWindow,
    getWindowById: (state) => (id) => state.windows.find(w => w.windowId === id),
    getWindowFullscreen: (state) => (id) => {
      const win = state.windows.find(w => w.windowId === id)
      return win ? win.fullscreen : false
    },
    getWindows: (state) => state.windows,
    getActiveWindows: (state) => state.activeWindows,
    getFullscreenWindowHeight: (state) => state.fullscreenWindowHeight,
  },

  actions: {
    setActiveWindow(windowId) {
      this.activeWindow = windowId
    },

    pushActiveWindow(window) {
      this.activeWindows.push(window)
    },

    popActiveWindow(window) {
      const index = this.activeWindows.indexOf(window)
      if (index !== -1) {
        this.activeWindows.splice(index, 1)
      }
    },

    zIndexIncrement(windowID) {
      this.zIndex += 1
      const el = document.getElementById(windowID)
      if (el) {
        el.style.zIndex = this.zIndex
      }
    },

    setFullscreenWindowHeight(height) {
      this.fullscreenWindowHeight = height
    },

    setAboutDialogOpen(isOpen) {
      this.aboutDialogOpen = isOpen
    },

    setAppleMenuOpen(isOpen) {
      this.appleMenuOpen = isOpen
    },

    setFileMenuOpen(isOpen) {
      this.fileMenuOpen = isOpen
    },

    setControlCenterOpen(isOpen) {
      this.controlCenterOpen = isOpen
    },

    setFullscreen(payload) {
      const window = this.windows.find(w => w.windowId === payload.windowID)
      if (window) {
        window.fullscreen = payload.fullscreen
      }
    },

    setWindowState(payload) {
      const window = this.windows.find(w => w.windowId === payload.windowID)
      if (!window) return

      const preventAppendingOpenWindow = ['open', 'minimize'].includes(window.windowState)

      if (payload.windowState === 'open') {
        window.windowState = 'open'
        setTimeout(() => this.zIndexIncrement(payload.windowID), 0)
        setTimeout(() => this.setActiveWindow(payload.windowID), 0)
        if (!preventAppendingOpenWindow) {
          setTimeout(() => this.pushActiveWindow(window), 0)
        }
      } else if (payload.windowState === 'close') {
        window.windowState = 'close'
        setTimeout(() => this.popActiveWindow(window), 0)
        setTimeout(() => this.setActiveWindow('nil'), 0)
      } else if (payload.windowState === 'minimize') {
        window.windowState = 'minimize'
        this.setActiveWindow('nil')
      }
    },
  },
})
```

Update `src/store/index.js` to use Pinia (or delete and update imports):

```javascript
// For gradual migration, keep Vuex working
// Then update components one by one to use Pinia
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // Keep existing code during migration
  // Once all components use Pinia, delete this file
})
```

---

## Step 7: Update Components

### `src/App.vue`

```vue
<template>
  <div id="app">
    <top-navbar id="top-navbar"></top-navbar>
    <AboutDialog />
    <div class="screen" id="screen">
      <div v-for="window in windows" :key="window.windowId" :aria-label="window.displayName">
        <component
          :is="window.windowComponent"
          :nameOfWindow="window.windowId"
          :content_padding_bottom="window.windowContentPadding.bottom"
          :content_padding_left="window.windowContentPadding.left"
          :content_padding_right="window.windowContentPadding.right"
          :content_padding_top="window.windowContentPadding.top"
          :id="window.windowId"
          :style="{ position: window.position, left: window.positionX, top: window.positionY }"
          v-if="windowCheck(window.windowId)"
        >
          <component :is="window.windowContent" slot="content"></component>
        </component>
      </div>
      <app-grid></app-grid>
    </div>
    <navbar id="navbar" />
  </div>
</template>

<script>
// Import components
import Window from './components/template/Window'
import AppGrid from './components/AppGrid'
import Placeholder from './components/views/Placeholder'
import Photos from './components/views/Photos'
import OSWindow from './components/template/OSWindow'
import Blueprint from './components/views/Blueprint'
import Windows from './components/views/Windows.vue'
import MacOS from './components/views/MacOS.vue'
import AboutWindow from './components/template/AboutWindow.vue'
import AboutMac from './components/views/AboutMac.vue'
import Navbar from './components/macos/Navbar'
import TopNavbar from './components/macos/TopNavbar.vue'
import AboutDialog from './components/macos/AboutDialog.vue'

// Import Pinia store
import { useWindowStore } from '@/stores/window'

export default {
  name: 'App',
  data() {
    return {
      windows: [],
      windowComponents: {}
    }
  },
  components: {
    Window, Navbar, AppGrid, Placeholder, Photos, OSWindow,
    Blueprint, Windows, MacOS, AboutWindow, AboutMac,
    TopNavbar, AboutDialog
  },
  computed: {
    style() {
      return {
        '--fullscreen': this.$store.getters.getFullscreenWindowHeight
      }
    },
    // Add Pinia computed (after migration)
    // windows() {
    //   return this.$store.windows
    // }
  },
  mounted() {
    const navbar = document.getElementById('navbar')
    const topnavbar = document.getElementById('top-navbar')
    const topNavbarHeight = topnavbar.clientHeight
    const navbarHeight = navbar.clientHeight

    document.getElementById('screen').style.height = window.innerHeight - navbarHeight - topNavbarHeight + 'px'

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    window.addEventListener('resize', () => {
      document.body.style.height = window.innerHeight + 'px'
      document.documentElement.style.height = window.innerHeight + 'px'
    })

    this.$store.commit('setFullscreenWindowHeight', window.innerHeight - navbarHeight - topNavbarHeight + 'px')
  },
  methods: {
    openWindow(windowId) {
      this.$store.commit('setWindowState', {
        windowState: 'open',
        windowID: windowId
      })
    },
    windowCheck(windowId) {
      return this.$store.getters.getWindowById(windowId).windowState === 'open'
    }
  }
}
</script>

<style>
/* Keep existing styles */
</style>
```

---

## Step 8: Update Component Store Access

### Pattern: Accessing State

**Before (Vuex):**
```javascript
this.$store.state.appleMenuOpen
```

**After (Pinia):**
```javascript
const store = useWindowStore()
store.appleMenuOpen
```

### Pattern: Accessing Getters

**Before (Vuex):**
```javascript
this.$store.getters.getActiveWindow
this.$store.getters.getWindowById(windowId)
```

**After (Pinia):**
```javascript
const store = useWindowStore()
store.getActiveWindow
store.getWindowById(windowId)
```

### Pattern: Committing Mutations

**Before (Vuex):**
```javascript
this.$store.commit('setWindowState', payload)
```

**After (Pinia):**
```javascript
const store = useWindowStore()
store.setWindowState(payload)
```

---

## Step 9: Handle `vue-interactjs`

The `vue-interactjs` package may not support Vue 3. Options:

### Option A: Use interact.js directly

```vue
<script setup>
import { ref, onMounted } from 'vue'
import interact from 'interactjs'

const windowEl = ref(null)

onMounted(() => {
  interact(windowEl.value)
    .draggable({
      listeners: {
        move (event) {
          // handle drag
        }
      }
    })
})
</script>

<template>
  <div ref="windowEl" class="window">...</div>
</template>
```

### Option B: Use @vueuse/gesture

```bash
npm install @vueuse/gesture
```

```vue
<script setup>
import { ref } from 'vue'
import { useDrag } from '@vueuse/gesture'

const el = ref(null)
const position = ref({ x: 0, y: 0 })

useDrag(el, (state) => {
  position.value = { x: state.offset[0], y: state.offset[1] }
})
</script>
```

---

## Step 10: Update `vue-moment`

Replace with native Intl or dayjs:

```javascript
// main.js - add global $moment
import moment from 'moment'
app.config.globalProperties.$moment = moment
app.config.globalProperties.moment = moment
```

Or use a composable:

```javascript
// composables/useMoment.js
import moment from 'moment'
export function useMoment() {
  const format = (date, formatStr) => moment(date).format(formatStr)
  return { format }
}
```

---

## Migration Checklist

- [x] Install Vue 3, Pinia, Vite dependencies
- [x] Create `vite.config.js`
- [x] Move `public/index.html` to root, update script tag
- [x] Update `main.js` for Vue 3
- [x] Create Pinia store in `src/stores/`
- [ ] Update `App.vue` (test with Vuex first)
- [ ] Migrate components to Pinia one by one:
  - [x] `App.vue`
  - [x] `components/macos/TopNavbar.vue`
  - [x] `components/macos/Navbar.vue`
  - [x] `components/template/OSWindow.vue`
  - [x] `components/template/Window.vue`
  - [x] `components/template/AboutWindow.vue`
  - [x] `components/AppGrid.vue`
  - [x] Rest of components
- [x] Remove Vuex dependency
- [x] Fix `vue-interactjs` compatibility
- [x] Run `npm run dev` and test
- [x] Run `npm run build` and verify output

---

## Common Issues & Fixes

### Issue: `document is not defined`
**Fix:** Wrap DOM code in `onMounted()` or check for SSR

### Issue: Component props not reactive
**Fix:** Vue 3 uses different prop validation, check prop definitions

### Issue: `this` undefined in methods
**Fix:** In Composition API, `this` isn't available. Use Options API or refactor

### Issue: CSS imports with `~@`
**Fix:** Vite doesn't need `~`, use `@/assets/css/...`

---

## Testing After Migration

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```
