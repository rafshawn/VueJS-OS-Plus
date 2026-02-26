<script>
export default {
    name: 'FileMenuDropdown',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        positionX: {
            type: Number,
            default: 0
        },
        positionY: {
            type: Number,
            default: 0
        }
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
<div v-if="isOpen" class="dropdown-menu" :style="{left: positionX + 'px', top: positionY + 'px'}">
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
</div>
</template>
