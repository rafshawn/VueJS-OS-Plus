<script>
import Wifi from '@iconify-vue/f7/wifi'
import WifiSlash from '@iconify-vue/f7/wifi-slash'
import Bluetooth from '@iconify-vue/lucide/bluetooth'
import AirDrop from '@iconify-vue/f7/dot-radiowaves-left-right'
import DarkMode from '@iconify-vue/gg/dark-mode'
import ChevronRight from '@iconify-vue/f7/chevron-right'
import Rectangle from '@iconify-vue/f7/rectangle'
import RectangleOnRectangle from '@iconify-vue/f7/rectangle-on-rectangle'

export default {
    name: 'ControlCenter',
    components: {
        Wifi,
        WifiSlash,
        Bluetooth,
        AirDrop,
        DarkMode,
        ChevronRight,
        Rectangle,
        RectangleOnRectangle
    },
    props: {
        isOpen: { type: Boolean, required: true },
        positionX: { type: Number, default: 0 },
        positionY: { type: Number, default: 0 }
    },
    data() {
        return {
            menuItems: [
                { label: 'New', action: 'new', shortcut: '⌘N' },
                { label: 'Open', action: 'open', shortcut: '⌘O' },
                { label: 'Save', action: 'save', shortcut: '⌘S' },
                { label: 'Save As...', action: 'saveAs', shortcut: '⇧⌘S' },
                { label: 'Close', action: 'close', shortcut: '⌘W' }
            ]
        }
    },
    methods: {
        handleAction(action) {
            this.$emit('action', action)
        }
    }
}
</script>

<template>
<Teleport to="#app">
<div
    v-if="isOpen"
    class="dropdown-menu"
    :style="{left: positionX + 'px', top: positionY + 'px'}"
>
    <div class="container">
        <div class="panel medium">
            <div class="network">
                <div class="item">
                    <div class="cc-icon">
                        <Wifi class="main-icon"/>
                    </div>
                    <div class="text-box">
                        <div>Wi-Fi</div>
                        <div class="subtext">Off</div>
                    </div>
                    <span><ChevronRight class="chev-r-icon"/></span>
                </div>
                <div class="item">
                    <div class="cc-icon">
                        <Bluetooth class="main-icon"/>
                    </div>
                    <div class="text-box">
                        <div>Bluetooth</div>
                        <div class="subtext">Off</div>
                    </div>
                    <span><ChevronRight class="chev-r-icon"/></span>
                </div>
                <div class="item">
                    <div class="cc-icon">
                        <AirDrop class="main-icon"/>
                    </div>
                    <div class="text-box">
                        <div>AirDrop</div>
                        <div class="subtext">Off</div>
                    </div>
                    <span><ChevronRight class="chev-r-icon"/></span>
                </div>
            </div>
        </div>
        <div class="panel wide">
            <div class="item">
                <div class="cc-icon">
                    <DarkMode class="main-icon"/>
                </div>
                <div class="text">Dark Mode</div>
            </div>
        </div>
        <div class="panel small">
            <div class="stage-manager">
                <div class="box-stack">
                    <div class="box"></div>
                    <div class="box"></div>
                    <div class="box"></div>
                </div>
                <Rectangle class="main-icon" />
            </div>
            <div class="subtext">Stage Manager</div>
        </div>
        <div class="panel small">
            <RectangleOnRectangle class="main-icon" />
            <div class="subtext">Screen Mirroring</div>
        </div>
        <div class="panel full">
            <div class="slider-box">
                Display
                <input
                    type="range"
                    min="0"
                    max="100"
                    value="80"
                    class="slider"
                    id="displayRange"
                >
            </div>
        </div>
        <div class="panel full">
            <div class="slider-box">
                Sound
                <div class="sound">
                    <input
                    type="range"
                    min="1"
                    max="100"
                    value="80"
                    class="slider"
                    id="soundRange"
                    >
                    <div class="cc-icon-slider">
                        <DarkMode class="main-icon"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel full music">
            Music
        </div>
    </div>
</div>
</Teleport>
</template>

<style scoped>
.dropdown-menu {
    background: var(--bg-clear);
    padding: 0;
    min-width: 300px;
    max-width: 300px;
    border: 1px hidden var(--border-light);
    border-radius: 16px;
}

html.dark-mode .dropdown-menu {
    background: var(--bg-clear-dark);
    border: 1px solid var(--border-dark);
}

.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 12px;
    gap: 10px;
}

.panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 1px 14px 14px rgba(0, 0, 0, 0.2);
}

html.dark-mode .panel {
    background-color: transparent;
    /* border: 1px solid rgba(125, 125, 125, 0.5);; */
}

.panel .item {
    display: flex;
    align-items: center;
    width: 100%;
}

.panel.small {
    flex-direction: column;
    padding: 8px 10px;
    gap: 4px;
    text-align: center;
}

.panel.small .main-icon {
    width: 20px;
    height: 20px;
}

.panel.wide {
    grid-column: span 2;
    padding: 16px 10px;
}

.panel.medium {
    grid-column: span 2;
    grid-row: span 2;

}

.panel.medium .network {
    display: flex;
    flex-direction: column;
    margin: 10px;
    gap: 10px;
    width: 100%;
}

.panel.wide {
    grid-column: span 2;
}

.panel.full {
    padding: 8px 10px;
    grid-column: span 4;
}

.text-box {
    flex-grow: 1;
}

.subtext {
    font-size: 11px;
    color: var(--system-font-2);
}

.cc-icon {
    padding: 6px;
    margin-right: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: var(--cc-icon-bg);
    color: var(--cc-icon);
}

.cc-icon-slider {
    padding: 6px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: var(--cc-icon-bg);
    color: var(--cc-icon);
}

html.dark-mode .cc-icon,
html.dark-mode .cc-icon-slider {
    background-color: var(--cc-icon-bg);
}

.main-icon {
    width: 16px;
    height: 16px;
}

.chev-r-icon {
    width: 14px;
    height: 14px;
}

.stage-manager {
    display: flex;
    align-items: center;
    gap: 3px;
}

.box-stack {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.box {
    width: 4px;
    height: 4px;
    background-color: var(--system-font);
}

.slider-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 6px;
}

.slider-box .sound {
    display: flex;
    align-items: center;
    gap: 8px;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 18px;
    border-radius: 18px;
    border: 1px solid var(--grey-btn-border);
    cursor: pointer;
    overflow: hidden;
    background: green;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: white;
    border: 1px solid var(--grey-btn-border);
    border-radius: 50%;
    box-shadow: -300px 0 0 300px red;
}

.slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: blue;
    border: 1px solid var(--grey-btn-border);
    border-radius: 50%;
    /* box-shadow: -300px 0 0 300px red; */
}

.slider::-moz-range-progress {
    height: 18px;
    background: red;
}

</style>
