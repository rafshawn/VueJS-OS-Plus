<script>
import { useSettingsStore } from "@/stores/settings";

import Wifi from "@iconify-vue/f7/wifi"
import Bluetooth from "@iconify-vue/lucide/bluetooth"
import RectangleDock from "@iconify-vue/f7/rectangle-dock"
import Headphones from "@iconify-vue/f7/headphones"
import Keyboard from "@iconify-vue/f7/keyboard"
import GameController from "@iconify-vue/f7/gamecontroller-fill"

export default {
    name: "SystemSettings",
    components: {
        Wifi,
        Bluetooth,
        RectangleDock,
        Headphones,
        Keyboard,
        GameController
    },
    props: {
        nameOfWindow: String,
    },
    data() {
        return {
            selectedTab: "profile",
            userInfo: {
                name: "Justin Mac",
                firstName: "Justin",
                dob: "January 24, 1984",
                email: "justin@apple.com",
                phone: "1 (800) 538-9696",
                avatar: "mac.jpg",
            },
            userSocials: {
                email: "mailto:justin@apple.com",
                phone: "sms:+18005389696",
                github: "https://github.com/",
                linkedin: "https://www.linkedin.com/",
                x: "https://x.com/",
                instagram: "https://www.instagram.com/",
                facebook: "https://www.facebook.com/",
                discord: "https://discord.com/",
            },
            btDevices: {
                bt1: "AirPods Max",
                bt2: "Magic Keyboard",
                bt3: "Generic Game Controller",
            },
            wifiEnabled: false,
            ipInfo: null,
            ipLoading: false,
            btEnabled: false,
        };
    },
    inject: ['activeTab', 'setScrolling'],
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    computed: {
        avatarUrl() {
            return new URL(`/src/assets/${this.userInfo.avatar}`, import.meta.url).href;
        }
    },
    watch: {
        selectedTab(newTab) {
            const titleMap = {
                'profile': this.userInfo.name,
                'network': 'Network',
                'appearance': 'Appearance',
            };
            this.activeTab(titleMap[newTab]);
        },
        wifiEnabled(newVal) {
            if (newVal && !this.ipInfo && !this.ipLoading) {
                this.fetchIPInfo();
            }
        }
    },
    mounted() {
        this.activeTab(this.userInfo.name);
        this.$refs.contentArea.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        this.$refs.contentArea.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        sendMail() { window.location.href = `mailto:${this.userSocials.email}`, 'noopener,noreferrer' },
        sendText() { window.location.href = `sms:+${this.userSocials.phone}`, 'noopener,noreferrer' },
        openGithub() { window.open(`${this.userSocials.github}`, '_blank', 'noopener,noreferrer') },
        openLinkedin() { window.open(`${this.userSocials.linkedin}`, '_blank', 'noopener,noreferrer') },
        openX() { window.open(`${this.userSocials.x}`, '_blank', 'noopener,noreferrer') },
        openInstagram() { window.open(`${this.userSocials.instagram}`, '_blank', 'noopener,noreferrer') },
        openFacebook() { window.open(`${this.userSocials.facebook}`, '_blank', 'noopener,noreferrer') },
        openDiscord() { window.open(`${this.userSocials.discord}`, '_blank', 'noopener,noreferrer') },

        handleScroll(event) {
            const isScrolling = event.target.scrollTop > 0;
            if (this.setScrolling) {
                this.setScrolling(isScrolling);
            }
        },
        setTheme(theme) {
            this.settingsStore.setTheme(theme);
        },
        selectWallpaper(backgroundPath) {
            this.settingsStore.setWallpaper(backgroundPath);
        },
        getWallpaperUrl(filename) {
            return new URL(`../../assets/background/${filename}`, import.meta.url).href;
        },
        selectAccent(color) {
            this.settingsStore.setAccentColor(color);
        },

        async fetchIPInfo() {
            this.ipLoading = true;
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                this.ipInfo = {
                    ip: data.ip ? data.ip : "Not Detected",
                    ipv6: data.version === 'IPv6' ? data.ip : "Not Detected",
                    city: data.city ? data.city : "Not Detected",
                    region: data.region ? data.region : "Not Detected",
                    country: data.country_name ? data.country_name : "Not Detected",
                    isp: data.org ? data.org : "Not Detected",
                };
            } catch (error) {
                console.error('Failed to fetch IP info:', error);
                this.ipInfo = { error: 'Unable to fetch IP information' };
            } finally {
                this.ipLoading = false;
            }
        },
    },
};
</script>

<template>
    <div class="system-settings">
        <div class="settings-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                <!-- Sidebar Header -->
                <div
                    class="sidebar-header"
                    :class="{ active: selectedTab === 'profile' }"
                    @click="selectedTab = 'profile'"
                >
                    <img :src="avatarUrl" alt="User Avatar" class="user-avatar"/>
                    <div class="sidebar-header-text">
                        <h3>{{ userInfo.name }}</h3>
                        <p class="user-email">{{ userInfo.email }}</p>
                    </div>
                </div>

                <!-- Sidebar Items -->
                <nav class="sidebar-nav">
                    <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'network' }"
                        @click="selectedTab = 'network'"
                    >
                        <div class="icon-box icon-wifi">
                            <Wifi class="wifi" />
                        </div>
                        <span class="nav-label">Network</span>
                    </button>
                    <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'appearance' }"
                        @click="selectedTab = 'appearance'"
                    >
                        <div class="icon-box icon-appearance">
                            <RectangleDock class="appearance" />
                        </div>
                        <span class="nav-label">Appearance</span>
                    </button>
                </nav>
            </aside>

            <!-- Content Area -->
            <main class="content-area" ref="contentArea">
                <!-- Profile Tab -->
                <div v-if="selectedTab === 'profile'" class="tab-content profile-content">
                    <div class="content-section">
                        <div class="profile-head">
                            <img :src="avatarUrl" alt="User Avatar" class="user-avatar big" />
                            <span class="profile-name">{{ userInfo.name }}</span>
                            <span class="user-email big">{{ userInfo.email }}</span>
                        </div>

                        <div class="content-box">
                            <div class="info-row">
                                <img src="/src/assets/icons/macos/Contacts.png" alt="Name" class="info-icon"/>
                                <label>Name</label>
                                <span>{{ userInfo.name }}</span>
                            </div>
                            <div class="info-row">
                                <img src="/src/assets/icons/macos/Calendar.png" alt="Date of Birth" class="info-icon"/>
                                <label>Date of Birth</label>
                                <span>{{ userInfo.dob }}</span>
                            </div>
                            <div class="info-row link" @click="sendMail">
                                <img src="/src/assets/icons/macos/Mail.png" alt="Email" class="info-icon"/>
                                <label>Email</label>
                                <span>{{ userInfo.email }}</span>
                            </div>
                            <div class="info-row link" @click="sendText">
                                <img src="/src/assets/icons/macos/iMessage.png" alt="Phone Number" class="info-icon"/>
                                <label>Phone Number</label>
                                <span>{{ userInfo.phone }}</span>
                            </div>
                        </div>

                        <h3>Socials</h3>
                        <div class="content-box">
                            <div class="info-row link" @click="openGithub">
                                <img src="/src/assets/icons/macos/GitHub.png" alt="GitHub" class="info-icon"/>
                                <label>GitHub</label>
                            </div>
                            <div class="info-row link" @click="openLinkedin">
                                <img src="/src/assets/icons/macos/Linkedin.png" alt="Linkedin" class="info-icon"/>
                                <label>Linkedin</label>
                            </div>
                            <div class="info-row link" @click="openX">
                                <img src="/src/assets/icons/macos/X.png" alt="X" class="info-icon"/>
                                <label>X</label>
                            </div>
                            <div class="info-row link" @click="openInstagram">
                                <img src="/src/assets/icons/macos/Instagram.png" alt="Instagram" class="info-icon"/>
                                <label>Instagram</label>
                            </div>
                            <div class="info-row link" @click="openFacebook">
                                <img src="/src/assets/icons/macos/Facebook.png" alt="Facebook" class="info-icon"/>
                                <label>Facebook</label>
                            </div>
                            <div class="info-row link" @click="openDiscord">
                                <img src="/src/assets/icons/macos/Discord.png" alt="Discord" class="info-icon"/>
                                <label>Discord</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Network Tab -->
                <div v-else-if="selectedTab === 'network'" class="tab-content">
                    <div class="content-box">
                        <div class="info-row info-box">
                            <div class="icon-box icon-wifi">
                                <Wifi class="wifi big" />
                            </div>
                            <div class="indicator-box">
                                <label>Wi-Fi</label>
                                <div>
                                    <div v-if="wifiEnabled && ipLoading" class="indicator">
                                        <div class="circle yellow"></div>
                                        Not Connected
                                    </div>
                                    <div v-else-if="wifiEnabled && !ipLoading" class="indicator">
                                        <div class="circle green"></div>
                                        Connected
                                    </div>
                                    <div v-else class="indicator">
                                        <div class="circle"></div>
                                        Wi-Fi is off
                                    </div>
                                </div>
                            </div>
                            <span class="switch-span">
                                <label class="switch">
                                    <input type="checkbox" v-model="wifiEnabled" />
                                    <span class="slider"></span>
                                </label>
                            </span>
                        </div>

                        <div v-if="wifiEnabled">
                            <div v-if="ipLoading">
                                <div class="info-row info-box network">
                                    <label>IPv4 Address</label>
                                </div>
                                <div class="info-row info-box network">
                                    <label>IPv6 Address</label>
                                </div>
                                <div class="info-row info-box network">
                                    <label>Location</label>
                                </div>
                                <div class="info-row info-box network">
                                    <label>ISP</label>
                                </div>
                            </div>
                            <div v-else-if="ipInfo">
                                <div class="info-row info-box network">
                                    <label>IPv4 Address</label>
                                    <span>{{ ipInfo.ip }}</span>
                                </div>
                                <div class="info-row info-box network">
                                    <label>IPv6 Address</label>
                                    <span>{{ ipInfo.ipv6 }}</span>
                                </div>
                                <div class="info-row info-box network">
                                    <label>Location</label>
                                    <span v-if="ipInfo.city !== 'Not Detected'">
                                        {{ ipInfo.city }}, {{ ipInfo.region }}, {{ ipInfo.country }}
                                    </span>
                                    <span v-else>
                                        Not Detected
                                    </span>
                                </div>
                                <div class="info-row info-box network">
                                    <label>ISP</label>
                                    <span>{{ ipInfo.isp }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-box" style="margin-top: 10px;">
                        <div class="info-row info-box">
                            <div class="icon-box icon-wifi">
                                <Bluetooth class="wifi big" />
                            </div>
                            <div class="indicator-box">
                                <label>Bluetooth</label>
                                <div>
                                    <div v-if="btEnabled" class="indicator">
                                        <div class="circle green"></div>
                                        Connected
                                    </div>
                                    <div v-else class="indicator">
                                        <div class="circle"></div>
                                        Disconnected
                                    </div>
                                </div>
                            </div>
                            <span class="switch-span">
                                <label class="switch">
                                    <input type="checkbox" v-model="btEnabled" />
                                    <span class="slider"></span>
                                </label>
                            </span>
                        </div>

                        <div v-if="btEnabled">
                            <div>
                                <div class="info-row info-box bt-row">
                                    <div class="icon-box bt">
                                        <Headphones class="bt" />
                                    </div>
                                    <div class="indicator-box">
                                        <label>{{ userInfo.firstName }}'s {{ btDevices.bt1 }}</label>
                                        <div class="indicator">Not Connected</div>
                                    </div>
                                    <span>
                                        <button class="basic">
                                            Connect
                                        </button>
                                    </span>
                                </div>
                                <div class="info-row info-box bt-row">
                                    <div class="icon-box bt">
                                        <Keyboard class="bt" />
                                    </div>
                                    <div class="indicator-box">
                                        <label>{{ btDevices.bt2 }}</label>
                                        <div class="indicator">Not Connected</div>
                                    </div>
                                    <span>
                                        <button class="basic">
                                            Connect
                                        </button>
                                    </span>
                                </div>
                                <div class="info-row info-box bt-row">
                                    <div class="icon-box bt">
                                        <GameController class="bt" />
                                    </div>
                                    <div class="indicator-box">
                                        <label>{{ btDevices.bt3 }}</label>
                                        <div class="indicator">Not Connected</div>
                                    </div>
                                    <span>
                                        <button class="basic">
                                            Connect
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Appearance Tab -->
                <div v-else-if="selectedTab === 'appearance'" class="tab-content">
                    <div class="content-box">
                        <div class="info-row info-box">
                            <label>Appearance</label>
                            <span style="display: flex;">
                                <div
                                    class="dark-mode light"
                                    :class="{ selected: settingsStore.theme === 'light' }"
                                    @click="setTheme('light')"
                                >
                                    <span>Light</span>
                                </div>
                                <div
                                    class="dark-mode dark"
                                    :class="{ selected: settingsStore.theme === 'dark' }"
                                    @click="setTheme('dark')"
                                >
                                    <span>Dark</span>
                                </div>
                                <div
                                    class="dark-mode auto"
                                    :class="{ selected: settingsStore.theme === 'system' }"
                                    @click="setTheme('system')"
                                >
                                    <span>Auto</span>
                                </div>
                            </span>
                        </div>
                        <div class="info-row info-box">
                            <label>Accent Color</label>
                            <span class="accent-colors">
                                <button
                                    v-for="color in settingsStore.accentColors"
                                    class="accent-color"
                                    @click="selectAccent(color.value)"
                                    :key="color.id"
                                    :class="{ selected: settingsStore.accentColor === color.value }"
                                    :style="{ backgroundColor: color.value }"
                                    :title="color.name"
                                ></button>
                            </span>
                        </div>
                    </div>

                    <div class="content-section">
                        <h3>Wallpaper</h3>
                        <div class="wallpaper-grid">
                            <div
                                v-for="bg in settingsStore.displayWallpapers"
                                class="wallpaper-option"
                                @click="selectWallpaper(bg.path)"
                                :key="bg.id"
                                :class="{
                                    selected: settingsStore.selectedBg === bg.path,
                                }"
                            >
                                <div class="wallpaper-preview">
                                    <img :src="getWallpaperUrl(bg.path)" :alt="bg.name" />
                                </div>
                                <span class="wallpaper-name">{{ bg.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.system-settings {
    height: 100%;
}

.settings-container {
    display: flex;
    height: 100%;
}

button.basic {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    border: 1px solid var(--border-color-2);
    border-radius: 6px;
    background-color: var(--basic-btn);
    color: var(--system-font);
}

button.basic:active {
    background-color: #8d8d8d;
}

/* Sidebar Styles */
.sidebar {
    width: 220px;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: border var(--dark-mode-transition);
}

.sidebar-header {
    display: flex;
    gap: 12px;
    margin: 15px 8px;
    padding: 6px 8px;
}

.sidebar-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
}

.sidebar-header.active h3,
.sidebar-header.active .user-email {
    color: var(--system-font-white);
}

.sidebar-header-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

.user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
}

.user-avatar.big {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
}

.user-email {
    margin: 0;
    font-size: 12px;
    color: var(--system-font-3);
}

.user-email.big {
    font-size: 14px;
}

.sidebar-nav {
    padding: 0 8px;
    display: flex;
    flex-direction: column;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 6px;
}

.sidebar-header,
.nav-item {
    transition: background-color 0.15s ease;
    border-radius: 6px;
}

.sidebar-header:hover,
.nav-item:hover {
    background: var(--accent-hover);
}

.sidebar-header.active,
.nav-item.active {
    background: var(--accent-color);
    color: var(--system-font-active);
}

.nav-label {
    font-size: 13px;
    font-weight: 500;
}

.icon-box {
    padding: 2px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.icon-box.icon-wifi {
    background: linear-gradient(0deg,#057df5 0%, #52aeff 100%);
}

.wifi {
    width: 16px;
    height: 16px;
    color: white;
}

.wifi.big {
    width: 20px;
    height: 20px;
}

.icon-box.bt {
    margin-right: 12px;
}

.bt {
    width: 26px;
    height: 26px;
    color: (--system-font);
}

.icon-box.icon-appearance {
    background: linear-gradient(0deg,#0a0a0a 0%, #404040 100%);
}

.appearance {
    width: 16px;
    height: 16px;
    color: white;
}

.indicator-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--system-font-3);
}

.indicator .circle {
    border-radius: 50%;
    padding: 4px;
    background-color: #f54238;
}

.indicator .circle.green {
    background-color: #35d74b;
}

.indicator .circle.yellow {
    background-color: #f7b500;
}

/* Content Area Styles */
.content-area {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    background: var(--window-color);
    transition: background-color var(--dark-mode-transition);
}

.tab-content h2 {
    margin: 0 0 24px 0;
    font-size: 22px;
    font-weight: 600;
}

/* Profile Content */
.content-section {
    display: flex;
    flex-direction: column;
}

.content-section h3 {
    font-size: 15px;
    color: var(--system-font-2);
    margin: 24px 0 10px 8px;
}

.profile-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 18px;
}

.profile-name {
    font-size: 18px;
    font-weight: 600;
}

.content-box {
    border-radius: 6px;
    border: 1px solid var(--border-color);
    transition: border var(--dark-mode-transition);
}

.info-icon {
    height: 20px;
    width: 20px;
    margin-right: 10px;
}

.info-row {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    position: relative;
    transition: background 0.15s ease;
}

.info-row::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    background-color: var(--accent-hover);
    transition: opacity 0.15s ease;
}

.info-row:last-child::after {
    display: none;
}

.info-row:hover::after,
.info-row:has(+ .info-row:hover)::after {
    opacity: 0;
}

.info-row label {
    font-weight: 500;
    color: var(--system-font-3);
    font-size: 14px;
}

.info-row span {
    font-size: 14px;
    margin-left: auto;
    text-align: end;
}

.info-row.link,
.info-row.link label {
    cursor: pointer;
}

.info-row:hover {
    background: var(--accent-hover);
}

.info-row.info-box:hover {
    background: transparent;
}

.info-row.info-box:hover::after,
.info-row.info-box:has(+ .info-row.info-box:hover)::after {
    opacity: 1;
}

.info-row.info-box.network {
    padding-top: 14px;
    padding-bottom: 14px;
}

.info-row.info-box.bt-row {
    padding-top: 14px;
    padding-bottom: 14px;
}

.info-row.info-box.bt-row span {
    opacity: 0;
    transition: opacity 0.01s ease;
}

.info-row.info-box.bt-row:hover span {
    opacity: 1;
}

.info-row.info-box span {
    gap: 8px;
    font-size: 12px;
}

.info-row.info-box label {
    color: var(--system-font);
    font-weight: 400;
}

.info-row.info-box .dark-mode {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    border: 3px solid transparent;
}

.info-row.info-box .dark-mode.selected {
    border-color: var(--accent-color);
}

.info-row.info-box .dark-mode.light {
    color: var(--system-font-black-2);
    background-color: var(--window-color-light-2);
}

.info-row.info-box .dark-mode.dark {
    color: var(--system-font-white);
    background-color: var(--window-color-dark-2);
}

.info-row.info-box .dark-mode.auto {
    color: var(--system-font-2);
    background-color: var(--window-color-2);
    transition: background-color var(--dark-mode-transition);
}

/* Switch */
.switch-span {
    display: flex;
    align-items: center;
}

.switch {
    position: relative;
    display: inline-block;
    width: 38px;
    height: 22px;
}

.switch input {
    opacity: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey);
    transition: 0.3s;
    border: 1px solid var(--border-color);
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 0;
    bottom: 0;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

html.dark-mode .slider {
    background-color: var(--window-color-dark-2);
}

input:checked + .slider {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}

input:checked + .slider:before {
    left: 16px;
}

/* Accent Color Selector */
.accent-colors {
    display: flex;
    gap: 8px;
}

.accent-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
    padding: 0;
    position: relative;
}

.accent-color.selected::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
}

.wallpaper-option {
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 3px hidden var(--window-color-2);
    transition: all 0.2s ease;
}

.wallpaper-option.selected {
    border: 3px solid var(--accent-color);
}

.wallpaper-preview {
    aspect-ratio: 16/10;
    overflow: hidden;
}

.wallpaper-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.wallpaper-name {
    display: block;
    font-size: 13px;
    text-align: center;
    padding: 10px 4px;
    background: var(--window-color-2);
    transition: all 0.2s ease;
}
</style>
