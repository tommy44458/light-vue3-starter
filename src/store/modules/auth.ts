import { defineStore } from 'pinia'
import piniaInstance from '@/store'
import { useStorage } from 'vue3-storage'
import { useMQTT } from 'mqtt-vue-hook'

const mqttHook = useMQTT()
const storage = useStorage()

interface AuthState {
    fakeAccount: {
        account: string
        password: string
    }
    userLogin: {
        account: string
        password: string
    }
    isRememberMe: boolean
}

export const auth = defineStore('auth', {
    state: (): AuthState => ({
        fakeAccount: {
            account: 'tommy',
            password: 'tommy',
        },
        userLogin: {
            account: '',
            password: '',
        },
        isRememberMe: false,
    }),
    getters: {
    },
    actions: {
        initLoginForm() {
            this.isRememberMe = storage.getStorageSync('remember_me') === true
            if (this.isRememberMe) {
                this.userLogin.account = storage.getStorageSync('account')
            }
        },
        rememberMeOrNot() {
            if (this.isRememberMe) {
                storage.setStorageSync('account', this.userLogin.account)
                storage.setStorageSync('remember_me', true)
            } else {
                storage.setStorageSync('account', '')
                storage.setStorageSync('remember_me', false)
            }
        },
        async login(payload: { account: string, password: string }) {
            if (payload.account === this.fakeAccount.account) {
                if (payload.password === this.fakeAccount.password) {
                    storage.setStorageSync('currentAccount', payload.account)
                    this.mqttConnect()
                }
            }
        },
        mqttConnect() {
            if (!mqttHook.isConnected()) {
                let mqttHost = window.location.href.split('/')[2]
                const mqttProtocol = process.env.VITE_MQTT_PROTOCOL
                const mqttPort = process.env.VITE_MQTT_PORT
                if (process.env.VITE_MQTT_HOST !== 'localhost' && process.env.VITE_MQTT_HOST != null) {
                    mqttHost = process.env.VITE_MQTT_HOST
                }
                mqttHook.connect(`${mqttProtocol}://${mqttHost}:${mqttPort}`, {
                    clean: false,
                    keepalive: 60,
                    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
                    path: '/mqtt',
                    connectTimeout: 4000,
                })
            }
        },
        mqttDisconnect() {
            if (mqttHook.isConnected()) {
                mqttHook.disconnect()
            }
        },
        logout() {
            storage.setStorageSync('currentAccount', null)
            this.mqttDisconnect()
        },
        clearLoginInfo() {
            storage.setStorageSync('account', null)
        },
        getCurrentAccount() {
            const account = storage.getStorageSync('currentAccount')
            if (account != null) this.mqttConnect()
            return account
        },
    },
})

export const useAuthStore = () => auth(piniaInstance)
