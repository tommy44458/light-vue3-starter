<template>
	<div class="header">
		<div class="title" @click="router.push('/')">BioPro</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="stylus">

.header {
    width 100%
    height 100%
    display flex
    align-items center

    .title {
        // font-weight bold
        // font-size 20px
        // cursor pointer
    }
}
</style>
