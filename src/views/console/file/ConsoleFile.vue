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

<script setup lang="ts"></script>

<style scoped lang="stylus">
.grid-content-file
    height 36px
</style>
