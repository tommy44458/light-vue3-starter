export default {
    name: 'console-project',
    meta: {
        order: 2,
        title: 'Project',
        icon: 'project',
    },
    path: 'project',
    component: () => import('@/views/console/project/ConsoleProject.vue'),
}
