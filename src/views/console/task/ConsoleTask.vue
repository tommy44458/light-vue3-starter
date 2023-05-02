<template>
	<h1>Task Checked ({{taskStore.checkedTaskListLength}})</h1>
	<div class="h-250px mt-16px mb-16px overflow-scroll">
        <TaskComponent
            v-for="task in taskStore.checkedTaskList" :key="task.id"
            :id="task.id"
        />
    </div>
	<h1>Task Pending ({{taskStore.pendingTaskListLength}})</h1>
    <div class="h-250px mt-16px overflow-scroll">
        <TaskComponent
            v-for="task in taskStore.pendingTaskList" :key="task.id"
            :id="task.id"
        />
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store/modules/task'

const taskStore = useTaskStore()
const refreshInterval = ref(null)

onMounted(() => {
	// taskStore.refreshTaskList()
	// refreshInterval.value = setInterval(() => {
	// 	taskStore.refreshTaskList()
	// }, 3000)
})

onUnmounted(() => {
	if (refreshInterval.value) {
		clearInterval(refreshInterval.value)
	}
})
</script>

<style scoped lang="stylus">
// a
</style>
