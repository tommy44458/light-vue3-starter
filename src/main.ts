import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'

import '@/assets/scss/index.scss'
import 'virtual:windi.css'

import pinia from '@/store'
import router from '@/router'

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
