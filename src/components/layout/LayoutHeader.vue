<template>
	<ElRow :gutter="20">
		<ElCol :span="12">
			<div class="flex-center justify-start">
				<ElSpace wrap :size="16" class="justify-start">
					<div
						@click="layoutStore.clickSideMenuIcon()"
						class="cursor-pointer"
					>
						<SvgIcon name="side_menu" class="side_menu" />
					</div>
					<div @click="router.push('/')" class="cursor-pointer">
						<h1>CONSOLE</h1>
					</div>
				</ElSpace>
			</div>
		</ElCol>
		<ElCol :span="12">
			<div class="flex-center justify-end">
				<ElSpace wrap :size="0">
					<SvgIcon name="bell" class="bell" w:m="r-16px" />
					<SvgIcon name="user" class="user-solid" w:m="r-16px" />
					<ElButton size="small" @click="logout()"> Logout </ElButton>
				</ElSpace>
			</div>
		</ElCol>
	</ElRow>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const logout = () => {
	authStore.logout()
	router.push('/auth/login')
}
</script>

<style scoped lang="stylus">
.el-row
    height 100%
    align-items center

.side_menu
    width 16px
    height 16px

.logo
    width 51.03px
    height 24px

.bell
    width 20px
    height 20px
    color #606666

.user-solid
    width 20px
    height 20px
    color #606666
</style>
