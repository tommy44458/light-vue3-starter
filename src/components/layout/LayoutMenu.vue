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
			<template v-if="item.name === 'console-setting'">
				<ElMenuItem
					:key="index"
					:index="item.name"
					:route="`/${item.path}`"
					class="footer"
					@click="router.push(item.path)"
				>
					<ElIcon>
						<SvgIcon :name="item.meta.icon" />
					</ElIcon>
					<template #title>{{ item.meta.title }}</template>
				</ElMenuItem>
			</template>
			<template v-else>
				<ElMenuItem
					:key="index"
					:index="item.name"
					:route="`/${item.path}`"
					@click="router.push(item.path)"
				>
					<ElIcon>
						<SvgIcon :name="item.meta.icon" />
					</ElIcon>
					<template #title>{{ item.meta.title }}</template>
				</ElMenuItem>
			</template>
		</template>
	</ElMenu>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { uselayoutStore } from '@/store/modules/layout.ts'

import SvgIcon from '@/components/icon/SvgIcon.vue'
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
.side-menu
    height 100%
    border-right none
    text-align left
    box-shadow 0px 0px 12px rgba(0, 0, 0, 0.12)

    .footer
        bottom 0
        width 100%
        position absolute
</style>
