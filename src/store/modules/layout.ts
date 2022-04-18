import { defineStore } from 'pinia'
import piniaInstance from '@/store'

interface LayoutState {
    rwd: {
        pad: number
        phone: number
    }
    currentWidth: number
    sideMenu: {
        isCollapse: boolean
        isDisplay: boolean
        width: number
    }
}

export const layout = defineStore('layout', {
    state: (): LayoutState => ({
        rwd: {
            pad: 1024,
            phone: 640,
        },
        currentWidth: 1600,
        sideMenu: {
            isCollapse: false,
            isDisplay: true,
            width: 160,
        },
    }),
    getters: {
        sideMenuDisplayStyle: (state: LayoutState) => {
            if (state.sideMenu.isDisplay) {
                return 'block'
            }
            return 'none'
        },
        sideMenuWidthStyle: (state: LayoutState) => `${state.sideMenu.width}px`,
    },
    actions: {
        windowResize(payload: { size: number }) {
            this.currentWidth = payload.size
            if (this.currentWidth < this.rwd.phone) {
                this.sideMenu.isDisplay = false
                this.sideMenu.width = 64
            } else if (this.currentWidth < this.rwd.pad) {
                this.sideMenu.isCollapse = true
                this.sideMenu.isDisplay = true
                this.sideMenu.width = 64
            } else {
                this.sideMenu.isCollapse = false
                this.sideMenu.isDisplay = true
                this.sideMenu.width = 160
            }
        },
        clickSideMenuIcon() {
            if (this.currentWidth < this.rwd.pad) {
                this.sideMenu.isDisplay = !this.sideMenu.isDisplay
                this.sideMenu.isCollapse = true
            } else {
                this.sideMenu.isCollapse = !this.sideMenu.isCollapse
            }
        },
    },
})

export const uselayoutStore = () => layout(piniaInstance)
