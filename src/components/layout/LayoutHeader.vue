<template>
	<ElRow :gutter="20">
		<ElCol :span="12">
			<div class="flex-center justify-start">
                <div
                    @click="layoutStore.clickSideMenuIcon()"
                    class="cursor-pointer mr-2"
                >
                    <SvgIcon name="side_menu" class="h-4 w-4 flex-center justify-start" />
                </div>
                <div @click="router.push('/')" class="cursor-pointer">
                    <p class="my-0">CONSOLE</p>
                </div>
			</div>
		</ElCol>
		<ElCol :span="12">
			<div class="flex-center justify-end">
                <SvgIcon name="bell" class="h-4 w-4 mr-2" />
                <SvgIcon name="user" class="h-4 w-4 mr-2" />
                <ElButton size="small" @click="logout()"> Logout </ElButton>
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
</style>
