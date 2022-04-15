<template>
	<el-row :gutter="20">
		<el-col :span="6"><div class="grid-content bg-purple-dark" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
		<el-col :span="6" class="ml-4">
			<div class="grid-content bg-purple">
				<el-button type="success" plain>Success</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="6"><div class="grid-content bg-purple-dark" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple" /></el-col>
		<el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
		<el-col :span="6" class="ml-4">
			<div class="grid-content bg-purple">
				<el-button type="success" plain>Success</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row class="mb-2">
		<el-button>Default</el-button>
		<el-button type="primary">Primary</el-button>
		<el-button type="success">Success</el-button>
		<el-button type="info">Info</el-button>
		<el-button type="warning">Warning</el-button>
		<el-button type="danger">Danger</el-button>
		<el-button>中文</el-button>
	</el-row>

	<el-row class="mt-9">
		<el-button plain>Plain</el-button>
		<el-button type="primary" plain>Primary</el-button>
		<el-button type="success" plain>Success</el-button>
		<el-button type="info" plain>Info</el-button>
		<el-button type="warning" plain>Warning</el-button>
		<el-button type="danger" plain>Danger</el-button>
	</el-row>
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue'
import { successNotification } from '@/common/message.ts'

successNotification('123', '234')
// export default defineComponent({
// 	name: 'page-layout-test',
// })
</script>

<style>
.el-row {
	margin-bottom: 20px;
}
.el-row:last-child {
	margin-bottom: 0;
}
.el-col {
	border-radius: 4px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
</style>
