<template>
	<el-row :gutter="20">
		<el-col :span="6">
			<div class="grid-content bg-purple">
				<el-space wrap :size="16">
					<SvgIcon name="hambegur" class="hambegur" />
					<div @click="router.push('/device')">
						<SvgIcon name="logo" class="logo" />
					</div>
				</el-space>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple" />
		</el-col>
		<el-col :span="6">
			<div class="grid-content bg-purple" />
		</el-col>
		<el-col :span="6" class="ml-4">
			<div class="grid-content-right bg-purple">
				<el-space wrap :size="0">
					<SvgIcon name="bell" class="bell" />
					<SvgIcon name="user_solid" class="user-solid" />
				</el-space>
			</div>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()
</script>

<style scoped lang="stylus">

.el-row {
    align-items center
    padding: 12px 0 12px 0;
}

.bg-purple {
	background: #ffffff;
}

.grid-content-right {
    text-align right

    .bell {
        width 26px
        height 24px
        display flex
        align-items center
        color #606666
        margin-right 16px
    }

    .user-solid {
        width 24px
        height 24px
        display flex
        align-items center
        color #A9B2B2
    }
}

.grid-content {
	border-radius 4px;
	height: 24px;
    text-align left

    .logo {
        width 51.03px
        height 24px
        display flex
        align-items center
    }

    .hambegur {
        width 16px
        height 16px
        display flex
        align-items center
    }
}
</style>
