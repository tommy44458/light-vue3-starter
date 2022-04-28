import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Vue3Storage from 'vue3-storage'
import 'virtual:svg-icons-register'

import '@/assets/scss/index.scss'
import 'virtual:windi.css'

import pinia from '@/store'
import mqttVueHook from 'mqtt-vue-hook'
import router from './permission'

import App from './App.vue'

const app = createApp(App)

// eslint-disable-next-line no-restricted-globals
let mqttHost = location.href.split('/')[2]
if (process.env.VITE_MQTT_HOST !== 'localhost' && process.env.VITE_MQTT_HOST != null) {
    mqttHost = process.env.VITE_MQTT_HOST
}
app.use(mqttVueHook, {
    protocol: 'ws',
    host: mqttHost,
    port: parseInt(process.env.VITE_MQTT_PORT, 10),
    clean: false,
    keepalive: 60,
    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
    connectTimeout: 4000,
})
app.use(ElementPlus)
app.use(Vue3Storage)
app.use(pinia)
app.use(router)
app.mount('#app')
