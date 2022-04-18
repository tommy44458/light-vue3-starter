<template>
	<h1>UI Project</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'

onMounted(() => {
	ElNotification({
		title: 'Info',
		message: 'This is an info message',
		type: 'info',
	})
	console.error('onMounted')
})
</script>
