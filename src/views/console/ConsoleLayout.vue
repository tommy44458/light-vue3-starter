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
import { useMQTT } from '@/common/mqtt'

const layoutStore = useLayoutStore()
const mqtt = useMQTT()
mqtt.subscribe(['dc:a6:32:6c:bc:b4/data_server/system_resource'], 1)
mqtt.registerEvent(
	'#/data_server/system_resource',
	(topic: string, message: string) => {
		console.log('func123123', message.toString(), topic)
		ElNotification({
			title: 'System Resource',
			message: message.toString(),
			type: 'info',
		})
	},
)
</script>

<style scoped lang="stylus">
.el-header
    height 48px
    position relative
    background-color #fff
    color var(--el-text-color-primary)
    box-shadow 0 0 12px rgba(0, 0, 0, 0.12)
    z-index 2

.el-aside
    width unset !important
</style>
