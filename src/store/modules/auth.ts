import { defineStore } from 'pinia'
import piniaInstance from '@/store'
import { useStorage } from 'vue3-storage'

interface AuthState {
    fakeAccount: {
        account: string
        password: string
    }
}

export const auth = defineStore('auth', {
    state: (): AuthState => ({
        fakeAccount: {
            account: 'tommy',
            password: 'tommy',
        },
    }),
    getters: {
    },
    actions: {
        async login(payload: { account: string, password: string }) {
            const storage = useStorage()
            if (payload.account === this.fakeAccount.account) {
                if (payload.password === this.fakeAccount.password) {
                    storage.setStorageSync('currentAccount', payload.account)
                }
            }
        },
        logout() {
            const storage = useStorage()
            storage.setStorageSync('currentAccount', null)
        },
        getCurrentAccount: (): string => {
            const storage = useStorage()
            return storage.getStorageSync('currentAccount')
        },
    },
})

export const useAuthStore = () => auth(piniaInstance)
