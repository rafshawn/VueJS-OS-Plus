<script>
import { useWindowStore } from '@/stores/window'
import moment from 'moment'
import AppleMenuDropdown from './AppleMenuDropdown.vue'
import FileMenuDropdown from './FileMenuDropdown.vue'
import ControlCenter from './ControlCenter.vue'

/* --- Icons --- */
import Apple from "@iconify-vue/f7/logo-apple"
import Switch from "@iconify-vue/line-md/switch-to-switch-off-transition"
import SwitchFilled from "@iconify-vue/line-md/switch-off-filled-to-switch-filled-transition"
import Search from "@iconify-vue/f7/search"
import Wifi from "@iconify-vue/f7/wifi"
import Battery from "@iconify-vue/f7/battery-100"

export default {
    components: {
        AppleMenuDropdown,
        FileMenuDropdown,
        ControlCenter,

        Apple,
        Switch,
        SwitchFilled,
        Search,
        Wifi,
        Battery
    },
    setup() {
        const store = useWindowStore()
        return { store }
    },
    data() {
        return {
            time: '',
            date: '',
            dropdownPositionX: 0,
            dropdownPositionY: 0
        }
    },
    computed: {
        isAppleMenuOpen() {
            return this.store.appleMenuOpen
        },
        isFileMenuOpen() {
            return this.store.fileMenuOpen
        },
        isControlCenterOpen() {
            return this.store.controlCenterOpen
        }
    },
    beforeMount() {
        setInterval(() => {
            this.time = moment().format('h:mm A')
        }, 1000)
        setInterval(() => {
            this.date = moment().format('ddd MMM DD')
        }, 1000)
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        toggleAppleMenu(event) {
            event.stopPropagation()
            const isOpen = this.store.appleMenuOpen
            if (!isOpen) {
                const rect = this.$refs.appleMenu.getBoundingClientRect()
                this.dropdownPositionX = rect.left
                this.dropdownPositionY = rect.bottom + 4
            }
            this.store.setAppleMenuOpen(!isOpen)
            this.closeFileMenu()
        },

        closeAppleMenu() {
            this.store.setAppleMenuOpen(false)
        },

        toggleFileMenu(event) {
            event.stopPropagation()
            const isOpen = this.store.fileMenuOpen
            if (!isOpen) {
                const rect = this.$refs.fileMenu.getBoundingClientRect()
                this.dropdownPositionX = rect.left
                this.dropdownPositionY = rect.bottom + 4
            }
            this.store.setFileMenuOpen(!isOpen)
            this.closeAppleMenu()
        },

        closeFileMenu() {
            this.store.setFileMenuOpen(false)
        },

        toggleControlCenter(event) {
            event.stopPropagation()
            const isOpen = this.store.controlCenterOpen
            if (!isOpen) {
                const rect = this.$refs.controlCenter.getBoundingClientRect()
                this.dropdownPositionX = rect.left - 14
                this.dropdownPositionY = rect.bottom + 4
            }
            this.store.setControlCenterOpen(!isOpen)
            this.closeAppleMenu()
            this.closeFileMenu()
        },

        closeControlCenter() {
            this.store.setControlCenterOpen(false)
        },

        handleClickOutside(event) {
            // Close specific menu if clicked outside
            if (this.$refs.appleMenu && !this.$refs.appleMenu.contains(event.target)) {
                this.closeAppleMenu()
            }
            if (this.$refs.fileMenu && !this.$refs.fileMenu.contains(event.target)) {
                this.closeFileMenu()
            }
            if (this.$refs.controlCenter && !this.$refs.controlCenter.contains(event.target)) {
                this.closeControlCenter()
            }
        },

        handleAppleAction(action) {
            console.log('Apple action:', action)

            // Handle special actions
            if (action === 'about') {
                console.log('Open About Mac')
            } else if (action === 'settings') {
                console.log('Open System Settings')
            } else if (action === 'forceQuit') {
                console.log('Open Force Quit')
            }
            // Add more actions as needed

            this.closeAppleMenu()
        },

        handleFileAction(action) {
            console.log('File action:', action)
            this.closeFileMenu()
        },

        handleControlCenterAction(action) {
            console.log('Control Center action:', action)
            this.closeControlCenter()
        }
    }
}
</script>

<template>
    <div class="top-navbar-container">
        <div class="top-nav-left">
            <div
                class="top-nav-icon apple-icon"
                :class="{ 'active' : isAppleMenuOpen }"
                ref="appleMenu"
                @click="toggleAppleMenu"
            >
                <Apple class="apple"/>
            </div>
            <div class="top-nav-text" style="font-weight: 700;">
                {{
                    this.store.getActiveWindow=='nil' ?
                    'Finder' :
                    this.store.getWindowById(this.store.getActiveWindow).displayName
                }}
            </div>
            <div
                class="top-nav-text hidden-small"
                :class="{ 'active': isFileMenuOpen }"
                ref="fileMenu"
                @click="toggleFileMenu"
            >File</div>
            <div class="top-nav-text hidden-small">Edit</div>
            <div class="top-nav-text hidden-small">View</div>
            <div class="top-nav-text hidden-small">Go</div>
            <div class="top-nav-text hidden-small">Window</div>
            <div class="top-nav-text hidden-small">Help</div>
        </div>
        <div class="top-nav-right">
            <div class="top-nav-icon hidden-small battery-icon">
                <Battery class="battery" />
            </div>
            <div class="top-nav-icon hidden-small wifi-icon">
                <Wifi class="wifi" />
            </div>
            <div class="top-nav-icon hidden-small search-icon">
                <Search class="search" />
            </div>
            <div
                class="top-nav-icon control-center"
                :class="{ 'active' : isControlCenterOpen }"
                ref="controlCenter"
                @click="toggleControlCenter"
            >
                <div class="switch-icon">
                    <Switch class="switch" />
                    <SwitchFilled class="switch-filled" />
                </div>
            </div>
            <div class="top-nav-date-time">
                <div class="date text-right">
                    <time>{{this.date}}</time>
                </div>
                <div class="time text-right">
                    <time>{{this.time}}</time>
                </div>
            </div>

        </div>
        <AppleMenuDropdown
            :is-open="isAppleMenuOpen"
            :position-x="dropdownPositionX"
            :position-y="dropdownPositionY"
            @action="handleAppleAction"
        />
        <file-menu-dropdown
            :is-open="isFileMenuOpen"
            :position-x="dropdownPositionX"
            :position-y="dropdownPositionY"
            @action="handleFileAction"
        />
        <ControlCenter
            :is-open="isControlCenterOpen"
            :position-x="dropdownPositionX"
            :position-y="dropdownPositionY"
            @action="handleControlCenterAction"
        />
    </div>
</template>

<style scoped>
.top-navbar-container {
    width: 100%;
    height: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: var(--navbar-color);
    backdrop-filter: blur(25px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 999;
    transition: background-color var(--dark-mode-transition);
}

.top-nav-left {
    display: flex;
    width: auto;
    margin-left: 15px;
    align-items: center;
}

.top-nav-icon {
    border-radius: 4px;
    cursor: default;
    display: flex;
    align-items: center;
}

.top-nav-icon.apple-icon {
    margin: 0 -4px;
    padding: 5px 12px;
}

.top-nav-icon.control-center {
    margin: 0 -4px;
    padding: 2px 12px;
}

.top-nav-icon.hidden-small.battery-icon,
.top-nav-icon.hidden-small.wifi-icon,
.top-nav-icon.hidden-small.search-icon {
    margin: 0 -1px;
    padding: 0 10px;
}

.top-nav-text {
    font-size: 12px;
    font-weight: 500;
    margin: 0 10px;
    cursor: default;
}

.top-nav-text.active {
    background-color: var(--accent-hover);
    border-radius: 4px;
}

.top-nav-right {
    display: flex;
    width: auto;
    justify-content: space-evenly;
    margin-right: 12px;
    border-radius: 4px;
    cursor: default;
}

.top-nav-date-time {
    display: flex;
    width: auto;
    justify-content: space-evenly;
    margin-right: 12px;
    padding: 4px 4px 4px 8px;
    border-radius: 4px;
    cursor: default;
}

.top-nav-icon:hover,
.top-nav-date-time:hover {
    background-color: rgba(100, 100, 100, .25);
}

.text-right {
    font-size: 12px;
    font-weight: 500;
    margin-left: 3px;
    margin-right: 7px;
}

.apple,
.search {
    width: 16px;
    height: 16px;
    color: var(--system-font);
    margin-top: -2px;
}

.switch,
.switch-filled {
    width: 14px;
    height: 14px;
    color: var(--system-font);
}

.wifi,
.battery {
    width: 18px;
    height: 18px;
    color: var(--system-font);
    margin-top: -2px;
}

.switch-icon {
    display: flex;
    flex-direction: column;
    margin-top: -2px;
}

.switch {
    margin-bottom: -3px;
}

.switch-filled {
    margin-top: -3px;
}

@media only screen and (max-width: 700px) {
    .hidden-small {
        display: none;
    }
    .top-nav-left {
        width: 150px;
        margin-left: 5px;
    }
    .top-nav-right {
        margin-right: 5px;
    }
    .text-right {
        margin-right: 5px;
        margin-left: 5px;
    }
    .top-nav-text {
        margin-right: 5px;
        margin-left: 5px;
    }
    .top-nav-icon.control-center {
        margin: 0;
    }
}
</style>
