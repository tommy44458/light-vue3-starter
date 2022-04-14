<template>
	<main class="main-container">
		<div class="top">
			<LayoutHeader />
		</div>

		<div class="bottom">
			<div class="left">
				<LayoutMenu />
			</div>

			<div class="right">
				<div class="content">
					<router-view />
				</div>
			</div>
		</div>
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

@import "../style/basic.styl"

$top-height = 60px
$left-side-width = 80px

.main-container {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  width 100%
  height 100%
  background #eeeeee
  box-sizing border-box
  display flex
  flex-direction column
  justify-content space-between

  .top {
    position relative
    width 100%
    height $top-height
    margin-bottom 1px
  }

  .bottom {
    position relative
    box-sizing border-box
    width 100%
    height 100%
    display flex
    justify-content space-between

    .left {
      position relative
      width $left-side-width
      height 100%
      box-sizing border-box
    }

    .right {
      position relative
      width 100%
      height 100%
      box-sizing border-box
      background #eeeeee
      padding 0px 1px 1px 1px

      .content {
        position relative
        width 100%
        height 100%
        background $background-color
        box-sizing border-box
        padding 10px
      }
    }
  }
}

.page-links {
  a {
    font-weight: bold;
    margin: 0 20px;
  }
}
</style>
