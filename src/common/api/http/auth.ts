import { AxiosResponse } from 'axios'

let authBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${process.env.VITE_API_HOST}/api/auth`
if (process.env.VITE_API_HOST === 'localhost') {
    const host = location.href.split('/')[2]
    authBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${host}/api/auth`
}

export interface HttpAuthHook {
    login: (account: string, password: string) => Promise<AxiosResponse>,
}

const login = async (account: string, password: string): Promise<AxiosResponse> => {
    try {
        const ret = await axios.post(`${authBaseUrl()}/user/login`, {
            account,
            password,
        })
        return ret
    } catch (error) {
        return null
    }
}

const httpAuthHook = (): HttpAuthHook => ({
    login,
})

export const useHttpAuth = () => httpAuthHook()
