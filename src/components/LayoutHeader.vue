<template>
	<div class="header">
		<SvgIcon name="hambegur" class="hambegur" />
		<div @click="router.push('/device')">
			<SvgIcon name="logo" class="logo" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()
</script>

<style scoped lang="stylus">
.hambegur {
    width 16px
    height 16px
    display flex
    align-items center
    margin-right 16px
}

.logo {
    width 51.03px
    height 24px
    display flex
    align-items center
}

.header {
    width 100%
    height 100%
    display flex
    align-items center
}
</style>
