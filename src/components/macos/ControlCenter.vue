<script>
export default {
    name: 'ControlCenter',
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
<!-- <div v-if="isOpen" class="dropdown-menu" :style="{left: positionX + 'px', top: positionY + 'px'}">
    <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="dropdown-item"
        @click="handleAction(item.action)"
    >
        <span class="item-label">{{ item.label }}</span>
        <span class="item-shortcut" v-if="item.shortcut">{{ item.shortcut }}</span>
    </div>
    <div class="dropdown-divider"></div>
</div> -->
<div
    v-if="isOpen"
    class="dropdown-menu"
    :style="{left: positionX + 'px', top: positionY + 'px'}"
>
    <div>

    </div>
</div>
</template>

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
