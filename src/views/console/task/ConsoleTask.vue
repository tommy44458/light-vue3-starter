<template>
	<h1>Task Done ({{taskStore.doneTaskListLength}})</h1>
	<div class="h-250px mt-16px mb-16px overflow-scroll">
        <TaskComponent
            v-for="task in taskStore.doneTaskList" :key="task.id"
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

onMounted(() => {
	// aa
})

onUnmounted(() => {
	// dd
})
</script>

<style scoped lang="stylus">
// a
</style>
