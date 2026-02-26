<template>
<div class="dialog-content">
    <div class="mac-logo">
        <span></span>
    </div>
    <div class="system-info">
        <p class="version">macOS</p>
        <p class="version-number">Version 1.0</p>
        <p class="chip">Vue.js Desktop Environment</p>
    </div>
    <div class="system-info">
        <button class="info-button" @click="click">More info</button>
    </div>
    <div class="copyright">
        <p style="margin-bottom: 2px">™ and © 1983-{{ year }} Apple Inc.</p>
        <p>All rights reserved.</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        };
    },
    methods: {
        click() {
            window.open('https://github.com/rafshawn/VueJS-OS-Plus', '_blank', 'noopener,noreferrer')
        }
    }
};
</script>

<style scoped>
.dialog-content {
    padding: 15px 30px 15px 30px;
    text-align: center;
}

.mac-logo {
    font-size: 80px;
    color: var(--system-font-2);
}

.system-info {
    margin-bottom: 20px;
}

.version {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 5px 0;
}

.version-number {
    font-size: 14px;
    color: var(--system-font-3);
    margin: 0 0 8px 0;
}

.chip {
    font-size: 13px;
    color: var(--system-font-3);
    margin: 0;
}

.copyright {
    border-top: 1px solid var(--border-color-2);
    padding-top: 15px;
}

.copyright p {
    font-size: 11px;
    color: var(--system-font-3);
    margin: 0;
}

.info-button {
    background: var(--accent-color);
    color: var(--system-font-white);
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: box-shadow 0.2s;
}

.info-button:hover {
    box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.15);
}

.info-button:active {
    box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.3);
}
</style>
