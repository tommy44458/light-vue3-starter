<template>
	<ElRow :gutter="20">
		<ElCol :span="12">
			<div class="header-grid justify-start">
				<ElSpace wrap :size="16">
					<div
						@click="layoutStore.clickSideMenuIcon()"
						class="cursor-pointer"
					>
						<SvgIcon name="side_menu" class="side_menu" />
					</div>
					<div @click="router.push('/')" class="cursor-pointer">
						<SvgIcon name="logo" class="logo" />
					</div>
				</ElSpace>
			</div>
		</ElCol>
		<ElCol :span="12">
			<div class="header-grid justify-end">
				<ElSpace wrap :size="0">
					<SvgIcon name="bell" class="bell" w:m="r-16px" />
					<SvgIcon name="user_solid" class="user-solid" />
				</ElSpace>
			</div>
		</ElCol>
	</ElRow>
</template>

<script setup lang="ts">
import { uselayoutStore } from '@/store/modules/layout.ts'

const router = useRouter()
const layoutStore = uselayoutStore()
</script>

<style scoped lang="stylus">
.el-row
    height 100%
    align-items center

.header-grid
    display flex
    align-items center

    .side_menu
        width 16px
        height 16px

    .logo
        width 51.03px
        height 24px

    .bell
        width 26px
        height 24px
        color #606666

    .user-solid
        width 24px
        height 24px
        color #606666
</style>
