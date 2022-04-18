export default {
    name: 'console-user',
    meta: {
        title: 'User',
        icon: 'user',
    },
    path: 'user',
    component: () => import('@/views/console/user/ConsoleUser.vue'),
}
