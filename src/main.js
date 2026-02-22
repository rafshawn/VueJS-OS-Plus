import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Interact from './components/Interact.vue'

const app = createApp(App)
const pinia = createPinia()

import moment from 'moment'
app.config.globalProperties.moment = moment
app.config.globalProperties.$moment = moment

app.use(pinia)
app.component('interact', Interact)

app.mount('#app')