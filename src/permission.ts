import router from '@/router'
import { useAuthStore } from '@/store/modules/auth'

router.beforeEach((_to, _from, next) => {
    // console.log('middleware：', to, from)
    const authStore = useAuthStore()
    if (_to.path !== '/auth/login') {
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
