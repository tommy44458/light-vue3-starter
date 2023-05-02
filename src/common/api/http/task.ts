import { AxiosResponse } from 'axios'

let taskBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}/task`
if (process.env.VITE_API_HOST === 'localhost') {
    const host = location.href.split('/')[2]
    taskBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${host}:${process.env.VITE_API_PORT}/task`
}

export interface HttpTaskHook {
    getAllTask: () => Promise<AxiosResponse>,
    updateTask: (taskID: number, content: object) => Promise<AxiosResponse>,
    deleteTask: (taskID: number) => Promise<AxiosResponse>,
}

const getAllTask = async (): Promise<AxiosResponse> => {
    try {
        const ret = await axios.get(`${taskBaseUrl()}/all`)
        return ret
    } catch (error) {
        return null
    }
}

const updateTask = async (taskID: number, content: object): Promise<AxiosResponse> => {
    try {
        const ret = await axios.patch(`${taskBaseUrl()}/update/${taskID}`, content)
        return ret
    } catch (error) {
        return null
    }
}

const deleteTask = async (taskID: number): Promise<AxiosResponse> => {
    try {
        const ret = await axios.delete(`${taskBaseUrl()}/${taskID}`)
        return ret
    } catch (error) {
        return null
    }
}

const httpTaskHook = (): HttpTaskHook => ({
    getAllTask,
    updateTask,
    deleteTask,
})

export const useHttpTask = () => httpTaskHook()
