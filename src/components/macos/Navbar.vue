<script>
import { useWindowStore } from '@/stores/window'

export default {
    name: 'Navbar',
    setup() {
        const store = useWindowStore()
        return { store }
    },
    computed: {
        dockWindows() {
            return this.store.getDockWindows
        }
    },
    methods: {
        openWindow(windowId) {
            const payload = {
                'windowState': 'open',
                'windowID': windowId
            }
            this.store.setWindowState(payload)
        },
        getImageUrl(imageName) {
            return new URL(`../../assets/icons/macos/${imageName}`, import.meta.url).href
            // return new URL(`../../assets/icons/macintosh/${imageName}`, import.meta.url).href
            // return new URL(`../../assets/icons/w95/${imageName}`, import.meta.url).href
            // return new URL(`../../assets/icons/wxp/${imageName}`, import.meta.url).href
        }
    }
}
</script>

<template>
<div class="wrapper">
<nav class="navbar-container">
    <div
        v-for="window in dockWindows"
        :key="window.windowId"
    >
        <button
            @click="openWindow(window.windowId)"
            class="navbar-item"
            :style="{backgroundImage: 'url(' + getImageUrl(window.iconImage) + ')'}"
            :alt="window.altText"
        >
        </button>
    </div>
</nav>
</div>
</template>

<style scoped>
/*-------------------------------------------*\
    Container
\*-------------------------------------------*/

.navbar-container {
    width: auto;
    max-width: 90vw;
    height: 80px;
    background-color: rgba(255, 255, 255, .15);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgb(255, 255, 255, 0.2);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 100;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    padding: 0 4px;
    box-sizing: border-box;
}

.navbar-container::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
}

.wrapper {
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
}

/*-------------------------------------------*\
    Icons
\*-------------------------------------------*/

.navbar-item {
    width: 55px;
    height: 55px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    background-size: cover;
}

.navbar-item:hover {
    cursor: pointer;
}

/*-------------------------------------------*\
    Utilities
\*-------------------------------------------*/

.label {
    font-weight: bold;
    color: white;
    text-align: center;
    padding-right: 10px;
}

/*-------------------------------------------*\
    CSS Normalisation
\*-------------------------------------------*/

button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    outline: inherit;
}

/*-------------------------------------------*\
    Responsive: Mobile
\*-------------------------------------------*/

@media (max-width: 768px) {
    .navbar-container {
        max-width: 95vw;
        height: 60px;
    }

    .navbar-item {
        width: 40px;
        height: 40px;
        margin: 0 6px;
    }
}

@media (max-width: 480px) {
    .navbar-container {
        max-width: 95vw;
        height: 80px;
    }

    .navbar-item {
        width: 55px;
        height: 55px;
        margin: 0 8px;
    }
}
</style>
