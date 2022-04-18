export default {
    name: 'console-setting',
    meta: {
        order: 5,
        title: 'Setting',
        icon: 'setting',
    },
    path: 'setting',
    component: () => import('@/views/console/setting/ConsoleSetting.vue'),
}
