const makeGrid = () => ({
    index: 0,
    top: '0%',
    height: '100%',
    left: '0%',
    right: '0%',
})
const makeXAxis = () => [
    {
        show: false,
        type: 'category',
        boundaryGap: false,
        gridIndex: 0,
        data: [] as string[],
    },
    // trick: to make data zoom window not zoom the data (to make overview data can show completely)
    {
        show: false,
        type: 'category',
        boundaryGap: false,
        gridIndex: 0,
        data: [] as string[],
    },
]
const makeYAxis = () => ({
    type: 'value',
    gridIndex: 0,
    splitLine: {
        show: false,
    },
    axisLabel: { show: false },
    min: 'dataMin',
    max: 'dataMax',
})

const overviewChartOption = {
    grid: makeGrid(),
    xAxis: makeXAxis(),
    yAxis: makeYAxis(),
}

export default overviewChartOption
