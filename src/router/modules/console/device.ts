export default {
    name: 'console-device',
    meta: {
        title: 'Device',
        icon: 'device',
    },
    path: 'device',
    component: () => import('@/views/console/device/ConsoleDevice.vue'),
}
