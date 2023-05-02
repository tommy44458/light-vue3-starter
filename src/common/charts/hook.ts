import echarts from '@/common/charts/echarts'
import { Ref } from '@vue/runtime-core'
import { ECBasicOption } from 'echarts/types/dist/shared'

export type ChartOptions = ECBasicOption

export function chartHook(chartRef: Ref, options: ChartOptions) {
    let myChart: echarts.ECharts = null

    const chart = echarts.getInstanceByDom(chartRef.value)
    if (chart) {
        myChart = chart
    } else {
        myChart = echarts.init(chartRef.value)
    }
    myChart.setOption(options)

    return myChart
}
