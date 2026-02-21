<template>
<div v-if="isOpen" class="dropdown-menu" :style="{left: positionX + 'px', top: positionY + 'px'}">
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">About This Mac</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">System Settings</span>
    </div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">App Store</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Recent Items</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Force Quit</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Sleep</span>
    </div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Restart</span>
    </div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Shut Down</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Lock Screen</span>
    </div>
    <div class="dropdown-item" @click="openAboutWindow">
        <span class="item-label">Log Out</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'AppleMenuDropdown',
    props: {
        isOpen: { type: Boolean, required: true },
        positionX: { type: Number, default: 0 },
        positionY: { type: Number, default: 0 }
    },
    methods: {
        openAboutWindow() {
            this.$store.commit('setAboutWindowOpen', true)
        }
    }
}
</script>

<style scoped>
.dropdown-menu {
    position: fixed;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1);
    padding: 6px 0;
    min-width: 200px;
    z-index: 3000;
    animation: dropdownFadeIn 0.15s ease-out;
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 14px;
    cursor: pointer;
    font-size: 13px;
    color: #333;
    transition: background 0.1s;
}

.dropdown-item:hover {
    background: rgba(0, 122, 255, 0.1);
}

.dropdown-item:active {
    background: rgba(0, 122, 255, 0.2);
}

.item-label {
    flex-grow: 1;
}

.item-shortcut {
    color: #999;
    font-size: 12px;
    margin-left: 20px;
}

.dropdown-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 6px 0;
}
</style>
