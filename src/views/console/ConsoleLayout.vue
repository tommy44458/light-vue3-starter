<template>
	<main class="main-container">
		<ElContainer>
			<ElHeader>
				<LayoutHeader></LayoutHeader>
			</ElHeader>
			<ElContainer>
				<ElAside :style="{ display: layoutStore.sideMenuDisplayStyle }">
					<LayoutMenu></LayoutMenu>
				</ElAside>
				<ElMain class="!p-16px !-md:p-12px !-sm:p-8px">
					<RouterView />
				</ElMain>
			</ElContainer>
		</ElContainer>
	</main>
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutMenu from '@/components/layout/LayoutMenu.vue'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
</script>

<style scoped lang="stylus">
.el-header
    height 48px
    position relative
    background-color #fff
    color var(--el-text-color-primary)
    border 1px solid #E3ECED
    z-index 2

.el-aside
    width unset !important
</style>
