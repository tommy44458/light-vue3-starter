import { defineStore } from 'pinia'
import piniaInstance from '@/store'

import { useApiHttp } from '@/common/api/http'

const apiHttpHook = useApiHttp()

interface Task {
    id: number,
    name: string,
    desc: string,
    checked: boolean,
    data: string[],
    date: string,
}

interface TaskState {
    taskList: Task[]
    taskListKey: number
}

export const task = defineStore('task', {
    state: (): TaskState => ({
        taskList: [
            {
                id: 0,
                name: 'task0',
                checked: true,
                desc: 'task0 description',
                data: Array.from({ length: 32 }, (_, i) => String(i + 1)),
                date: '2023-04-28',
            },
            {
                id: 1,
                name: 'task1',
                checked: false,
                desc: 'task1 description',
                data: Array.from({ length: 32 }, (_, i) => String(i + 1)),
                date: '2023-04-28',
            },
            {
                id: 2,
                name: 'task2',
                checked: true,
                desc: 'task2 description',
                data: Array.from({ length: 32 }, (_, i) => String(i + 1)),
                date: '2023-04-28',
            },
        ],
        taskListKey: 0,
    }),
    getters: {
        allTaskList: (state: TaskState) => state.taskList,
        checkedTaskList: (state: TaskState) => state.taskList.filter(_task => _task.checked === true),
        pendingTaskList: (state: TaskState) => state.taskList.filter(_task => _task.checked === false),
        checkedTaskListLength() {
            return this.checkedTaskList.length
        },
        pendingTaskListLength() {
            return this.pendingTaskList.length
        },
    },
    actions: {
        refreshTaskList() {
            apiHttpHook.task.getAllTask().then(res => {
                if (!res) return
                if (res.status !== 200) return
                this.taskList.length = 0
                // console.log(res.data.data)
                res.data.data.forEach((_task: any) => {
                    this.taskList.push(
                        {
                            id: _task.id,
                            name: _task.name,
                            desc: _task.desc,
                            checked: _task.checked,
                            data: _task.data.split(' '),
                            date: _task.date,
                        },
                    )
                })
                this.taskListKey += 1
            })
        },
        getTask(id: number) {
            return this.taskList.filter(_task => _task.id === id)[0]
        },
        addTask(content: {
            [key: string]: any
        }) {
            // eslint-disable-next-line no-param-reassign
            content.id = this.taskList[this.taskList.length - 1].id + 1
            this.taskList.push(content as {
                id: number,
                name: string,
                desc: string,
                checked: boolean,
                data: string[],
                date: string,
            })
        },
        checkTask(taskContent: Task) {
            this.taskListKey += 1
            apiHttpHook.task.updateTask(taskContent.id, taskContent)
        },
        updateTask(content: {
            [key: string]: any
        }) {
            const index = this.taskList.findIndex(_task => _task.id === content.id)
            this.taskList[index] = content as {
                id: number,
                name: string,
                desc: string,
                checked: boolean,
                data: string[],
                date: string,
            }
            apiHttpHook.task.updateTask(content.id, content)
        },
        deleteTask(id: number) {
            const index = this.taskList.findIndex(_task => _task.id === id)
            this.taskList.splice(index, 1)
            apiHttpHook.task.deleteTask(id)
        },
    },
})

export const useTaskStore = () => task(piniaInstance)
