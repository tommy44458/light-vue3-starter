<template>
	<main class="overflow-hidden hide-scrollbar">
		<ElContainer>
			<ElHeader>
				<LayoutHeader />
			</ElHeader>
			<ElContainer>
				<ElAside v-if="!layoutStore.isMobile">
					<LayoutMenu />
				</ElAside>
				<ElAside
					v-if="
						layoutStore.isMobile && !layoutStore.sideMenu.isCollapse
					"
				>
					<LayoutMenuMobile />
				</ElAside>
				<ElContainer v-loading="layoutStore.isRouteChanging">
					<ElMain
						class="!-p-[0] !bg-white !p-[16px]"
						:style="useViewHeight(80)"
					>
						<RouterView />
					</ElMain>
					<ElFooter class="bg-white">
						<LayoutFooter />
					</ElFooter>
				</ElContainer>
			</ElContainer>
		</ElContainer>
	</main>
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutMenu from '@/components/layout/LayoutMenu.vue'
import { useLayoutStore } from '@/store/modules/layout'
import LayoutMenuMobile from '@/components/layout/LayoutMenuMobile.vue'

const layoutStore = useLayoutStore()

const useViewHeight = (offset: number) => {
	let cls = ''
	cls += `height: calc(100vh - ${(offset)}px);`
	cls += ` height: calc(var(--vh, 1vh) * 100 - ${(offset)}px);`
	return cls
}
</script>

<style scoped lang="stylus">
.el-header
    height 48px
    background-color #fff
    color var(--el-text-color-primary)
    border-bottom 1px solid #E3ECED
    z-index 2

.el-aside
    border-right 1px solid #E3ECED
    width unset !important

.el-footer
    height 32px
</style>
