import { useHttpAuth, HttpAuthHook } from '@/common/api/http/auth'
import { AxiosResponse } from 'axios'

export type { AxiosResponse }
export interface ApiHttpHook {
    auth: HttpAuthHook,
}

const apiHttpHook = (): ApiHttpHook => ({
    auth: useHttpAuth(),
})

export const useApiHttp = () => apiHttpHook()
