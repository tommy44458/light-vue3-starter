<template>
	<ElRow :gutter="20">
		<ElCol :span="12">
			<div class="grid-content grid-bg">
				<ElSpace wrap :size="16">
					<div @click="layoutStore.clickSideMenuIcon()">
						<SvgIcon name="side_menu" class="side_menu" />
					</div>
					<div @click="router.push('/console')">
						<SvgIcon name="logo" class="logo" />
					</div>
				</ElSpace>
			</div>
		</ElCol>
		<ElCol :span="12">
			<div class="grid-content-right grid-bg">
				<ElSpace wrap :size="0">
					<SvgIcon name="bell" class="bell" />
					<SvgIcon name="user_solid" class="user-solid" />
				</ElSpace>
			</div>
		</ElCol>
	</ElRow>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { uselayoutStore } from '@/store/modules/layout.ts'
import SvgIcon from '@/components/icon/SvgIcon.vue'

const router = useRouter()
const layoutStore = uselayoutStore()
</script>

<style scoped lang="stylus">
.el-row
    height 100%
    align-items center

.grid-bg
	background rgba(255,255,255,1)

.grid-content
    text-align left

    .side_menu
        width 16px
        height 16px
        display flex
        align-items center
        cursor pointer

    .logo
        width 51.03px
        height 24px
        display flex
        align-items center
        cursor pointer

.grid-content-right
    text-align right

    .bell
        width 26px
        height 24px
        display flex
        align-items center
        color #606666
        margin-right 16px

    .user-solid
        width 24px
        height 24px
        display flex
        align-items center
        color #606666
</style>
