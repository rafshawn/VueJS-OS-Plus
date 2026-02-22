<script>
import { useWindowStore } from '@/stores/window'

export default {
    name: 'Navbar',
    setup() {
        const store = useWindowStore()
        return { store }
    },
    data: function() {
        return {
            windows: this.store.windows,
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
            return new URL(`../../assets/icons/${imageName}`, import.meta.url).href
        }
    }
}
</script>

<template>
<div class="wrapper">
<nav class="navbar-container">
    <div
        v-for="window in windows"
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
    height: 70px;
    background-color: rgba(255, 255, 255, .15);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgb(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 100;
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
    width: 45px;
    height: 45px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    background: none;
    background: white;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
</style>
