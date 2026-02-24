<script>
import { useSettingsStore } from "@/stores/settings";
import '../../assets/css/macos/app.css';

export default {
    name: "SystemSettings",
    props: {
        nameOfWindow: String,
    },
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    data() {
        return {
            selectedTab: "wallpaper", // 'profile' or 'wallpaper'
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
    methods: {
        selectBackground(backgroundPath) {
            this.settingsStore.setBackground(backgroundPath);
        },
        // Helper to get background image URL
        getBackgroundUrl(filename) {
            return new URL(`../../assets/background/${filename}`, import.meta.url)
                .href;
        },
    },
};
</script>

<template>
    <div class="system-settings" :style="style">
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
                    <!-- <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'profile' }"
                        @click="selectedTab = 'profile'"
                    >
                        <span class="nav-icon">👤</span>
                        <span class="nav-label">Profile</span>
                    </button> -->
                    <button
                        class="nav-item"
                        :class="{ active: selectedTab === 'wallpaper' }"
                        @click="selectedTab = 'wallpaper'"
                    >
                        <span class="nav-icon">🖼️</span>
                        <span class="nav-label">Wallpaper</span>
                    </button>
                </nav>
            </aside>

            <!-- Content Area -->
            <main class="content-area">
                <!-- Profile Tab -->
                <div v-if="selectedTab === 'profile'" class="tab-content profile-content">
                    <div class="profile-section">
                        <div class="profile-head">
                            <img :src="avatarUrl" alt="User Avatar" class="user-avatar big" />
                            <span class="profile-name">{{ userProfile.name }}</span>
                            <span class="user-email">{{ userProfile.email }}</span>
                        </div>

                        <div class="profile-info">
                            <div class="info-row">
                                <label>Name</label>
                                <span>{{ userProfile.name }}</span>
                            </div>
                            <div class="info-row">
                                <label>Date of Birth</label>
                                <span>{{ userProfile.dob }}</span>
                            </div>
                            <div class="info-row">
                                <label>Email</label>
                                <span>{{ userProfile.email }}</span>
                            </div>
                            <div class="info-row">
                                <label>Phone Number</label>
                                <span>{{ userProfile.phone }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Wallpaper Tab -->
                <div v-else-if="selectedTab === 'wallpaper'" class="tab-content wallpaper-content">
                    <h2>Desktop & Dock</h2>

                    <div class="wallpaper-section">
                        <h3>Wallpaper</h3>
                        <div class="wallpaper-grid">
                            <div v-for="bg in settingsStore.backgrounds" :key="bg.id" class="wallpaper-option" :class="{
                                selected: settingsStore.selectedBackgroundId === bg.id,
                            }" @click="selectBackground(bg.path)">
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
    padding: 0;
    height: 100%;
    overflow: hidden;
}

.settings-container {
    display: flex;
    height: 100%;
}

/* Sidebar Styles */
.sidebar {
    width: 220px;
    background: #f5f5f7;
    border-right: 1px solid #d0d0d5;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
}

.sidebar-header {
    display: flex;
    gap: 12px;
    margin: 15px 12px 15px 12px;
    padding: 5px 8px 5px 8px;
    border-radius: 6px;
}

.sidebar-header h3 {
    margin: 1px 0 0 0;
    font-size: 16px;
    font-weight: 500;
}

.sidebar-header.active {
    background: var(--accent-blue);
}

.sidebar-header.active h3 {
    color: var(--system-font-white);
}

.sidebar-header.active .user-email {
    color: var(--system-font-white-2);
}

.sidebar-header-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

.user-avatar {
    width: 40px;
    height: 40px;
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
    font-size: 13px;
    color: #86868b;
}

.sidebar-nav {
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    transition: background 0.15s ease;
}

.nav-item:hover {
    background: rgba(0, 0, 0, 0.05);
}

.nav-item.active {
    background: var(--accent-blue);
    color: var(--system-font-white);
}

.nav-icon {
    font-size: 18px;
}

.nav-label {
    font-weight: 500;
}

/* Content Area Styles */
.content-area {
    flex-grow: 1;
    overflow-y: auto;
    padding: 30px;
    background: #fff;
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
    gap: 30px;
}

.profile-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.profile-name {
    font-size: 18px;
    font-weight: 600;
}

.profile-info {
    flex-grow: 1;
    background: red;
    border-radius: 6px;
}

.info-row {
    display: flex;
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.info-row:last-child {
    border-bottom: none;
}

.info-row label {
    width: 120px;
    font-weight: 500;
    color: #86868b;
    font-size: 14px;
}

.info-row span {
    font-size: 14px;
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
    border-color: #007aff;
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
