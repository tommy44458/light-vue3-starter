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
import { uselayoutStore } from '@/store/modules/layout.ts'

const layoutStore = uselayoutStore()
</script>

<style scoped lang="stylus">

.el-header
    height 48px
    position relative
    background-color #ffffff
    color var(--el-text-color-primary)
    box-shadow 0px 0px 12px rgba(0, 0, 0, 0.12)
    z-index 2

.el-aside
    width unset !important

.main-container
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    width 100%
    height 100%
    background #eeeeee
    display flex
    flex-direction column
</style>
