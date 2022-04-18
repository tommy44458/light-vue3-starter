export default {
    name: 'console-setting',
    meta: {
        title: 'Setting',
        icon: 'setting',
    },
    path: 'setting',
    component: () => import('@/views/console/setting/ConsoleSetting.vue'),
}
