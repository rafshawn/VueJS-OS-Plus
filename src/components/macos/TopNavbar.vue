<template>
    <div class="top-navbar-container">
        <div class="top-nav-left">
            <div class="top-nav-icon" @click="openAboutDialog"></div>
            <div class="top-nav-text bold">
                {{
                    this.$store.getters.getActiveWindow=='nil' ?
                    'Finder' :
                    this.$store.getters.getWindowById(this.$store.getters.getActiveWindow).displayName
                }}
            </div>
            <div 
                class="top-nav-text hidden-small" 
                :class="{ 'active': isFileMenuOpen }"
                ref="fileMenu"
                @click="toggleFileMenu"
            >
                File
            </div>
            <div class="top-nav-text hidden-small">Edit</div>
            <div class="top-nav-text hidden-small">View</div>
            <div class="top-nav-text hidden-small">Go</div>
            <div class="top-nav-text hidden-small">Window</div>
            <div class="top-nav-text hidden-small">Help</div>
        </div>
        <div class="top-nav-right">
            <div class="date text-right">
                <time>{{this.date}}</time>
            </div>
            <div class="time text-right">
                <time>{{this.time}}</time>
            </div>
        </div>
        <file-menu-dropdown 
            :is-open="isFileMenuOpen"
            :position-x="dropdownPositionX"
            :position-y="dropdownPositionY"
            @action="handleFileAction"
        />
    </div>
</template>

<script>
import moment from 'moment'
import FileMenuDropdown from './FileMenuDropdown.vue'

export default {
    components: {
        FileMenuDropdown
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
        isFileMenuOpen() {
            return this.$store.state.fileMenuOpen
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
        openAboutDialog() {
            this.$store.commit('setAboutDialogOpen', true)
        },

        toggleFileMenu(event) {
            event.stopPropagation()
            const isOpen = this.$store.state.fileMenuOpen
            if (!isOpen) {
                const rect = this.$refs.fileMenu.getBoundingClientRect()
                this.dropdownPositionX = rect.left
                this.dropdownPositionY = rect.bottom + 4
            }
            this.$store.commit('setFileMenuOpen', !isOpen)
        },

        closeFileMenu() {
            this.$store.commit('setFileMenuOpen', false)
        },

        handleClickOutside(event) {
            if (this.$refs.fileMenu && !this.$refs.fileMenu.contains(event.target)) {
                this.closeFileMenu()
            }
        },

        handleFileAction(action) {
            console.log('File action:', action)
            this.closeFileMenu()
        }
    }
}
</script>

<style scoped>
.top-navbar-container {
    width: 100%;
    height: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgba(255, 255, 255, .5);
    backdrop-filter: blur(25px);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.top-nav-left {
    display: flex;
    width: auto;
    margin-left: 15px;
    align-items: center;
}

.top-nav-icon {
    margin-right: -5px;
    margin-left: -5px;
    padding: 4px 14px 4px 14px;
    border-radius: 4px;
    cursor: default;
}

.top-nav-text {
    font-size: 14px;
    font-weight: 500;
    margin-left: 10px;
    margin-right: 10px;
    cursor: default;
}

.top-nav-text.active {
    background-color: rgba(100, 100, 100, .25);
    border-radius: 4px;
}

.top-nav-right {
    display: flex;
    width: auto;
    justify-content: space-evenly;
    margin-right: 12px;
    padding: 4px 4px 4px 8px;
    border-radius: 4px;
    cursor: default;
}

.top-nav-icon:hover,
.top-nav-right:hover {
    background-color: rgba(100, 100, 100, .25);
}

.text-right {
    font-size: 14px;
    font-weight: 400;
    margin-left: 3px;
    margin-right: 7px;
}

.bold {
    font-weight: 700;
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
}
</style>
