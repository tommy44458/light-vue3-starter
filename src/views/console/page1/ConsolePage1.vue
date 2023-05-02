<template>
	<div class="mb-5 flex-center">
		<h1>Register Task (Publish data to MQTT broker)</h1>
	</div>
	<ElForm :model="form" label-width="120px">
		<ElFormItem label="Task name">
			<ElInput v-model="form.name" />
		</ElFormItem>
		<!-- <ElFormItem label="Activity zone">
			<ElSelect
				v-model="form.region"
				placeholder="please select your zone"
			>
				<ElOption label="Zone one" value="shanghai" />
				<ElOption label="Zone two" value="beijing" />
			</ElSelect>
		</ElFormItem> -->
		<ElFormItem label="Task time">
			<ElCol :span="11">
				<ElDatePicker
					v-model="form.date"
					type="date"
					placeholder="Pick a date"
					style="width: 100%"
				/>
			</ElCol>
		</ElFormItem>
		<ElFormItem label="Task status">
			<ElSwitch v-model="form.checked" />
		</ElFormItem>
		<!-- <ElFormItem label="Activity type">
			<ElCheckboxGroup v-model="form.type">
				<ElCheckbox label="Online activities" name="type" />
				<ElCheckbox label="Promotion activities" name="type" />
				<ElCheckbox label="Offline activities" name="type" />
				<ElCheckbox label="Simple brand exposure" name="type" />
			</ElCheckboxGroup>
		</ElFormItem> -->
		<!-- <ElFormItem label="Resources">
			<ElRadioGroup v-model="form.resource">
				<ElRadio label="Sponsor" />
				<ElRadio label="Venue" />
			</ElRadioGroup>
		</ElFormItem> -->
		<ElFormItem label="Task Description">
			<ElInput v-model="form.desc" type="textarea" />
		</ElFormItem>
		<ElFormItem>
			<ElButton type="primary" @click="onPublish">Publish</ElButton>
		</ElFormItem>
	</ElForm>
</template>

<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

const mqttHook = useMQTT()

const form = reactive({
	name: '',
	date: '',
	checked: false,
	desc: '',
})

const onPublish = () => {
	mqttHook.publish(
		'tommy44458/vue3/starter/console/register_task',
		JSON.stringify({
			name: form.name,
			date: form.date,
			checked: form.checked,
			desc: form.desc,
		}),
	)
}

onMounted(() => {
	// a
})

onUnmounted(() => {
	// a
})
</script>

<style scoped lang="stylus">
.el-row
    margin-bottom 20px

.el-row:last-child
    margin-bottom 0

.ElCol
    border-radius 4px

.bg-purple-dark
    background #99a9bf

.bg-purple
    background #d3dce6

.bg-purple-light
    background #e5e9f2

.grid-content
    border-radius 4px
    min-height 36px

.row-bg
    padding 10px 0
    background-color #f9fafc
</style>
