<template>
	<h1>UI File</h1>
	<ElRow :gutter="20" class="mt-4">
		<ElCol :span="6">
			<div class="grid-content bg-red-500" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content bg-red-500" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content bg-red-500" />
		</ElCol>
		<ElCol :span="6">
			<div class="grid-content bg-red-500"></div>
		</ElCol>
	</ElRow>
</template>

<script setup lang="ts"></script>

<style scoped lang="stylus">
// .el-row
// 	margin-bottom 20px

// .el-col
// 	border-radius 4px

// .bg-purple-dark
// 	background #99a9bf

// .bg-purple
// 	background #d3dce6

// .bg-purple-light
// 	background #e5e9f2

.grid-content
	border-radius 4px
	height 36px
</style>
