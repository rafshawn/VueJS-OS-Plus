<script>
import { useWindowStore } from '@/stores/window'

export default {
    name: 'AppleMenuDropdown',
    setup() {
        const store = useWindowStore()
        return { store }
    },
    props: {
        isOpen: { type: Boolean, required: true },
        positionX: { type: Number, default: 0 },
        positionY: { type: Number, default: 0 }
    },
    methods: {
        openAboutDialog() {
            this.store.setAboutDialogOpen(true)
        },
        openSystemSettings() {
            this.store.setWindowState({
                windowState: 'open',
                windowID: 'SystemSettings'
            })
        }
    }
}
</script>

<template>
<Teleport to="#app">
<Transition name="dropdown">
<div v-if="isOpen" class="dropdown-menu" :style="{left: positionX + 'px', top: positionY + 'px'}">
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">About This Mac</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openSystemSettings">
        <span class="item-label">System Settings</span>
    </div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">App Store...</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Recent Items</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Force Quit</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Sleep</span>
    </div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Restart...</span>
    </div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Shut Down</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Lock Screen</span>
    </div>
    <div class="dropdown-item" @click="openAboutDialog">
        <span class="item-label">Log Out</span>
    </div>
</div>
</Transition>
</Teleport>
</template>