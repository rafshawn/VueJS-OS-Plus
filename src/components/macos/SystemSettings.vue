<script>
import { useSettingsStore } from "@/stores/settings";
import '../../assets/css/macos/app.css';

export default {
    name: "SystemSettings",
    props: {
        nameOfWindow: String,
    },
    inject: ['activeTab', 'setScrolling'],
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    data() {
        return {
            selectedTab: "profile",
            userProfile: {
                name: "Justin Mac",
                dob: "January 24, 1984",
                email: "justin@apple.com",
                phone: "1 (800) 538-9696",
                avatar: "mac.jpg",
            },
        };
    },
    computed: {
        avatarUrl() {
            return new URL(`/src/assets/${this.userProfile.avatar}`, import.meta.url).href;
        }
    },
    watch: {
        selectedTab(newTab) {
            const titleMap = {
                'profile': this.userProfile.name,
                'appearance': 'Appearance',
                'wallpaper': 'Wallpaper'
            };
            this.activeTab(titleMap[newTab]);
        }
    },
    mounted() {
        this.activeTab(this.userProfile.name);
        this.$refs.contentArea.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        this.$refs.contentArea.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll(event) {
            const isScrolling = event.target.scrollTop > 0;
            if (this.setScrolling) {
                this.setScrolling(isScrolling);
            }
        },
        selectBackground(backgroundPath) {
            this.settingsStore.setBackground(backgroundPath);
        },
        getBackgroundUrl(filename) {
            return new URL(`../../assets/background/${filename}`, import.meta.url).href;
        },
        selectAccent(color) {
            this.settingsStore.setAccentColor(color);
        },

        sendMail() { window.location.href = 'mailto:justin@apple.com' },
        sendText() { window.location.href = 'sms:+18005389696' },
        openGithub() { window.open('https://github.com/', '_blank', 'noopener,noreferrer') },
        openLinkedin() { window.open('https://www.linkedin.com/', '_blank', 'noopener,noreferrer') },
        openX() { window.open('https://x.com/', '_blank', 'noopener,noreferrer') },
        openInstagram() { window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer') },
        openFacebook() { window.open('https://www.facebook.com/', '_blank', 'noopener,noreferrer') },
    },
};
</script>

<template>
    <div class="system-settings">
        <div class="settings-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                <div
                    class="sidebar-header"
                    :class="{ active: selectedTab === 'profile' }"
                    @click="selectedTab = 'profile'"
                >
                    <img :src="avatarUrl" alt="User Avatar" class="user-avatar"/>
                    <div class="sidebar-header-text">
                        <h3>{{ userProfile.name }}</h3>
                        <p class="user-email">{{ userProfile.email }}</p>
                    </div>
                </div>
                <nav class="sidebar-nav">
                    <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'appearance' }"
                        @click="selectedTab = 'appearance'"
                    >
                        <img src="/src/assets/icons/macos/Wallpaper.ico" alt="Wallpaper" class="info-icon"/>
                        <span class="nav-label">Appearance</span>
                    </button>
                    <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'wallpaper' }"
                        @click="selectedTab = 'wallpaper'"
                    >
                        <img src="/src/assets/icons/macos/Wallpaper.ico" alt="Wallpaper" class="info-icon"/>
                        <span class="nav-label">Wallpaper</span>
                    </button>
                </nav>
            </aside>

            <!-- Content Area -->
            <main class="content-area" ref="contentArea">
                <!-- Profile Tab -->
                <div v-if="selectedTab === 'profile'" class="tab-content profile-content">
                    <div class="profile-section">
                        <div class="profile-head">
                            <img :src="avatarUrl" alt="User Avatar" class="user-avatar big" />
                            <span class="profile-name">{{ userProfile.name }}</span>
                            <span class="user-email big">{{ userProfile.email }}</span>
                        </div>

                        <div class="content-box">
                            <div class="info-row">
                                <img src="/src/assets/icons/macos/Contacts.ico" alt="Name" class="info-icon"/>
                                <label>Name</label>
                                <span>{{ userProfile.name }}</span>
                            </div>
                            <div class="info-row">
                                <img src="/src/assets/icons/macos/Calendar.ico" alt="Date of Birth" class="info-icon"/>
                                <label>Date of Birth</label>
                                <span>{{ userProfile.dob }}</span>
                            </div>
                            <div class="info-row link" @click="sendMail">
                                <img src="/src/assets/icons/macos/Mail.ico" alt="Email" class="info-icon"/>
                                <label>Email</label>
                                <span>{{ userProfile.email }}</span>
                            </div>
                            <div class="info-row link" @click="sendText">
                                <img src="/src/assets/icons/macos/iMessage.ico" alt="Phone Number" class="info-icon"/>
                                <label>Phone Number</label>
                                <span>{{ userProfile.phone }}</span>
                            </div>
                        </div>

                        <h3>Socials</h3>
                        <div class="content-box">
                            <div class="info-row link" @click="openGithub">
                                <img src="/src/assets/icons/macos/GitHub.ico" alt="GitHub" class="info-icon"/>
                                <label>GitHub</label>
                            </div>
                            <div class="info-row link" @click="openLinkedin">
                                <img src="/src/assets/icons/macos/Linkedin.ico" alt="Linkedin" class="info-icon"/>
                                <label>Linkedin</label>
                            </div>
                            <div class="info-row link" @click="openX">
                                <img src="/src/assets/icons/macos/X.ico" alt="X" class="info-icon"/>
                                <label>X</label>
                            </div>
                            <div class="info-row link" @click="openInstagram">
                                <img src="/src/assets/icons/macos/Instagram.ico" alt="Instagram" class="info-icon"/>
                                <label>Instagram</label>
                            </div>
                            <div class="info-row link" @click="openFacebook">
                                <img src="/src/assets/icons/macos/Facebook.ico" alt="Facebook" class="info-icon"/>
                                <label>Facebook</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Appearance Tab -->
                <div v-else-if="selectedTab === 'appearance'" class="tab-content">
                    <div class="content-box">
                        <div class="info-row accent">
                            <label>Accent Color</label>
                            <div class="accent-colors">
                                <button
                                    v-for="color in settingsStore.accentColors"
                                    class="accent-color"
                                    @click="selectAccent(color.value)"
                                    :key="color.id"
                                    :class="{ selected: settingsStore.accentColor === color.value }"
                                    :style="{ backgroundColor: color.value }"
                                    :title="color.name"
                                ></button>
                            </div>
                        </div>
                    </div>

                    <div class="wallpaper-section">
                        <h3>Wallpaper</h3>
                        <div class="wallpaper-grid">
                            <div
                                v-for="bg in settingsStore.backgrounds"
                                class="wallpaper-option"
                                @click="selectBackground(bg.path)"
                                :key="bg.id"
                                :class="{
                                    selected: settingsStore.selectedBackground === bg.path,
                                }"
                            >
                                <div class="wallpaper-preview">
                                    <img :src="getBackgroundUrl(bg.path)" :alt="bg.name" />
                                </div>
                                <span class="wallpaper-name">{{ bg.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Wallpaper Tab -->
                <div v-else-if="selectedTab === 'wallpaper'" class="tab-content">
                    <div class="wallpaper-section">
                        <h3>Wallpaper</h3>
                        <div class="wallpaper-grid">
                            <div
                                v-for="bg in settingsStore.backgrounds"
                                class="wallpaper-option"
                                @click="selectBackground(bg.path)"
                                :key="bg.id"
                                :class="{
                                    selected: settingsStore.selectedBackground === bg.path,
                                }"
                            >
                                <div class="wallpaper-preview">
                                    <img :src="getBackgroundUrl(bg.path)" :alt="bg.name" />
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

/* Sidebar Styles */
.sidebar {
    width: 220px;
    background: var(--window-color-transparent);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
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
    color: #86868b;
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
    transition: background 0.15s ease;
    border-radius: 6px;
}

.sidebar-header:hover,
.nav-item:hover {
    background: var(--accent-hover);
}

.sidebar-header.active,
.nav-item.active {
    background: var(--accent-color);
    color: var(--system-font-white);
}

.nav-label {
    font-size: 13px;
}

/* Content Area Styles */
.content-area {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    background: var(--window-color);
}

.tab-content h2 {
    margin: 0 0 24px 0;
    font-size: 22px;
    font-weight: 600;
}

/* Profile Content */
.profile-section {
    display: flex;
    flex-direction: column;
}

.profile-section h3 {
    font-size: 16px;
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
}

.info-icon {
    height: 24px;
    width: 24px;
    margin-right: 6px;
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
    width: 120px;
    font-weight: 500;
    color: #86868b;
    font-size: 14px;
}

.info-row span {
    font-size: 14px;
    margin-left: auto;
}

.info-row.link,
.info-row.link label {
    cursor: pointer;
}

.info-row:hover {
    background: var(--accent-hover);
}

.info-row.accent:hover {
    background: transparent;
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

/* Wallpaper Content */
.wallpaper-section h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #6e6e73;
}

.wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
}

.wallpaper-option {
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid transparent;
    transition: all 0.2s ease;
}

.wallpaper-option:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.wallpaper-option.selected {
    border-color: var(--accent-color);
}

.wallpaper-preview {
    aspect-ratio: 16/10;
    overflow: hidden;
    background: #f5f5f5;
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
    background: #fafafa;
}
</style>
