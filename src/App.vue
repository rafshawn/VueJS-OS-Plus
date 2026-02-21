<template>
<div id="app">
    <top-navbar id="top-navbar"></top-navbar>
    <AboutDialog />
    <div class="screen" id="screen">
        <div
            v-for="window in windows"
            :key="window.key"
            :aria-label="window.displayName"
        >
            <component
                :is="window.windowComponent"
                :nameOfWindow="window.windowId"
                :content_padding_bottom="window.windowContentPadding['bottom']"
                :content_padding_left="window.windowContentPadding['left']"
                :content_padding_right="window.windowContentPadding['right']"
                :content_padding_top="window.windowContentPadding['top']"
                :id="window.windowId"
                :style="{position: window.position, left: window.positionX, top: window.positionY}"
                v-if="windowCheck(window.windowId)"
            >
                <component
                    :is="window.windowContent"
                    slot="content"
                >
                </component>
            </component>
        </div>
        <app-grid></app-grid>
    </div>
    <navbar id="navbar" />
</div>
</template>

<script>
/*------------------------------------------------------------*\
    Import Components, you can change the path for different
    component themes (blueprint, windows, macos)
\*------------------------------------------------------------*/

// --- App imports ---
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

// --- macOS imports ---
import Navbar from './components/macos/Navbar'
import TopNavbar from './components/macos/TopNavbar.vue'
import AboutDialog from './components/macos/AboutDialog.vue'

export default {
    name: 'App',
    data: function () {
        return {
            windows: this.$store.getters.getWindows,
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

        // macOS components
        TopNavbar,
        AboutDialog
    },
    computed: {
        style() {
            return {
                '--fullscreen': this.$store.getters.getFullscreenWindowHeight
            };
        }
    },
    mounted() {
        /*-------------------------------------------------*\
            This fixes height problems for mobile devices

            Code is detecting height of navbar and setting
            respective heights of screen
        \*-------------------------------------------------*/

        let navbar = document.getElementById('navbar')
        let topnavbar = document.getElementById('top-navbar')
        let topNavbarHeight = topnavbar.clientHeight
        let navbarHeight = navbar.clientHeight

        document.getElementById('screen').style.height = window.innerHeight - navbarHeight - topNavbarHeight + "px";

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        function resetHeight() {
            document.body.style.height = window.innerHeight + "px";
            document.html.style.height = window.innerHeight + "px";
        }
        window.addEventListener("resize", resetHeight);
        this.$store.commit('setFullscreenWindowHeight', window.innerHeight - navbarHeight - topNavbarHeight + "px");
    },
    methods: {
        openWindow(windowId) {
            const payload = {
                'windowState': 'open',
                'windowID': windowId
            }
            this.$store.commit('setWindowState', payload)
        },

        windowCheck(windowId) {
            if (this.$store.getters.getWindowById(windowId).windowState == 'open') {
                return true
            }
        },
    },
}
</script>

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
