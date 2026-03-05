# [Vue OS Plus](https://main-preview-site.netlify.app/)

**A Modern, Mobile-Friendly Desktop OS Web Template Built with Vue 3**

> **Note:** This is a fork of the original [vuejs-os-template](https://github.com/DonChiaQE/vuejs-os-template), significantly enhanced with new templates and mobile-friendly optimizations.

| [Blueprint Theme](https://blueprint-template.netlify.app/) | [Windows Theme](https://windows-template.netlify.app/) | [MacOS Theme](https://macos-template.netlify.app/) |
| --------- | --------| ----- |
| <img width="1440" alt="Blueprint Theme" src="https://user-images.githubusercontent.com/24926784/146904065-05513a29-261b-4f35-b952-5bde1599a35d.png"/> | <img width="1440" alt="Windows Theme" src="https://user-images.githubusercontent.com/24926784/147592582-8caa82c1-1d01-400c-b952-5bde1599a35d.png"/> | <img width="1440" alt="MacOS Theme" src="https://user-images.githubusercontent.com/24926784/147636162-cc095413-a099-4b59-baf0-36467fbfee99.png"> |

| Theme | Status | Features |
| --- | --- | --- |
| **macOS** | ✅ **Active Development** | Dock, Menu Bar, Control Center, Spotlight, System Settings, Dark Mode, Wallpaper Customization |
| **Windows** | 🟡 Legacy Support | Classic Windows UI, Start Menu, Taskbar |
| **Blueprint** | 🟡 Legacy Support | Minimalist base theme for customization |

---

## Table of Contents

- [Vue OS Plus](#vue-os-plus)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
    - [Core Features](#core-features)
      - [Functional Features (macOS)](#functional-features-macos)
  - [Dependencies](#dependencies)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Project Structure](#project-structure)
  - [Quick Start Guide](#quick-start-guide)
    - [1. Register a New Window](#1-register-a-new-window)
    - [2. Register a Custom Window](#2-register-a-custom-window)
    - [3. Switching Themes](#3-switching-themes)
      - [macOS Theme (Default)](#macos-theme-default)
      - [Windows Theme](#windows-theme)
      - [Blueprint Theme](#blueprint-theme)
  - [macOS Features Guide](#macos-features-guide)
    - [System Settings](#system-settings)
    - [Wallpaper \& Accent Colours](#wallpaper--accent-colours)
      - [Available Wallpapers](#available-wallpapers)
      - [Setting Wallpaper Programmatically](#setting-wallpaper-programmatically)
      - [Setting Accent Colour](#setting-accent-colour)
  - [Window API Reference](#window-api-reference)
  - [FAQ](#faq)
    - [Can I use this for...?](#can-i-use-this-for)
    - [Where are the CSS stored?](#where-are-the-css-stored)
    - [How do I add custom icons?](#how-do-i-add-custom-icons)
    - [How do I change the default theme?](#how-do-i-change-the-default-theme)
    - [How do I add more wallpapers?](#how-do-i-add-more-wallpapers)
  - [Credits](#credits)
    - [Original Project](#original-project)
    - [Icons \& Assets](#icons--assets)
    - [Fonts](#fonts)
  - [License](#license)
  - [Support \& Contributing](#support--contributing)

---

## Project Overview

VueOS Plus is an OS-style web application template built with **Vue 3**, **Pinia**, and **Vite**. This project features themes for famous OS distributions, classic and modern, as well as a fully customizable template.

---

## Features

| Feature | Description |
|---------|-------------|
| **Vue 3 + Pinia** | Migrated from Vue 2 + Vuex for better performance and DX |
| **Vite Build System** | Lightning-fast HMR and build times |
| **macOS Dock** | Configurable dock with window management |
| **Control Center** | Quick settings for Wi-Fi, Bluetooth, Display, Sound |
| **System Settings** | Full settings panel for wallpapers, accent colours, themes |
| **Dark Mode** | Auto-switching based on system preference or manual toggle |
| **Wallpaper Engine** | 20+ wallpapers with smart light/dark variants |
| **Accent Colours** | 8 customizable accent colours |
| **Mobile Optimized** | Touch-friendly interactions, responsive layout |
| **Spotlight Search** | Quick access search (WIP) |
| **Widget Menu** | Extensible widget system (WIP) |

### Core Features

- **Draggable & Resizable Windows**
- **Window Management**
- **App Grid**
- **Theme System** - Switch between macOS, Windows, or a blank slate
- **UI Customization**
- **Mobile Friendly**

#### Functional Features (macOS)

- 🍎 Apple Menu
  - 🖥️ About This Mac
  - ⚙️ System Settings
    - Custom Wallpapers
- 🎛️ Control Center
- Dark Mode
- Customizable Dock
- 🔍 Spotlight Search (WIP)
- 📱 Widget Menu (WIP)

---

## Dependencies
- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [interactjs](https://interactjs.io/)
- [@vueuse/core](https://vueuse.org/)
- [Moment.js](https://momentjs.com/)

---

## Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm

### Installation

```zsh
# 1. Clone or download the repository
git clone https://github.com/YOUR_USERNAME/vuejs-os-plus.git
cd vuejs-os-plus

# 2. Install dependencies
npm install
# or
pnpm install
# or
yarn install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

### Project Structure

```
vuejs-os-plus/
├── src/
│   ├── assets/
│   │   ├── background/      # Wallpaper images
│   │   ├── css/
│   │   │   ├── macos/       # macOS theme styles
│   │   │   ├── windows/     # Windows theme styles
│   │   │   ├── blueprint/   # Blueprint theme styles
│   │   │   └── utils/       # Global utilities
│   │   ├── fonts/           # Custom fonts
│   │   └── icons/           # Window/app icons
│   ├── components/
│   │   ├── macos/           # macOS-specific components
│   │   ├── windows/         # Windows-specific components
│   │   ├── blueprint/       # Blueprint components
│   │   ├── template/        # Reusable window templates
│   │   └── views/           # Window content views
│   ├── stores/
│   │   ├── window.js        # Window state management
│   │   └── settings.js      # App settings (theme, wallpaper, etc.)
│   ├── App.vue              # Main app component
│   └── main.js              # App entry point
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Quick Start Guide

### 1. Register a New Window
**Step 1:** Edit `src/stores/window.js` and add to the `windows` array:

```javascript
{
  windowId: "MyWindow",
  windowState: "close",
  displayName: "My Window",
  windowComponent: 'window',
  windowContent: 'MyContent',
  windowContentPadding: {
    top: '20px',
    right: '20px',
    bottom: '20px',
    left: '20px'
  },
  position: "absolute",
  positionX: "10vw",
  positionY: "10vh",
  iconImage: "placeholder.png",
  altText: "My Window Icon",
  fullscreen: false
}
```

**Step 2:** Create content component `src/components/views/MyContent.vue`:

```vue
<template>
  <div>
    <h1>Welcome to My Window!</h1>
    <p>This is custom content.</p>
  </div>
</template>

<script>
export default {
  name: 'MyContent'
}
</script>
```

**Step 3:** Register in `src/App.vue`:

```javascript
import MyContent from './components/views/MyContent.vue'

components: {
  // ... other components
  MyContent
}
```

**Step 4:** Add to dock in `src/stores/window.js`:

```javascript
dockWindows: ['LoremIpsum', 'MacOS', 'MyWindow', /* ... */]
```

---

### 2. Register a Custom Window

**Best for:** Windows with custom UI/styling

**Step 1:** Create custom window component `src/components/template/CustomWindow.vue`:

```vue
<script>
import interact from "interactjs"
import { useWindowStore } from '@/stores/window'

export default {
  props: ['nameOfWindow'],
  setup() {
    const store = useWindowStore()
    return { store }
  },
  // ... copy logic from Window.vue and customize
}
</script>

<template>
  <div class="custom-window">
    <div class="custom-title-bar">
      <h3>{{ nameOfWindow }}</h3>
      <button @click="close">✕</button>
    </div>
    <div class="custom-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.custom-window {
  /* Your custom styles */
}
</style>
```

**Step 2:** Register window in `src/stores/window.js`:

```javascript
{
  windowId: "CustomWindow",
  windowState: "close",
  displayName: "Custom Window",
  windowComponent: 'CustomWindow',  // Your custom component
  windowContent: 'MyContent',
  // ... rest of config
}
```

**Step 3:** Import in `src/App.vue`:

```javascript
import CustomWindow from './components/template/CustomWindow.vue'

components: {
  // ... other components
  CustomWindow
}
```

---

### 3. Switching Themes

#### macOS Theme (Default)

```javascript
// src/App.vue - imports
import Navbar from './components/macos/Navbar.vue'
import TopNavbar from './components/macos/TopNavbar.vue'

// CSS imports
@import './assets/css/macos/app.css';
@import './assets/css/macos/window.css';
@import './assets/css/macos/appgrid.css';
@import './assets/css/macos/dropdown.css';
```

#### Windows Theme

```javascript
// src/App.vue - imports
import Navbar from './components/windows/Navbar.vue'

// CSS imports
@import './assets/css/windows/app.css';
@import './assets/css/windows/window.css';
@import './assets/css/windows/appgrid.css';
```

#### Blueprint Theme

```javascript
// src/App.vue - imports
import Navbar from './components/blueprint/Navbar.vue'

// CSS imports
@import './assets/css/blueprint/app.css';
@import './assets/css/blueprint/window.css';
@import './assets/css/blueprint/appgrid.css';
```

---

## macOS Features Guide

### System Settings
- **Wallpaper** - Choose from 20+ backgrounds
- **Dark Mode** - Light, Dark, or Auto
- **UI Customization** - 8 accent colours
- **About** - Customizable information window

---

### Wallpaper & Accent Colours

#### Available Wallpapers

| Collection | Name | Variants |
|------------|------|----------|
| Monterey | Monterey | Light/Dark |
| Big Sur | Big Sur | Light/Dark |
| Ventura | Ventura | Light/Dark |
| Studio | Studio | Single |
| Solid Colours | 15+ colours | Single |

#### Setting Wallpaper Programmatically

```javascript
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
settingsStore.setWallpaper('monterey_light.webp')
```

#### Setting Accent Colour

```javascript
settingsStore.setAccentColour('var(--accent-blue)')
```

**Available Colours:**
- Blue, Purple, Pink, Red, Orange, Yellow, Green, Grey

---

## Window API Reference

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `windowId` | String | Unique identifier | `"MyWindow"` |
| `windowState` | String | Window state | `"open"`, `"close"`, `"minimize"` |
| `displayName` | String | Window title & icon label | `"My App"` |
| `windowComponent` | String | Window container component | `"window"`, `"CustomWindow"` |
| `windowContent` | String | Content component name | `"MyContent"` |
| `windowContentPadding` | Object | Content padding | `{top: '20px', ...}` |
| `position` | String | CSS position | `"absolute"` |
| `positionX` | String | Initial X position | `"10vw"` |
| `positionY` | String | Initial Y position | `"15vh"` |
| `iconImage` | String | Icon filename | `"placeholder.png"` |
| `altText` | String | Icon alt text | `"My Icon"` |
| `fullscreen` | Boolean | Fullscreen state | `false` |

---

## FAQ

### Can I use this for...?

**Yes!** This template is designed to be flexible. Use it for:
- Portfolio websites
- Web app dashboards
- SaaS product demos
- Learning Vue 3
- Personal projects

### Where are the CSS stored?

```
src/assets/css/
├── macos/      # macOS theme
├── windows/    # Windows theme
├── blueprint/  # Blueprint theme
└── utils/      # Global utilities (normalize.css)
```

### How do I add custom icons?

1. Place icon images in `src/assets/icons/macos/` (or theme folder)
2. Reference by filename in window config: `iconImage: "my-icon.png"`
3. Use [Iconify](https://icon-sets.iconify.design/) for icon sets:

```javascript
import DraftsIcon from "@iconify-vue/material-symbols/drafts"

export default {
  components: { DraftsIcon }
}
```

```vue
<DraftsIcon />
```

### How do I change the default theme?

Edit `src/App.vue` CSS imports:

```css
/* Change from macos to windows or blueprint */
@import './assets/css/macos/app.css';
@import './assets/css/macos/window.css';
@import './assets/css/macos/appgrid.css';
```

### How do I add more wallpapers?

Edit `src/stores/settings.js`:

```javascript
wallpaperGroups: [
  {
    id: 'custom',
    name: 'Custom Wallpaper',
    default: 'custom.png'
    // or with variants:
    // light: 'custom-light.png',
    // dark: 'custom-dark.png'
  }
]
```

Add image to `src/assets/background/`.

---

## Credits

### Original Project

- **[DonChiaQE](https://github.com/DonChiaQE)** - Original [vuejs-os-template](https://github.com/DonChiaQE/vuejs-os-template)

### Icons & Assets

- **Iconify** - Universal icon framework ([iconify.design](https://iconify.design/))
  - Icon sets: f7, lucide, gg, line-md, flagpack
- **Tile Icons for macOS** - [oviotti](https://www.deviantart.com/oviotti/art/Tile-Icons-Iconpack-for-macOS-848741448)
- **macOS Traffic Light Buttons** - [atdrago](https://codepen.io/atdrago/pen/yezrBR)

### Fonts

- **Helvetica** - macOS system font
- **W95FA** - Windows 95 font
- **Tahoma** - Windows XP font
- **Selawik** - Windows Vista/7 font
- **DePixel** - Macintosh font
- **Lucida Sans Unicode** - Mac OS X font

---

## License

This project is a fork of the original vuejs-os-template. Please refer to the [LICENSE](LICENSE) file for usage terms.

---

## Support & Contributing

Found a bug or want to contribute a feature?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
