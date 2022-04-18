export default {
    name: 'console-device',
    meta: {
        order: 1,
        title: 'Device',
        icon: 'device',
    },
    path: 'device',
    component: () => import('@/views/console/device/ConsoleDevice.vue'),
}
