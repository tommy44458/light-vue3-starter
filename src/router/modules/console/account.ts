export default {
    name: 'console-account',
    meta: {
        order: 4,
        title: 'Account',
        icon: 'account',
    },
    path: 'account',
    component: () => import('@/views/console/account/ConsoleAccount.vue'),
}
