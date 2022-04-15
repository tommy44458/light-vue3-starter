<template>
	<el-menu
		default-active="1"
		class="el-menu-vertical"
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose"
	>
		<el-menu-item index="1">
			<el-icon>
				<SvgIcon name="neulive" />
			</el-icon>
			<template #title>Device</template>
		</el-menu-item>
		<el-menu-item index="2" @click="router.push('/layout-test')">
			<el-icon>
				<SvgIcon name="project" />
			</el-icon>
			<template #title>Project</template>
		</el-menu-item>
		<el-menu-item index="3" @click="router.push('/home')">
			<el-icon>
				<SvgIcon name="document" />
			</el-icon>
			<template #title>Document</template>
		</el-menu-item>
		<el-menu-item index="4">
			<el-icon>
				<SvgIcon name="user" />
			</el-icon>
			<template #title>User</template>
		</el-menu-item>
		<el-menu-item index="5" class="sidebar-menu-footer">
			<el-icon>
				<SvgIcon name="setting" />
			</el-icon>
			<template #title>Setting</template>
		</el-menu-item>
	</el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import SvgIcon from '@/components/SvgIcon.vue'

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

const router = useRouter()
</script>

<style scoped lang="stylus">

.el-menu {
    height: 100%
    border-right: none
    text-align: left
}

.sidebar-menu-footer {
  bottom: 0;
  width: 100%;
  position: absolute;
}
</style>
