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
    padding: 30px;
    text-align: center;
}

.mac-logo {
    font-size: 80px;
    color: #555;
}

.system-info {
    margin-bottom: 20px;
}

.version {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
}

.version-number {
    font-size: 14px;
    color: #666;
    margin: 0 0 8px 0;
}

.chip {
    font-size: 13px;
    color: #888;
    margin: 0;
}

.copyright {
    border-top: 1px solid #d0d0d5;
    padding-top: 15px;
}

.copyright p {
    font-size: 11px;
    color: #999;
    margin: 0;
}

.dialog-footer {
    background: #f0f0f5;
    padding: 15px;
    text-align: center;
    border-top: 1px solid #d0d0d5;
}

.info-button {
    background: #007aff;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.info-button:hover {
    background: #0056b3;
}

.info-button:active {
    background: #004080;
}
</style>
