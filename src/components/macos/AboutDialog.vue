<script>
import { useWindowStore } from '@/stores/window'

export default {
    name: 'AboutDialog',
    setup() {
        const store = useWindowStore()
        return { store }
    },
    computed: {
        isOpen() {
            return this.store.aboutDialogOpen
        }
    },
    methods: {
        closeDialog() {
            this.store.setAboutDialogOpen(false)
        }
    }
}
</script>

<template>
<div v-if="isOpen" class="dialog-overlay" @click.self="closeDialog">
    <div class="dialog-container">
        <div class="dialog-header">
            <h2>About This Mac</h2>
        </div>
        <div class="dialog-content">
            <div class="mac-logo">
                <span></span>
            </div>
            <div class="system-info">
                <p class="version">macOS</p>
                <p class="version-number">Version 1.0</p>
                <p class="chip">Vue.js Desktop Environment</p>
            </div>
            <div class="copyright">
                <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="close-btn" @click="closeDialog">Close</button>
        </div>
    </div>
</div>
</template>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(2px);
}

.dialog-container {
    background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    min-width: 400px;
    max-width: 500px;
    overflow: hidden;
    animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dialog-header {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f5 100%);
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #d0d0d5;
}

.dialog-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

.dialog-content {
    padding: 30px;
    text-align: center;
}

.mac-logo {
    font-size: 80px;
    color: #555;
    margin-bottom: 15px;
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

.close-btn {
    background: #007aff;
    color: white;
    border: none;
    padding: 8px 30px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.close-btn:hover {
    background: #0056b3;
}

.close-btn:active {
    background: #004080;
}
</style>
