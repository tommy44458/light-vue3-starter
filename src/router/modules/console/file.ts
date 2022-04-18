export default {
    name: 'console-file',
    meta: {
        order: 3,
        title: 'File',
        icon: 'file',
    },
    path: 'file',
    component: () => import('@/views/console/file/ConsoleFile.vue'),
}
