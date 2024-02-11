import { createApp } from 'vue'
import Vue3Storage from 'vue3-storage'
import 'virtual:svg-icons-register'

import pinia from '@/store'
import router from './permission'

import App from './App.vue'

import './index.css'
import '@/styles/stylus/index.stylus'
import '@/styles/scss/index.scss'

const app = createApp(App)

app.use(Vue3Storage, {})
app.use(pinia)
app.use(router)
app.mount('#app')
