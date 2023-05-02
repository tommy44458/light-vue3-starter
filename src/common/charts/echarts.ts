import * as echarts from 'echarts/core'

import { LineChart, CustomChart } from 'echarts/charts'
import {
    TooltipComponent,
    GridComponent,
    TransformComponent,
    GeoComponent,
    DataZoomComponent,
    BrushComponent,
    ToolboxComponent,
    MarkLineComponent,
    LegendComponent,
    GraphicComponent,
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    LineChart,
    CustomChart,
    TooltipComponent,
    GridComponent,
    TransformComponent,
    CanvasRenderer,
    GeoComponent,
    DataZoomComponent,
    BrushComponent,
    ToolboxComponent,
    MarkLineComponent,
    LegendComponent,
    GraphicComponent,
])

export default echarts
