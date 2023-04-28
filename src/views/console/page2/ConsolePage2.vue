<template>
	<h1>Page2</h1>
	<ElRow :gutter="20" class="mt-4">
		<ElCol :span="6"><div class="grid-content bg-purple-dark" /></ElCol>
		<ElCol :span="6"><div class="grid-content bg-purple" /></ElCol>
		<ElCol :span="6"><div class="grid-content bg-purple-light" /></ElCol>
		<ElCol :span="6">
			<div class="grid-content bg-purple"></div>
		</ElCol>
	</ElRow>
	<ElRow :gutter="20" class="mt-4">
		<ElCol :span="6"><div class="grid-content bg-purple-dark" /></ElCol>
		<ElCol :span="6"><div class="grid-content bg-purple" /></ElCol>
		<ElCol :span="6"><div class="grid-content bg-purple-light" /></ElCol>
		<ElCol :span="6">
			<div class="grid-content bg-purple"></div>
		</ElCol>
	</ElRow>
	<ElRow class="mt-4">
		<ElButton>Default</ElButton>
		<ElButton type="primary">Primary</ElButton>
		<ElButton type="success">Success</ElButton>
		<ElButton type="info">Info</ElButton>
		<ElButton type="warning">Warning</ElButton>
		<ElButton type="danger">Danger</ElButton>
	</ElRow>

	<ElRow class="mt-4">
		<ElButton plain>Plain</ElButton>
		<ElButton type="primary" plain>Primary</ElButton>
		<ElButton type="success" plain>Success</ElButton>
		<ElButton type="info" plain>Info</ElButton>
		<ElButton type="warning" plain>Warning</ElButton>
		<ElButton type="danger" plain>Danger</ElButton>
	</ElRow>
</template>

<script setup lang="ts">
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

.el-col
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
