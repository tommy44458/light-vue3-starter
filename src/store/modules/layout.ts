import { defineStore } from 'pinia'
import piniaInstance from '@/store'
import { Ref } from '@vue/runtime-core'

interface LayoutState {
    screens: {
        sm: number,
        md: number,
        lg: number,
        xl: number,
    },
    homeTabHeight: number
    currentWidth: number,
    currentHeight: number,
    sideMenu: {
        isCollapse: boolean
        isDisplay: boolean
    },
    routerRef: Ref,
    routesRef: Ref,
    isRouteChanging: boolean,
}

export const layout = defineStore('layout', {
    state: (): LayoutState => ({
        screens: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
        homeTabHeight: 36,
        currentWidth: 1600,
        currentHeight: 1000,
        sideMenu: {
            isCollapse: true,
            isDisplay: true,
        },
        routerRef: null,
        routesRef: null,
        isRouteChanging: false,
    }),
    getters: {
        sideMenuDisplayStyle: (state: LayoutState) => (state.sideMenu.isDisplay ? 'inline-block' : 'none'),
        isMobile: (state: LayoutState) => (state.currentWidth <= state.screens.md),
        isPad(): boolean {
            return (!this.isMobile && this.currentWidth <= this.screens.xl)
        },
        isPC(): boolean {
            return (!this.isMobile && !this.isPad)
        },
    },
    actions: {
        windowResize(payload: { width: number, height: number }) {
            this.currentWidth = payload.width
            this.currentHeight = payload.height
            if (this.isMobile) {
                this.sideMenu.isDisplay = false
            } else if (this.isPad) {
                this.sideMenu.isCollapse = true
                this.sideMenu.isDisplay = true
            } else if (this.isPC) {
                this.sideMenu.isCollapse = true
                this.sideMenu.isDisplay = true
            }
        },
        clickSideMenuIcon() {
            this.sideMenu.isCollapse = !this.sideMenu.isCollapse
        },
    },
})

export const useLayoutStore = () => layout(piniaInstance)
