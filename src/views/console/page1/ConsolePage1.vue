<template>
	<div class="mb-5 flex-center">
		<h1>Publish data to MQTT broker</h1>
	</div>
	<ElForm :model="form" label-width="120px">
		<ElFormItem label="Activity name">
			<ElInput v-model="form.name" />
		</ElFormItem>
		<ElFormItem label="Activity zone">
			<ElSelect
				v-model="form.region"
				placeholder="please select your zone"
			>
				<ElOption label="Zone one" value="shanghai" />
				<ElOption label="Zone two" value="beijing" />
			</ElSelect>
		</ElFormItem>
		<ElFormItem label="Activity time">
			<ElCol :span="11">
				<ElDatePicker
					v-model="form.date1"
					type="date"
					placeholder="Pick a date"
					style="width: 100%"
				/>
			</ElCol>
			<ElCol :span="2" class="text-center">
				<span class="text-gray-500">-</span>
			</ElCol>
			<ElCol :span="11">
				<ElTimePicker
					v-model="form.date2"
					placeholder="Pick a time"
					style="width: 100%"
				/>
			</ElCol>
		</ElFormItem>
		<ElFormItem label="Instant delivery">
			<ElSwitch v-model="form.delivery" />
		</ElFormItem>
		<ElFormItem label="Activity type">
			<ElCheckboxGroup v-model="form.type">
				<ElCheckbox label="Online activities" name="type" />
				<ElCheckbox label="Promotion activities" name="type" />
				<ElCheckbox label="Offline activities" name="type" />
				<ElCheckbox label="Simple brand exposure" name="type" />
			</ElCheckboxGroup>
		</ElFormItem>
		<ElFormItem label="Resources">
			<ElRadioGroup v-model="form.resource">
				<ElRadio label="Sponsor" />
				<ElRadio label="Venue" />
			</ElRadioGroup>
		</ElFormItem>
		<ElFormItem label="Activity form">
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
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
})

const mqttSubscribe = () => {
	mqttHook.subscribe(['tommy44458/vue3/starter/console/page1'], 1)
	mqttHook.registerEvent(
		'tommy44458/vue3/starter/console/page1',
		(topic: string, message: string) => {
			const mesJson = JSON.parse(message.toString())
			console.log(mesJson, topic)

			ElNotification({
				title: `MQTT TOPIC: ${topic}`,
				message: mesJson,
				type: 'info',
			})
		},
	)
}

const onPublish = () => {
	mqttHook.publish(
		'tommy44458/vue3/starter/console/page1',
		JSON.stringify({
			name: form.name,
			region: form.region,
			date1: form.date1,
			date2: form.date2,
			delivery: form.delivery,
			type: form.type,
			resource: form.resource,
			desc: form.desc,
		}),
	)
}

onMounted(() => {
	mqttSubscribe()
})

onUnmounted(() => {
	mqttHook.unRegisterEvent('tommy44458/vue3/starter/console/page1')
	mqttHook.unSubscribe('tommy44458/vue3/starter/console/page1')
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
