import { AxiosResponse } from 'axios'

let taskBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${process.env.VITE_API_HOST}/api/task`
if (process.env.VITE_API_HOST === 'localhost') {
    const host = location.href.split('/')[2]
    taskBaseUrl = () => `${process.env.VITE_API_PROTOCOL}://${host}/api/task`
}

export interface HttpAuthHook {
    getAllTask: () => Promise<AxiosResponse>,
    updateTask: (taskID: number, content: object) => Promise<AxiosResponse>,
    deleteTask: (taskID: number) => Promise<AxiosResponse>,
}

const getAllTask = async (): Promise<AxiosResponse> => {
    try {
        const ret = await axios.get(`${taskBaseUrl()}/all_task_list`)
        return ret
    } catch (error) {
        return null
    }
}

const updateTask = async (taskID: number, content: object): Promise<AxiosResponse> => {
    try {
        const ret = await axios.post(`${taskBaseUrl()}/update_task`, {
            task_id: taskID,
            content,
        })
        return ret
    } catch (error) {
        return null
    }
}

const deleteTask = async (taskID: number): Promise<AxiosResponse> => {
    try {
        const ret = await axios.post(`${taskBaseUrl()}/task/${taskID}`)
        return ret
    } catch (error) {
        return null
    }
}

const httpAuthHook = (): HttpAuthHook => ({
    getAllTask,
    updateTask,
    deleteTask,
})

export const useHttpAuth = () => httpAuthHook()
