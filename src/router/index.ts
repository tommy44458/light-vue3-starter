import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { consoleRoutesArray } from '@/router/modules'

import PageNotFound from '@/views/PageNotFound.vue'
import ConsoleLayout from '@/views/console/ConsoleLayout.vue'

const routeConfiguras: RouteRecordRaw[] = []

// default route
const defaultRouteConfiguras: RouteRecordRaw[] = [
    {
        name: 'console',
        path: '/console/:pathMatch(.*)*',
        redirect: '/console/device',
        component: ConsoleLayout,
        children: consoleRoutesArray,
    },
    {
        name: 'root',
        path: '/',
        redirect: '/console/device',
    },
    {
        name: '404',
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.VITE_BASE_URL),
    routes: routeConfiguras.concat(defaultRouteConfiguras),
})

export default router
