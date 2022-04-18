<template>
	<main class="main-container">
		<ElContainer>
			<ElHeader>
				<LayoutHeader></LayoutHeader>
			</ElHeader>
			<ElContainer>
				<ElAside>
					<LayoutMenu></LayoutMenu>
				</ElAside>
				<ElMain>
					<RouterView />
				</ElMain>
			</ElContainer>
		</ElContainer>
	</main>
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutMenu from '@/components/layout/LayoutMenu.vue'
</script>

<style scoped lang="stylus">

.el-header {
    height: 48px
    position: relative
    background-color: #ffffff
    color: var(--el-text-color-primary)
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12)
    z-index: 2
}

.el-main {
  padding: 16px
}

.main-container {
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
}

.page-links {
  a {
    font-weight: bold;
    margin: 0 20px;
  }
}
</style>
