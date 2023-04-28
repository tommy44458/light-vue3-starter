<template>
	<ElRow
        v-if="currentTask"
        class="mb-8px flex flex-center border-dark-30 border-1 pa-16px"
    >
        <ElCol :span="3" class="!py-4px text-center">
            {{ currentTask.date }}
        </ElCol>
        <ElCol :span="3">
            {{ currentTask.name }}
        </ElCol>
        <ElCol :span="14">
            {{ currentTask.description }}
        </ElCol>
        <ElCol :span="2">
            <ElCheckbox
            v-model="currentTask.done"
            label="done"
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

const props = defineProps({
	id: { type: Number, required: true },
})

const currentTask = ref(null)

onMounted(() => {
	currentTask.value = taskStore.getTask(props.id)
})

</script>

<style scoped lang="stylus">
// a
</style>
