import { useApiHttp, ApiHttpHook } from '@/common/api/http/index'

export interface ApiHook {
    http: ApiHttpHook,
}

const apiHook = (): ApiHook => ({
    http: useApiHttp(),
})

export const useAPI = () => apiHook()
