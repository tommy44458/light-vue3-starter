<template>
	<h1>UI File</h1>
	<ElRow :gutter="20" class="mt-4">
		<ElCol :span="6">
			<div class="grid-content-file bg-red-500" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content-file bg-red-500" style="height: 50px" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content-file bg-red-500" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content-file bg-red-500" />
		</ElCol>
	</ElRow>
</template>

<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

const mqttHook = useMQTT()

onMounted(() => {
	mqttHook.subscribe(
		['+/data_server/device_manager/neulive_manager/info_all'],
		1,
	)
	mqttHook.registerEvent(
		'+/data_server/device_manager/neulive_manager/info_all',
		(topic: string, message: string) => {
			console.log('file', message.toString(), topic)
			ElNotification({
				title: 'System Resource',
				message: message.toString(),
				type: 'info',
			})
		},
		'console_file',
	)
})

onUnmounted(() => {
	mqttHook.unRegisterEvent(
		'+/data_server/device_manager/neulive_manager/info_all',
		'console_file',
	)
	mqttHook.unSubscribe(
		'+/data_server/device_manager/neulive_manager/info_all',
	)
})
</script>

<style scoped lang="stylus">
.grid-content-file
    height 36px
</style>
