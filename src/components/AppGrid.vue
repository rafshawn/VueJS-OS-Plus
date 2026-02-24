<script>
import { useWindowStore } from '@/stores/window'

export default {
    name: 'AppGrid',
    setup () {
        const store = useWindowStore()
        return { store }
    },
    data: function () {
        return {
            windows: this.store.windows,
            gridHeight: ''
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

        // Uncomment for OS
        getImageUrl(imageName) {
            // return new URL(`../assets/icons/${imageName}`, import.meta.url).href
            return new URL(`../assets/icons/macos/${imageName}`, import.meta.url).href
            // return new URL(`../assets/icons/macintosh/${imageName}`, import.meta.url).href
            // return new URL(`../assets/icons/w95/${imageName}`, import.meta.url).href
            // return new URL(`../assets/icons/wxp/${imageName}`, import.meta.url).href
        }
    },
    mounted() {
        this.gridHeight = 'calc(100vh - 95px)'
    },
}
</script>

<template>
<nav
    class="grid-container"
    :style="{height: gridHeight}"
>
    <li v-for="window in windows" :key="window.windowId">
        <button class="icon" @touchstart="openWindow(window.windowId)" @dblclick="openWindow(window.windowId)">
            <img class="icon-image" :src="getImageUrl(window.iconImage)" :alt="window.altText" />
            <div class="border">
            <p class="icon-text">
                {{window.displayName}}
            </p>
            </div>
        </button>
    </li>
</nav>
</template>

<style scoped>

</style>
