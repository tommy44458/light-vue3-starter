<template>
    <div
        ref="chartRef"
        class="w-full border-solid border-[0.5px] border-[#E3ECED]"
    />
</template>

<script setup lang="ts">
import echarts from '@/common/charts/echarts'
import { useChart } from '@/common/charts'
import chartOption from '@/components/task/chart-option'
import { PropType } from 'vue'

const chartRef = ref(null)
let myChart: echarts.ECharts = null

const props = defineProps({
	name: { type: String, required: true },
	data: { type: Array as PropType<string[]>, required: true },
})

const resizeChart = () => {
	myChart.resize()
}

const refreshChart = (name: string, data: string[]) => {
	const seriesList = []
	seriesList.push({
		name,
		type: 'line',
		data,
		emphasis: {
			disabled: true,
		},
		lineStyle: {
			color: getComputedStyle(document.body).getPropertyValue(
				'--el-color-primary',
			),
			width: 1,
		},
		symbol: 'none',
		showSymbol: false,
		showAllSymbol: false,
		connectNulls: true,
		animation: false,
		xAxisIndex: 0,
		yAxisIndex: 0,
		zlevel: 0,
	})
	myChart.setOption({
		xAxis: {
			data: Array.from({ length: data.length }, (_, i) => i + 1),
		},
		series: seriesList,
	})
	resizeChart()
}

onMounted(async () => {
	myChart = useChart(chartRef, chartOption)
	refreshChart(props.name, props.data)
})

onUnmounted(() => {
	myChart.dispose()
})

defineExpose({
	resizeChart,
	refreshChart,
})
</script>
