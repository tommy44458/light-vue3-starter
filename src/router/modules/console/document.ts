export default {
    name: 'console-document',
    meta: {
        title: 'Document',
        icon: 'document',
    },
    path: 'document',
    component: () => import('@/views/console/document/ConsoleDocument.vue'),
}
