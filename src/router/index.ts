import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { consoleRoutesArray, authRoutesArray } from '@/router/modules'

import PageNotFound from '@/views/PageNotFound.vue'
import ConsoleLayout from '@/views/console/ConsoleLayout.vue'
import AuthLayout from '@/views/auth/AuthLayout.vue'

const routeConfigures: RouteRecordRaw[] = []

// default route
const defaultRouteConfigures: RouteRecordRaw[] = [
    {
        name: 'console',
        path: '/console/:pathMatch(.*)*',
        redirect: '/console/task',
        component: ConsoleLayout,
        children: consoleRoutesArray,
    },
    {
        name: 'auth',
        path: '/auth/:pathMatch(.*)*',
        redirect: '/auth/login',
        component: AuthLayout,
        children: authRoutesArray,
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
    history: createWebHashHistory(),
    routes: routeConfigures.concat(defaultRouteConfigures),
})

export default router
