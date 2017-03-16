const myGenInfo1 = echarts.init(document.querySelector('#basic-info-1'), 'macarons');
const myGenInfoOpt1 = {
    title: {
        text: 'ECharts 入门示例'
            },
    tooltip: {},
    legend: {},
    xAxis: {
        data: ["A","B","C","D","E","F"]
    },
    yAxis: {},
    series: [{
        name: 'x',
        type: 'bar',
        data: [5, 20, 36, 50, 10, 20]
    }]
};

myGenInfo1.setOption(myGenInfoOpt1);
