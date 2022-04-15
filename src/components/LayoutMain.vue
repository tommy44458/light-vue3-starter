<template>
	<main class="main-container">
		<el-container>
			<el-header>
				<LayoutHeader></LayoutHeader>
			</el-header>
			<el-container>
				<el-aside>
					<LayoutMenu></LayoutMenu>
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutMenu from '@/components/LayoutMenu.vue'

export default defineComponent({
	name: 'layout-main',
	components: {
		LayoutHeader,
		LayoutMenu,
	},
})
</script>

<style scoped lang="stylus">

$top-height = 60px
$left-side-width = 80px

.el-header {
    height: 48px
    position: relative
    background-color: #ffffff
    color: var(--el-text-color-primary)
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12)
    z-index: 2
}

.el-aside {
    width: 160px
    height: 100%
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12)
    background-color: #ffffff
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
