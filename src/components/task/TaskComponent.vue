<template>
	<ElRow
        v-if="currentTask"
        class="mb-[8px] flex flex-center pa-[16px] h-[50px]"
        :key="taskStore.taskListKey"
    >
        <ElCol :span="3" class="!py-[4px] text-center">
            {{ currentTask.date }}
        </ElCol>
        <ElCol :span="3">
            {{ currentTask.name }}
        </ElCol>
        <ElCol :span="8">
            {{ currentTask.desc }}
        </ElCol>
        <ElCol :span="5">
            <TaskDataChart
                style="height: 30px;"
                :name="currentTask.name"
                :data="currentTask.data"
                :ret="'chartRef'"
            />
        </ElCol>
        <ElCol :span="1"></ElCol>
        <ElCol :span="2">
            <ElCheckbox
                v-model="checked"
                label="checked"
                @change="changeChecked()"
            />
        </ElCol>
        <ElCol :span="2">
            <el-button
                size="small"
                @click="taskStore.deleteTask(currentTask.id)"
            >
                Delete
            </el-button>
        </ElCol>
    </ElRow>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store/modules/task'

const taskStore = useTaskStore()
const checked = ref(false)

const props = defineProps({
	id: { type: Number, required: true },
})

const currentTask = ref(null)

const changeChecked = () => {
	currentTask.value.checked = checked.value
	taskStore.updateTask(currentTask.value)
}

onMounted(() => {
	currentTask.value = taskStore.getTask(props.id)
	checked.value = currentTask.value.checked
	taskStore.taskListKey += 1
})

</script>

<style scoped lang="stylus">
// a
</style>
