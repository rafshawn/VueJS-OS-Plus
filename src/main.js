import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Interact from './components/Interact.vue'
import { useSettingsStore } from './stores/settings'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const settingsStore = useSettingsStore()
settingsStore.loadTheme()
settingsStore.setupSystemThemeListener()
settingsStore.loadBackground()
settingsStore.loadAccentColor()

app.component('interact', Interact)

import moment from 'moment'
app.config.globalProperties.moment = moment
app.config.globalProperties.$moment = moment

app.mount('#app')
