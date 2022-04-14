import { createApp } from 'vue'
import ElementPlus from "element-plus"

import pinia from "@/store"

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
