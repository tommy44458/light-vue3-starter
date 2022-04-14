import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import pinia from '@/store'
import router from '@/router'

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
