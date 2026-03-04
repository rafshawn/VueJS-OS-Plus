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
            <Rectangle class="main-icon" />
            <div class="subtext">Stage Manager</div>
        </div>
        <div class="panel small">
            <RectangleOnRectangle class="main-icon" />
            <div class="subtext">Screen Mirroring</div>
        </div>
        <div class="panel full">Display</div>
        <div class="panel full">Sound</div>
        <div class="panel full">Music</div>
    </div>
</div>
</template>

<style scoped>
.dropdown-menu {
    padding: 0;
    min-width: 300px;
    border-radius: 16px;
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
    background-color: yellow;
    border-radius: 12px;
    font-size: 30px;
    /* box-shadow: 0 8px 1px rgba(0, 0, 0, 0.2); */
    border: 1px solid
}

.panel .item {
    display: flex;
    align-items: center;
    width: 100%;
}

.panel.small {
    flex-direction: column;
}

.panel.wide {
    grid-column: span 2;
}

.panel.wide .item {
    margin: 10px;
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
    grid-column: span 4;
}

.text-box {
    flex-grow: 1;
}


.subtext {
    font-size: 11px;
    color: var(--system-font-2);
    width: 30%;
}

.item {
    font-size: 12px;
    font-weight: 500;
}

.item .cc-icon {
    padding: 4px;
    margin-right: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid black;
    color: var(--system-font);
}

.main-icon {
    width: 18px;
    height: 18px;
}

.chev-r-icon {
    width: 14px;
    height: 14px;
}

.item-label {
    flex-grow: 1;
}

.item-shortcut {
    color: #999;
    font-size: 12px;
    margin-left: 20px;
}
</style>
