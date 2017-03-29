class Charts {
    constructor(obj, opt) {
        this._echart = echarts.init(obj, 'macarons');
        this._opt = opt;
    }

    show() {
        this._echart.setOption(this._opt);
    }

    resize() {
        let currentWidth = document.querySelector('.container-box').clientWidth - 50;
        if (currentWidth > 800) {
            if (currentWidth < 1500) {
                this._echart.resize({width : currentWidth, height : currentWidth / 2});
            } else {
                this._echart.resize({width : 1500, height : 750});
            }
        }
    }
}

window.onload = () => {
    const charts = [];
    (function ajax() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/ajax?type=index', true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                // canvas-sex
                const legendSex = [];
                const seriesSex = [];
                for (var key in data['sex']) {
                    legendSex.push(key);
                    seriesSex.push({name : key, value : data['sex'][key]});
                }
                charts.push(new Charts(document.querySelector('#canvas-sex'), {
                    tooltip : {
                        trigger : 'item',
                        formatter : '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend : {
                        orient : 'vertical',
                        left : 'right',
                        data : legendSex
                    },
                    series : [{
                        name : '性别分布',
                        type : 'pie',
                        radius : '55%',
                        center : ['50%', '60%'],
                        data : seriesSex,
                        label : {
                            normal : {
                                show : true,
                                formatter : '{b} : {c} ({d}%)',
                                textStyle : {
                                    fontSize : 25
                                }
                            }
                        },
                        itemStyle : {
                            emphasis : {
                                shadowBlur : 10,
                                shadowOffsetX : 0,
                                shadowColor : 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }));

                //regtime
                const xAxisRegtime = [];
                const seriesRegtime = [];
                for (var key in data['regtime']) {
                    xAxisRegtime.push(key);
                    seriesRegtime.push({name : key, value : data['regtime'][key]});
                }
                charts.push(new Charts(document.querySelector('#canvas-regtime'), {
                    color : ['#37c8f7'],
                    grid : {
                        left : '3%',
                        right : '4%',
                        bottom : '3%',
                        containLabel : true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xAxisRegtime,
                            axisTick : {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name : '人数',
                            type : 'bar',
                            barWidth : '60%',
                            data : seriesRegtime,
                            label : {
                                normal : {
                                    show : true,
                                    position : 'top',
                                    formatter : '{c}',
                                    textStyle : {
                                        fontWeight : 600,
                                        fontSize : 15,
                                        color : '#228DFF'
                                    }
                                }
                            }
                        }
                    ]
                }));

                //place
                const geoCoordMap = {
                    '无可奉告': [129.5,22.0],
                    '贵州省': [106.71,26.57],
                    '新疆区': [87.68,43.77],
                    '香港区': [114.07,22.35],
                    '广西区': [108.33,22.84],
                    '天津市': [117.2,39.13],
                    '甘肃省': [103.73,36.03],
                    '湖南省': [113,28.21],
                    '河北省': [114.48,38.03],
                    '浙江省': [120.19,30.26],
                    '福建省': [119.3,26.08],
                    '云南省': [102.73,25.04],
                    '湖北省': [114.31,30.52],
                    '台湾省': [121.5,25.1],
                    '山西省': [112.53,37.87],
                    '重庆市': [106.54,29.59],
                    '河南省': [113.65,34.76],
                    '江西省': [115.89,28.68],
                    '陕西省': [108.95,34.27],
                    '广东省': [113.23,23.16],
                    '安徽省': [117.27,31.86],
                    '四川省': [104.06,30.67],
                    '吉林省': [125.35,43.88],
                    '辽宁省': [123.38,41.8],
                    '黑龙江': [126.63,45.75],
                    '江苏省': [118.78,32.04],
                    '北京市': [116.46,39.92],
                    '上海市': [121.48,31.22],
                    '山东省': [117,36.65],
                    '海南省': [110.35,20.02],
                };
                const placeData = [];
                for (var key in data['place']) {
                    const temp = {'name': '', 'value' : 0};
                    temp['name'] = key;
                    temp['value'] = data['place'][key];
                    if (key !== '无可奉告') {
                        placeData.push(temp);
                    }
                }
                const convertData = (data) => {
                    const res = [];
                    for (let i = 0; i < data.length; i++) {
                            const geoCoord = geoCoordMap[data[i].name];
                            if (geoCoord) {
                                res.push({
                                    name : data[i].name,
                                    value : geoCoord.concat(data[i].value)
                                });
                            }
                        }
                    return res;
                };
                charts.push(new Charts(document.querySelector('#canvas-place'), {
                    tooltip : {
                        trigger : 'item'
                    },
                    geo: {
                        map : 'china',
                        label : {
                            emphasis : {
                                show : false
                            }
                        },
                        roam : true,
                        itemStyle : {
                            normal : {
                                areaColor : '#fff',
                                borderColor : '#111'
                            },
                            emphasis : {
                                areaColor : '#d6f5ff'
                            }
                        }
                    },
                    series : [
                        {
                            name : 'Top 5',
                            type : 'effectScatter',
                            coordinateSystem : 'geo',
                            data : convertData(placeData.sort((a, b) => {
                                return b.value - a.value;
                            })),
                            symbolSize: (val) => {
                                return val[2]/2;
                            },
                            showEffectOn : 'render',
                            rippleEffect : {
                                brushType : 'stroke'
                            },
                            hoverAnimation : true,
                            label : {
                                normal : {
                                    formatter : (params) => {
                                        return `${params.name} : ${params.value[2]}`;
                                    },
                                    position : 'right',
                                    textStyle : {
                                        fontWeight : 600,
                                        fontSize : 15
                                    },
                                    show : true
                                }
                            },
                            itemStyle : {
                                normal : {
                                    color : '#37c8f7',
                                    shadowBlur : 10,
                                    shadowColor : '#333'
                                }
                            },
                            zlevel : 1
                        }
                    ]
                }));

                //fans
                const xAxisFans = [];
                const seriesFans = [];
                for (var key in data['fans']) {
                    if (key === '0') {
                        xAxisFans.push('<10万');
                        seriesFans.push({name : '<10万', value : data['fans'][key]});
                    } else {
                        xAxisFans.push(key+'0万');
                        seriesFans.push({name : key+'0万', value : data['fans'][key]});
                    }
                }
                charts.push(new Charts(document.querySelector('#canvas-fans'), {
                    color : ['#bc67db'],
                    grid : {
                        left : '3%',
                        right : '4%',
                        bottom : '3%',
                        containLabel : true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xAxisFans,
                            axisTick : {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name : '人数',
                            type : 'bar',
                            barWidth : '60%',
                            data : seriesFans,
                            label : {
                                normal : {
                                    show : true,
                                    position : 'top',
                                    formatter : '{c}',
                                    textStyle : {
                                        fontWeight : 600,
                                        fontSize : 15,
                                        color : '#228DFF'
                                    }
                                }
                            }
                        }
                    ]
                }));

                //playNum 1000W
                const xAxisPlayNum = [];
                const seriesPlayNum = [];
                for (var key in data['playNum']) {
                    if (+key < 10) {
                        if (+key === 0) {
                            xAxisPlayNum.push('<1千万');
                            seriesPlayNum.push({name : '<1千万', value : data['playNum'][key]});
                        } else {
                            xAxisPlayNum.push(key+'千万');
                            seriesPlayNum.push({name : key+'千万', value : data['playNum'][key]});
                        }
                    }
                }
                charts.push(new Charts(document.querySelector('#canvas-playNum'), {
                    tooltip : {
                        trigger : 'item',
                        formatter : '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend : {
                        orient : 'vertical',
                        left : 'right',
                        data : xAxisPlayNum
                    },
                    series : [{
                        name : '性别分布',
                        type : 'pie',
                        radius : '55%',
                        center : ['50%', '60%'],
                        data : seriesPlayNum,
                        label : {
                            normal : {
                                show : true,
                                formatter : '{b} : {c} ({d}%)',
                                textStyle : {
                                    fontSize : 25
                                }
                            }
                        },
                        itemStyle : {
                            emphasis : {
                                shadowBlur : 10,
                                shadowOffsetX : 0,
                                shadowColor : 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }));

                //playNum 10000W
                const xAxisPlayNum2 = [];
                const seriesPlayNum2 = [];
                for (var key in data['playNum']) {
                    if (+key >= 10) {
                        xAxisPlayNum2.push((+key/10)+'亿');
                        seriesPlayNum2.push({name : (+key/10)+'亿', value : data['playNum'][key]});
                    }
                }
                charts.push(new Charts(document.querySelector('#canvas-playNum2'), {
                    tooltip : {
                        trigger : 'item',
                        formatter : '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend : {
                        orient : 'vertical',
                        left : 'right',
                        data : xAxisPlayNum2
                    },
                    series : [{
                        name : '性别分布',
                        type : 'pie',
                        radius : '55%',
                        center : ['50%', '60%'],
                        data : seriesPlayNum2,
                        label : {
                            normal : {
                                show : true,
                                formatter : '{b} : {c} ({d}%)',
                                textStyle : {
                                    fontSize : 25
                                }
                            }
                        },
                        itemStyle : {
                            emphasis : {
                                shadowBlur : 10,
                                shadowOffsetX : 0,
                                shadowColor : 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }));


                //submit
                const xAxisSubmit= [];
                const seriesSubmit = [];
                for (var key in data['submit']) {
                    if (key === '0') {
                        xAxisSubmit.push('<100');
                        seriesSubmit.push({name : '<100', value : data['submit'][key]});
                    } else {
                        xAxisSubmit.push(key+'00');
                        seriesSubmit.push({name : key+'00', value : data['submit'][key]});
                    }
                }
                charts.push(new Charts(document.querySelector('#canvas-submit'), {
                    color : ['#fcba2c'],
                    grid : {
                        left : '3%',
                        right : '4%',
                        bottom : '3%',
                        containLabel : true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xAxisSubmit,
                            axisTick : {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name : '人数',
                            type : 'bar',
                            barWidth : '70%',
                            data : seriesSubmit,
                            label : {
                                normal : {
                                    show : true,
                                    position : 'top',
                                    formatter : '{c}',
                                    textStyle : {
                                        fontWeight : 600,
                                        fontSize : 15,
                                        color : '#228DFF'
                                    }
                                }
                            }
                        }
                    ]
                }));


                //tlist
                const xAxisTlist = [];
                const seriesTlist= [];
                for (var key in data['tlist']) {
                    xAxisTlist.push(key);
                    seriesTlist.push({name : key, value : data['tlist'][key]});
                }
                charts.push(new Charts(document.querySelector('#canvas-tlist'), {
                    tooltip : {
                        trigger : 'item',
                        formatter : '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend : {
                        orient : 'vertical',
                        left : 'right',
                        data : xAxisTlist
                    },
                    series : [{
                        name : '性别分布',
                        type : 'pie',
                        radius : '55%',
                        center : ['50%', '60%'],
                        data : seriesTlist,
                        label : {
                            normal : {
                                show : true,
                                formatter : '{b} : {c} ({d}%)',
                                textStyle : {
                                    fontSize : 25
                                }
                            }
                        },
                        itemStyle : {
                            emphasis : {
                                shadowBlur : 10,
                                shadowOffsetX : 0,
                                shadowColor : 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }));

                //copyright
                const xAxisCopyright = [];
                const seriesCopyright= [];
                for (var key in data['copyright']) {
                    let temp = '';
                    if (key === 'Original') {
                        temp = "原创";
                    } else if (key === 'Copy') {
                        temp = "搬运";
                    } else {
                        temp = "未知";
                    }
                    xAxisCopyright.push(temp);
                    seriesCopyright.push({name : temp, value : data['copyright'][key]});
                }
                charts.push(new Charts(document.querySelector('#canvas-copyright'), {
                    tooltip : {
                        trigger : 'item',
                        formatter : '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend : {
                        orient : 'vertical',
                        left : 'right',
                        data : xAxisCopyright
                    },
                    series : [{
                        name : '性别分布',
                        type : 'pie',
                        radius : '55%',
                        center : ['50%', '60%'],
                        data : seriesCopyright,
                        label : {
                            normal : {
                                show : true,
                                formatter : '{b} : {c} ({d}%)',
                                textStyle : {
                                    fontSize : 25
                                }
                            }
                        },
                        itemStyle : {
                            emphasis : {
                                shadowBlur : 10,
                                shadowOffsetX : 0,
                                shadowColor : 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }));

                //created
                const xAxisCreated= [];
                const seriesCreated= [];
                for (var key in data['created']) {
                    xAxisCreated.push(key);
                    seriesCreated.push({name : key, value : data['created'][key]});
                }
                charts.push(new Charts(document.querySelector('#canvas-created'), {
                    color : ['#b6a2de'],
                    grid : {
                        left : '3%',
                        right : '4%',
                        bottom : '3%',
                        containLabel : true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xAxisCreated,
                            axisTick : {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name : '人数',
                            type : 'bar',
                            barWidth : '70%',
                            data : seriesCreated,
                            label : {
                                normal : {
                                    show : true,
                                    position : 'top',
                                    formatter : '{c}',
                                    textStyle : {
                                        fontWeight : 600,
                                        fontSize : 15,
                                        color : '#228DFF'
                                    }
                                }
                            }
                        }
                    ]
                }));

                charts.map((item) => {
                    item.show();
                    item.resize();
                });
            }
        };
    })();

    function chartsPush(arr, data) {

    }

    window.addEventListener('resize', () => {
        charts.map((item) => {
            item.resize();
        });
    });
};
