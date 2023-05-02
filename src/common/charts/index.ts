import { ChartOptions, chartHook } from '@/common/charts/hook'
import { Ref } from '@vue/runtime-core'

export type { ChartOptions }
export const useChart = (chartRef: Ref, options: ChartOptions) => chartHook(chartRef, options)
export const EChartEventAlias = {
    mouseMove: 'mousemove',
    mouseOver: 'mouseover',
    mouseOut: 'mouseout',
    geoRoam: 'georoam',
    geoSelectChanged: 'geoselectchanged',
}
