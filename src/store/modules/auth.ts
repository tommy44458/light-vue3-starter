import { defineStore } from 'pinia'
import piniaInstance from '@/store'
import { useStorage } from 'vue3-storage'
import { useMQTT } from 'mqtt-vue-hook'
import { useTaskStore } from '@/store/modules/task'

const mqttHook = useMQTT()
const taskStore = useTaskStore()
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
                }
            }
        },
        mqttConnect() {
            let mqttHost = window.location.href.split('/')[2]
            const mqttProtocol = process.env.VITE_MQTT_PROTOCOL
            const mqttPort = process.env.VITE_MQTT_PORT
            if (process.env.VITE_MQTT_HOST !== 'localhost' && process.env.VITE_MQTT_HOST != null) {
                mqttHost = process.env.VITE_MQTT_HOST
            }
            if (!mqttHook.isConnected()) {
                mqttHook.registerEvent(
                    'on-connect',
                    () => {
                        mqttHook.subscribe(['tommy44458/vue3/starter/console/register_task'], 1)
                    },
                    'login',
                )

                mqttHook.connect(
                    `${mqttProtocol}://${mqttHost}:${mqttPort}`,
                    {
                        clean: false,
                        keepalive: 60,
                        clientId: `mqtt_client_1_${Math.random().toString(16).substring(2, 10)}`,
                        path: '/mqtt',
                        connectTimeout: 4000,
                    },
                )

                mqttHook.registerEvent(
                    'tommy44458/vue3/starter/console/register_task',
                    (_topic: string, message: string) => {
                        const mesJson = JSON.parse(message.toString())

                        // eslint-disable-next-line prefer-destructuring
                        taskStore.addTask({
                            name: mesJson.name,
                            date: mesJson.date.split('T')[0],
                            desc: mesJson.desc,
                            data: [],
                            checked: mesJson.checked,
                        })

                        ElNotification({
                            title: `register task: ${mesJson.name}`,
                            message: mesJson,
                            type: 'success',
                        })
                    },
                    'login',
                )
            }
            // client-2
            if (!mqttHook.isConnected('mqtt-client-2')) {
                mqttHook.registerEvent(
                    'on-connect',
                    () => {
                        mqttHook.subscribe(['tommy44458/vue3/starter/console/register_task'], 1, null, null, 'mqtt-client-2')
                    },
                    'login',
                    'mqtt-client-2',
                )

                mqttHook.connect(
                    `${mqttProtocol}://${mqttHost}:${mqttPort}`,
                    {
                        clean: false,
                        keepalive: 60,
                        clientId: `mqtt_client_2_${Math.random().toString(16).substring(2, 10)}`,
                        path: '/mqtt',
                        connectTimeout: 4000,
                    },
                    'mqtt-client-2',
                )

                mqttHook.registerEvent(
                    'tommy44458/vue3/starter/console/register_task',
                    (_topic: string, message: string) => {
                        const mesJson = JSON.parse(message.toString())

                        ElNotification({
                            title: `client-2 received: register task: ${mesJson.name}`,
                            message: mesJson,
                            type: 'success',
                        })
                    },
                    'login',
                    'mqtt-client-2',
                )
            }
        },
        mqttDisconnect() {
            if (mqttHook.isConnected()) mqttHook.disconnect()
            if (mqttHook.isConnected('mqtt-client-2')) mqttHook.disconnect('mqtt-client-2')
        },
        logout() {
            storage.setStorageSync('currentAccount', null)
            mqttHook.unRegisterEvent('tommy44458/vue3/starter/console/register_task', 'login')
            mqttHook.unSubscribe('tommy44458/vue3/starter/console/register_task')
            mqttHook.unRegisterEvent('tommy44458/vue3/starter/console/register_task', 'login', 'mqtt-client-2')
            mqttHook.unSubscribe('tommy44458/vue3/starter/console/register_task', null, null, 'mqtt-client-2')
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
