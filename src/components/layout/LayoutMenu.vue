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
				:index="item.name"
				:route="`/${item.path}`"
				:class="{ footer: index == consoleRoutesArray.length - 1 }"
				@click="router.push(item.path)"
			>
				<ElIcon>
					<SvgIcon :name="item.meta.icon" />
				</ElIcon>
				<template #title v-if="!layoutStore.sideMenu.isCollapse">
					{{ item.meta.title }}
				</template>
			</ElMenuItem>
		</template>
	</ElMenu>
</template>

<script setup lang="ts">
import { uselayoutStore } from '@/store/modules/layout.ts'

import { consoleRoutesArray } from '@/router/modules/index.ts'

const router = useRouter()
const layoutStore = uselayoutStore()

const reactiveData = reactive({
	activeIndex: null,
})

const onResize = () => {
	layoutStore.windowResize({
		size: window.innerWidth,
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
		reactiveData.activeIndex = _n.name
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
    box-shadow 0 0 12px rgba(0, 0, 0, 0.12)

    .footer
        bottom 0
        width 100%
        position absolute
</style>
