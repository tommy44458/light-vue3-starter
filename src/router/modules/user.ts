export default {
    name: 'view-user',
    meta: {
        icon: 'iconfont-xxx',
    },
    path: '/user',
    component: () => import('@/views/user/ViewUser.vue'),
}
