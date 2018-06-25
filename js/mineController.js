app.controller('mineCity', function($scope, $http, $filter) {

    $scope.title = "总资产";
    $scope.$emit('title', $scope.title);

    $scope.arr = [];
    $scope.dateAsString = $filter('date')(new Date(), "dd");
    for (var i = 1; i <= $scope.dateAsString; i++) {
        $scope.arr.push(String(i + "日"));
    }
    console.log($scope.arr);

    var figure = echarts.init(document.getElementById('figure'));
    var option = {
        title: {
            text: ''
        },
        grid: {
            top: "25%",
            left: "10%",
            right: '10%',
            bottom: "30%"
        },
        dataZoom: [{
            type: 'slider'
        }],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: 'true',
            right: 10,
            orient: "vertical",
            data: ['可用资金', '上日存结']
        },
        xAxis: {
            type: "category",
            name: "单位/日",
            nameLocation: "end",
            nameTextStyle: {
                color: "#cc000",
                fontStyle: "normal",
                padding: [-25, 0, 0, -30],
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    symbol: ['none', 'arrow'],
                    symbolSize: [10, 15]
                }
            },
            axisTick: {
                inside: true
            },
            data: $scope.arr
        },
        yAxis: {
            name: "单位 / RMB",
            nameTextStyle: {
                fontSize: 10
            },
            axisTick: {
                inside: true
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '可用资金',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
        }, {
            name: '上日存结',
            type: 'line',
            data: [15, 30, 16, 40, 50, 60, 15, 30, 16, 40, 50, 60, 15, 30, 16, 40, 50, 60]
        }]
    };

    figure.setOption(option);

})