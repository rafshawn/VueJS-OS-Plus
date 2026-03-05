# [VueJS OS Plus](https://main-preview-site.netlify.app/)

**A Modern, Mobile-Friendly Desktop OS Web Template Built with Vue 3**

> **Note:** This is a fork of the original [vuejs-os-template](https://github.com/DonChiaQE/vuejs-os-template), significantly enhanced with new features, macOS-focused improvements, and mobile-friendly optimizations. Perfect for beginners looking to create custom OS-style web interfaces!

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

- [VueJS OS Plus](#vuejs-os-plus)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [✨ What's New in This Fork](#-whats-new-in-this-fork)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Setup Instructions](#setup-instructions)
  - [Quick Start Guide](#quick-start-guide)
    - [1. Register a New Window (Slots Method)](#1-register-a-new-window-slots-method)
    - [2. Register a Custom Window](#2-register-a-custom-window)
    - [3. Switching Themes](#3-switching-themes)
  - [macOS Features Guide](#macos-features-guide)
    - [Dock Configuration](#dock-configuration)
    - [Menu Bar](#menu-bar)
    - [Control Center](#control-center)
    - [System Settings](#system-settings)
    - [Wallpaper & Accent Colors](#wallpaper--accent-colors)
  - [Window API Reference](#window-api-reference)
  - [Mobile-Friendly Features](#mobile-friendly-features)
  - [FAQ](#faq)
  - [Credits](#credits)

---

## Project Overview

VueJS OS Plus is an enhanced, production-ready OS-style web application template built with **Vue 3**, **Pinia**, and **Vite**. This fork focuses on:

- 🍎 **macOS-first experience** with authentic UI/UX
- 📱 **Mobile-friendly** optimizations and touch support
- 🎨 **Easy customization** for beginners
- ⚡ **Modern tech stack** (Vue 3 + Vite + Pinia)
- 🌙 **Dark mode** with system theme detection
- 🖼️ **Wallpaper customization** with light/dark variants

Perfect for portfolios, dashboards, web apps, or learning Vue 3!

---

## ✨ What's New in This Fork

### Major Enhancements

| Feature | Description |
|---------|-------------|
| **Vue 3 + Pinia** | Migrated from Vue 2 + Vuex for better performance and DX |
| **Vite Build System** | Lightning-fast HMR and build times |
| **macOS Dock** | Configurable dock with window management |
| **Control Center** | Quick settings for Wi-Fi, Bluetooth, Display, Sound |
| **System Settings** | Full settings panel for wallpapers, accent colors, themes |
| **Dark Mode** | Auto-switching based on system preference or manual toggle |
| **Wallpaper Engine** | 20+ wallpapers with smart light/dark variants |
| **Accent Colors** | 8 customizable accent colors |
| **Mobile Optimized** | Touch-friendly interactions, responsive layout |
| **Spotlight Search** | Quick access search (WIP) |
| **Widget Menu** | Extensible widget system (WIP) |

---

## Features

### Core Features

- ✅ **Draggable & Resizable Windows**
- ✅ **Window Management**
- ✅ **App Grid**
- ✅ **Theme System** - Switch between macOS, Windows, Blueprint
- ✅ **Dark Mode** - System-aware with manual override
- ✅ **Wallpaper Engine** - Multiple wallpapers with variants
- ✅ **UI Customization**
- ✅ **Mobile Friendly**

### Functional Features (macOS)

- 🍎 Apple Menu
  - 🖥️ About This Mac
  - ⚙️ System Settings
- 🎛️ Control Center
- 🔍 Spotlight Search (WIP)
- 📱 Widget Menu (WIP)

---

## Technologies

```json
{
  "framework": "Vue 3.5+",
  "state": "Pinia 3+",
  "build": "Vite 7+",
  "dragResize": "interactjs 1.10+",
  "utilities": "@vueuse/core",
  "datetime": "moment.js",
  "icons": "Iconify (multiple sets)"
}
```

**Full Dependencies:**
- Vue 3
- Pinia
- Vite
- interactjs
- @vueuse/core
- moment
- Iconify

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

### 1. Register a New Window (Slots Method)

**Best for:** Simple windows using default styling

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

### Dock Configuration

The dock displays windows from the `dockWindows` array in the window store:

```javascript
// src/stores/window.js
dockWindows: [
  'LoremIpsum',
  'MacOS',
  'Windows',
  'Blueprint',
  'PhotoWindow',
  'AboutMac',
  'SystemSettings'
]
```

**Features:**
- Active app indicator (dot below open apps)
- Click to open/focus window
- Horizontal scroll for many apps
- Hide/show animations

---

### Menu Bar

Located at the top of the screen with:

- **Apple Menu** - System actions (About, Settings, Sleep, Restart, Shut Down, Lock, Log Out)
- **File Menu** - Contextual file actions (New, Open, Save, Close)
- **Status Icons** - Wi-Fi, Control Center, Spotlight

---

### Control Center

Access via top-right icon. Includes:

- **Network** - Wi-Fi, Bluetooth, AirDrop toggles
- **Display** - Brightness slider
- **Sound** - Volume slider
- **Dark Mode** - Toggle dark theme
- **Stage Manager** - Window management (WIP)
- **Screen Mirroring** - External displays (WIP)

---

### System Settings

Full settings window accessible from Apple Menu or Dock:

- **Wallpaper** - Choose from 20+ backgrounds
- **Appearance** - Light, Dark, or System theme
- **Accent Color** - 8 color options
- **About** - System information

---

### Wallpaper & Accent Colors

#### Available Wallpapers

| Collection | Name | Variants |
|------------|------|----------|
| Monterey | Monterey | Light/Dark |
| Big Sur | Big Sur | Light/Dark |
| Ventura | Ventura | Light/Dark |
| Studio | Studio | Single |
| Solid Colors | 15+ colors | Single |

#### Setting Wallpaper Programmatically

```javascript
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
settingsStore.setWallpaper('monterey_light.webp')
```

#### Setting Accent Color

```javascript
settingsStore.setAccentColor('var(--accent-blue)')
```

**Available Colors:**
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

## Mobile-Friendly Features

VueJS OS Plus includes several mobile optimizations:

### Touch Support

- ✅ Touch-friendly dock icons (55px × 55px minimum)
- ✅ Touch drag for windows
- ✅ Touch-optimized sliders in Control Center
- ✅ Responsive navbar with horizontal scroll
- ✅ Responsive Design
- ✅ Overflow handling for small screens

### CSS Optimizations

```css
/* Dynamic viewport height for mobile browsers */
#app {
  height: calc(var(--vh, 1vh) * 100);
}

/* Dock scroll handling */
.navbar-container {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.navbar-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

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

### Libraries & Frameworks

- **Vue.js** - [vuejs.org](https://vuejs.org/)
- **Pinia** - [pinia.vuejs.org](https://pinia.vuejs.org/)
- **Vite** - [vitejs.dev](https://vitejs.dev/)
- **interactjs** - [interactjs.io](https://interactjs.io/)
- **@vueuse/core** - [vueuse.org](https://vueuse.org/)
- **Moment.js** - [momentjs.com](https://momentjs.com/)

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
