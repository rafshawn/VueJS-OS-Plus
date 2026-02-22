<script>
/*------------------------------------------------------------*\
    Import Components, you can change the path for different
    component themes (blueprint, windows, macos)
\*------------------------------------------------------------*/

// Import Pinia store
import { useWindowStore } from '@/stores/window'

// Import components
import Window from './components/template/Window.vue'
import AppGrid from './components/AppGrid.vue'
import Placeholder from './components/views/Placeholder.vue'
import Photos from './components/views/Photos.vue'
import OSWindow from './components/template/OSWindow.vue'
import Blueprint from './components/views/Blueprint.vue'
import Windows from './components/views/Windows.vue'
import MacOS from './components/views/MacOS.vue'
import AboutWindow from './components/template/AboutWindow.vue'
import AboutMac from './components/views/AboutMac.vue'
import Navbar from './components/macos/Navbar.vue'
import TopNavbar from './components/macos/TopNavbar.vue'
import AboutDialog from './components/macos/AboutDialog.vue'

export default {
    name: 'App',
    setup() {
        const store = useWindowStore()
        return { store }
    },
    data() {
        return {
            windowComponents: {}
        }
    },
    components: {
        Window,
        Navbar,
        AppGrid,
        Placeholder,
        Photos,
        OSWindow,
        Blueprint,
        Windows,
        MacOS,
        AboutWindow,
        AboutMac,
        TopNavbar,
        AboutDialog
    },
    computed: {
        windows() {
            return this.store.windows
        },
        style() {
            return {
                '--fullscreen': this.store.getFullscreenWindowHeight
            }
        }
    },
    mounted() {
        /*-------------------------------------------------*\
            This fixes height problems for mobile devices

            Code is detecting height of navbar and setting
            respective heights of screen
        \*-------------------------------------------------*/

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

        this.store.setFullscreenWindowHeight(window.innerHeight - navbarHeight - topNavbarHeight + 'px')
    },
    methods: {
        openWindow(windowId) {
            this.store.setWindowState({
                windowState: 'open',
                windowID: windowId
            })
        },
        windowCheck(windowId) {
            return this.store.getWindowById(windowId).windowState === 'open'
        }
      }
    }
</script>

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

<style>
/*---------------------------------------------------------------------------*\
    CSS Imports
    Change 'blueprint' to 'windows' or 'macos' to use windows or macos theme
\*---------------------------------------------------------------------------*/
@import './assets/css/utils/normalize.css';
@import './assets/css/macos/app.css';
@import './assets/css/macos/window.css';
@import './assets/css/macos/appgrid.css';

@font-face {
    font-family: 'W95FA';
    src: url('~@/assets/fonts/W95FA.otf');
}
@font-face {
    font-family: 'Selawik';
    src: url('~@/assets/fonts/selawk.ttf');
}
@font-face {
    font-family: 'DePixel';
    src: url('~@/assets/fonts/DePixelHalbfett.otf');
}
@font-face {
    font-family: 'Lucida Sans Unicode';
    src: url('~@/assets/fonts/lsansuni.ttf');
}

/*-------------------------------------------*\
    Utilities
\*-------------------------------------------*/

html {
    overflow: hidden;
}

/*
 *   W95FA   <- Windows 95
 *   Tahoma  <- Windows XP
 *   Selawik <- Windows Vista and 7
 *   DePixel <- Macintosh
 *   Lucida Sans Unicode <- Mac OS X
 *   Helvetica <- macOS
 */

#app {
    font-family: 'Helvetica';
    font-weight: 40;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    flex-direction: column;
}

.screen {
    width: 100%;
    position: relative;
    z-index: 998;
}

/*-------------------------------------------*\
    Fullscreen
\*-------------------------------------------*/

.fullscreen {
    left: 0 !important;
    position: relative;
    display: block;
    top: 0 !important;
    right: 0 !important;
}
</style>
