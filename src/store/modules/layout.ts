import { defineStore } from 'pinia'
import piniaInstance from '@/store'
import { useMQTT } from '@/common/mqtt'

const mqtt = useMQTT()

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
        sideMenuDisplayStyle: (state: LayoutState) => (state.sideMenu.isDisplay ? 'inline-block' : 'none'),
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

export const useLayoutStore = () => layout(piniaInstance)

mqtt.registerEvent('#/data_server/system_resource', (topic: string, message: string) => {
    console.log('layout', topic, message.toString())
    const layoutStore = useLayoutStore()
    layoutStore.sideMenu.isCollapse = !layoutStore.sideMenu.isCollapse
})
