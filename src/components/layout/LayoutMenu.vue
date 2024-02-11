<template>
	<ElMenu
		class="side-menu"
		:default-active="reactiveData.activeIndex"
		:collapse="layoutStore.sideMenu.isCollapse"
		:unique-opened="true"
		@open="handleOpen"
		@close="handleClose"
	>
		<template v-for="(item, index) in consoleRoutesArray" :key="index">
			<ElMenuItem
				:index="String(item.name)"
				:route="`/${item.path}`"
				:class="{ footer: index == consoleRoutesArray.length - 1 }"
                :disabled="item.path === 'setting'"
				@click="router.push(item.path)"
			>
				<ElIcon>
					<SvgIcon :name="(item.meta.icon as string)" />
				</ElIcon>
				<template #title v-if="!layoutStore.sideMenu.isCollapse">
					{{ item.meta.title }}
				</template>
			</ElMenuItem>
		</template>
	</ElMenu>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'

import { consoleRoutesArray } from '@/router/modules/index'

const router = useRouter()
const layoutStore = useLayoutStore()

const reactiveData = reactive({
	activeIndex: null,
})

const onResize = () => {
	layoutStore.windowResize({
		width: window.innerWidth,
		height: window.innerHeight,
	})
}

onMounted(() => {
	reactiveData.activeIndex = router.currentRoute.value.name
	window.addEventListener('resize', onResize)
	onResize()
})

watch(
	() => router.currentRoute.value,
	_n => {
		reactiveData.activeIndex = String(_n.name)
	},
)

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>

<style scoped lang="stylus">
.el-menu:not(.el-menu--collapse)
    width 160px

.side-menu
    height 100%
    border-right none
    text-align left

    .footer
        bottom 0
        width 100%
        position absolute
</style>
