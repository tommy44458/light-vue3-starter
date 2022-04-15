<template>
	<el-menu
		class="side-menu"
		:default-active="reactiveData.activeIndex"
		:collapse="reactiveData.isCollapse"
		:unique-opened="true"
		@open="handleOpen"
		@close="handleClose"
	>
		<template v-for="(item, index) in reactiveData.menuItem" :key="index">
			<template v-if="index === reactiveData.menuItem.length - 1">
				<el-menu-item
					:key="index"
					:index="item.path"
					:route="item.path"
					class="footer"
					@click="router.push(item.path)"
				>
					<el-icon>
						<SvgIcon :name="item.icon" />
					</el-icon>
					<template #title>{{ item.title }}</template>
				</el-menu-item>
			</template>
			<template v-else>
				<el-menu-item
					:key="index"
					:index="item.path"
					:route="`\${item.path}`"
					@click="router.push(item.path)"
				>
					<el-icon>
						<SvgIcon :name="item.icon" />
					</el-icon>
					<template #title>{{ item.title }}</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'

import SvgIcon from '@/components/SvgIcon.vue'
import MenuItem from '@/types/index.ts'

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

const router = useRouter()

const reactiveData = reactive({
	menuItem: [
		{
			path: '/device',
			icon: 'neulive',
			title: 'Device',
		},
		{
			path: '/project',
			icon: 'project',
			title: 'Project',
		},
		{
			path: '/document',
			icon: 'document',
			title: 'Document',
		},
		{
			path: '/user',
			icon: 'user',
			title: 'User',
		},
		{
			path: '/setting',
			icon: 'setting',
			title: 'Setting',
		},
	],

	isCollapse: false,
	activeIndex: null,

	itemClick(e: MenuItem) {
		router.push(e.path)
	},
})

const onResize = () => {
	// const { width } = useWindowSize()
	console.log(window.innerWidth)
	if (window.innerWidth < 872) {
		reactiveData.isCollapse = true
		console.log(reactiveData.isCollapse)
	} else {
		reactiveData.isCollapse = false
	}
}

onMounted(() => {
	window.addEventListener('resize', onResize)
	onResize()
})

watch(
	() => router.currentRoute.value,
	_n => {
		reactiveData.activeIndex = _n.path
	},
)
</script>

<style scoped lang="stylus">
.side-menu {
    height: 100%
    border-right: none
    text-align: left
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12)
    max-width 160px

    .footer {
        bottom: 0;
        width: 100%;
        position: absolute;
    }
}
</style>
