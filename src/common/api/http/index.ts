import { useHttpAuth, HttpAuthHook } from '@/common/api/http/auth'
import { useHttpTask, HttpTaskHook } from '@/common/api/http/task'
import { AxiosResponse } from 'axios'

export type { AxiosResponse }
export interface ApiHttpHook {
    auth: HttpAuthHook,
    task: HttpTaskHook,
}

const apiHttpHook = (): ApiHttpHook => ({
    auth: useHttpAuth(),
    task: useHttpTask(),
})

export const useApiHttp = () => apiHttpHook()
