import router from '@/router'
import { useAuthStore } from '@/store/modules/auth'

router.beforeEach((to, from, next) => {
    console.log('middleware：', to, from)
    const authStore = useAuthStore()
    if (to.path !== '/auth/login') {
        if (authStore.getCurrentAccount() == null) {
            router.push('/auth/login')
        } else {
            next()
        }
    } else if (authStore.getCurrentAccount() != null) {
        router.push('/')
    } else {
        next()
    }
})

export default router
