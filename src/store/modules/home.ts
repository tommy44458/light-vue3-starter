import { defineStore } from 'pinia'
import piniaInstance from '@/store'

export const home = defineStore('home', {
    state: () => ({ name: 'this is home store' }),
    actions: {
        updateName(name: string) {
            if (name != null) {
                this.name = 'new name'
            } else {
                this.name = 'new name'
            }
        },
    },
})

export const useHomeStore = () => home(piniaInstance)
