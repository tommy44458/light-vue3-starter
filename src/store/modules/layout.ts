import { defineStore } from 'pinia'
import piniaInstance from '@/store'

// console.log(SCREENS)
// const screens = windiConfig.theme.extend.screens
interface LayoutState {
    screens: {
        sm: number,
        md: number,
        lg: number,
        xl: number,
    }
    currentWidth: number
    sideMenu: {
        isCollapse: boolean
        isDisplay: boolean
    }
}

export const layout = defineStore('layout', {
    state: (): LayoutState => ({
        screens: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
        currentWidth: 1600,
        sideMenu: {
            isCollapse: true,
            isDisplay: true,
        },
    }),
    getters: {
        sideMenuDisplayStyle: (state: LayoutState) => (state.sideMenu.isDisplay ? 'block' : 'none'),
    },
    actions: {
        windowResize(payload: { size: number }) {
            this.currentWidth = payload.size
            if (this.currentWidth < this.screens.sm) {
                this.sideMenu.isDisplay = false
            } else if (this.currentWidth < this.screens.xl) {
                this.sideMenu.isCollapse = true
                this.sideMenu.isDisplay = true
            } else {
                this.sideMenu.isCollapse = false
                this.sideMenu.isDisplay = true
            }
        },
        clickSideMenuIcon() {
            if (this.currentWidth < this.screens.xl) {
                this.sideMenu.isCollapse = true
                this.sideMenu.isDisplay = !this.sideMenu.isDisplay
            } else {
                this.sideMenu.isCollapse = !this.sideMenu.isCollapse
            }
        },
    },
})

export const uselayoutStore = () => layout(piniaInstance)
