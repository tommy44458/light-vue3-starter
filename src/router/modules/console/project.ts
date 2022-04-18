export default {
    name: 'console-project',
    meta: {
        title: 'Project',
        icon: 'project',
    },
    path: 'project',
    component: () => import('@/views/console/project/ConsoleProject.vue'),
}
