<script>
import interact from "interactjs";
import { useWindowStore } from '@/stores/window'

export default {
    props: {
        'nameOfWindow': String,
    },
    data: function () {
        return {
            ComponentName: this.nameOfWindow,
            Window: {},
            currentTitle: 'System Settings',
            isScrolling: false,

            resizeOption: {
                edges: {
                    top: true,
                    left: true,
                    bottom: true,
                    right: true
                },
                margin: 8,
            },
            dragOption: {
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: "#screen",
                        endOnly: true
                    })
                ],
                allowFrom: '.top-bar',
            },
            // values for interact.js transformation
            x: 0,
            y: 0,
            tempX: 0,
            tempY: 0,
            w: 400,
            h: 400,
        }
    },
    setup() {
        const store = useWindowStore()
        return { store }
    },
    computed: {
        style() {
            return {
                height: `${this.h}px`,
                width: `${this.w}px`,
                transform: `translate(${this.x}px, ${this.y}px)`,
                '--fullscreen': this.store.getFullscreenWindowHeight
            };
        }
    },
    created() {
        this.window = this.store.getWindowById(this.ComponentName)
    },
    methods: {
        activeTab(title) {
            this.currentTitle = title;
        },
        setScrolling(value) {
            this.isScrolling = value;
        },

        closeWindow() {
            const payload = {
                'windowState': 'close',
                'windowID': this.ComponentName
            }
            this.store.setWindowState(payload)
        },

        openWindow() {
            const payload = {
                'windowState': 'open',
                'windowID': this.ComponentName
            }
            this.store.setWindowState(payload)
        },

        minimizeWindow() {
            const payload = {
                'windowState': 'minimize',
                'windowID': this.ComponentName
            }
            this.store.setWindowState(payload)
        },

        toggleWindowSize() {
            if (this.store.getWindowFullscreen(this.ComponentName) == true) {
                const payload = {
                    'fullscreen': false,
                    'windowID': this.ComponentName
                }
                this.store.setFullscreen(payload)
                this.x = this.tempX
                this.y = this.tempY

            } else if (this.store.getWindowFullscreen(this.ComponentName) == false) {
                const payload = {
                    'fullscreen': true,
                    'windowID': this.ComponentName
                }
                this.store.setFullscreen(payload)
                const tempX = this.x
                const tempY = this.y
                this.tempX = tempX
                this.tempY = tempY
                this.x = 0
                this.y = 0
            }
        },

        setActiveWindow() {
            this.store.zIndexIncrement(this.ComponentName)
            this.store.setActiveWindow(this.ComponentName)
        },

        // drag events

        dragmove(event) {
            this.x += event.dx;
            this.y += event.dy;
            this.setActiveWindow()
        },

        resizemove(event) {
            this.w = event.rect.width;
            this.h = event.rect.height;

            this.x += event.deltaRect.left;
            this.y += event.deltaRect.top;
        }
    },
    provide() {
        return {
            activeTab: this.activeTab,
            setScrolling: this.setScrolling
        }
    }
}
</script>


<template>
<interact draggable :dragOption="dragOption" resizable :resizeOption="resizeOption" class="window window-style" :style="style" @dragmove="dragmove" @resizemove="resizemove" @click.native="setActiveWindow" :class="{ fullscreen: store.getWindowFullscreen(this.ComponentName), minimize: store.getWindowById(ComponentName).windowState=='minimize'}">
    <div class="top-bar settings" id="top-bar" @dblclick="toggleWindowSize">
        <div class="sidebar-section">
            <div style="padding: 15px 0px 15px 15px">
                <div class="triple-button">
                    <button class="expand-button" @click="toggleWindowSize"></button>
                    <button class="minimize-button" @click="minimizeWindow"></button>
                    <button class="close-button" @click="closeWindow"></button>
                </div>
            </div>
        </div>
        <div class="content-section" :class="{ 'scrolled': isScrolling }">
            <h3 class="settings-title">{{ currentTitle }}</h3>
        </div>
    </div>
    <div class="content">
        <slot class="window-content" name="content"></slot>
    </div>
</interact>
</template>

<style scoped>
/*-------------------------------------------*\
    Windows/Display
\*-------------------------------------------*/

.minimize {
    display: none;
}

.window {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    min-height: 60vh;
    min-width: 600px;
    max-width: 600px;
    user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    flex-flow: column;
    display: flex;
}

.top-bar.settings {
    background: none;
    border-bottom: none;
}

.top-bar.settings .sidebar-section {
    width: 220px;
    flex-shrink: 0;
    border-right: 1px solid var(--border-color);
    transition: border var(--dark-mode-transition);
}

.top-bar.settings .content-section {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: var(--window-color);
    border-bottom: 1px solid transparent;
    transition:
        border-bottom 0.15s ease,
        background-color var(--dark-mode-transition);
}

.top-bar.settings .content-section.scrolled {
    border-bottom-color: var(--border-color);
    box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.2);
}

.top-bar.settings .settings-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--system-font-2);
}

.fullscreen {
    width: 100% !important;
    height: var(--fullscreen) !important;
    margin: 0;
    transition: all 0.5s ease;
    padding: 0;
}

.content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>