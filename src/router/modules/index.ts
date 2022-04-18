import { RouteRecordRaw } from 'vue-router'

export const modules = ['console']// import all route in /modules/*

const consoleRoutes = import.meta.globEager('@/router/modules/console/*')
export const consoleRoutesArray: RouteRecordRaw[] = Object.keys(consoleRoutes).map(index => {
    const singleRoute: RouteRecordRaw = consoleRoutes[index]?.default
    return singleRoute
})
