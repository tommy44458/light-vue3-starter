import { defineStore } from 'pinia'
import piniaInstance from '@/store'

interface TaskState {
    taskList: {
        id: number,
        name: string,
        description: string,
        done: boolean,
        date: string,
    }[]
}

export const task = defineStore('task', {
    state: (): TaskState => ({
        taskList: [
            {
                id: 0,
                name: 'task0',
                done: true,
                description: 'task0 description',
                date: '2023-04-28',
            },
            {
                id: 1,
                name: 'task1',
                done: false,
                description: 'task1 description',
                date: '2023-04-28',
            },
            {
                id: 2,
                name: 'task2',
                done: true,
                description: 'task2 description',
                date: '2023-04-28',
            },
        ],
    }),
    getters: {
        allTaskList: (state: TaskState) => state.taskList,
        doneTaskList: (state: TaskState) => state.taskList.filter(_task => _task.done === true),
        pendingTaskList: (state: TaskState) => state.taskList.filter(_task => _task.done === false),
        doneTaskListLength() {
            return this.doneTaskList.length
        },
        pendingTaskListLength() {
            return this.pendingTaskList.length
        },
    },
    actions: {
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
                description: string,
                done: boolean,
                date: string,
            })
        },
        deleteTask(id: number) {
            const index = this.taskList.findIndex(_task => _task.id === id)
            this.taskList.splice(index, 1)
        },
    },
})

export const useTaskStore = () => task(piniaInstance)
