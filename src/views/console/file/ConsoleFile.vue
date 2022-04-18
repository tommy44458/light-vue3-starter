<template>
	<h1>UI File</h1>
	<el-row :gutter="20" class="mt-4">
		<el-col :span="6"><div class="grid-content bg-purple-dark" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple"></div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="stylus">
.el-row
	margin-bottom 20px

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
</style>
