app.controller('detailCity', function($scope, $http) {

    $scope.title = "资金明细";
    $scope.$emit('title', $scope.title);

    $http({
        method:'GET',
        url:'order/getOrder',
        params:{
            "orderId": '',       /*订单号，不必须*/
            "type":'',           /*类型，不必须 可选值：入金、出金*/
            "way":'',            /*通道，不必须 暂且不填*/
            "bankName":'',       /*银行名，不必须*/
            "status":'',         /*出入金状态，不必须 可选值：0审核中（出金才有该状态,123都有）；1成功；2失败；3处理中*/
            "minTime":'',        /*开始时间，格式：yyyy-MM-dd，不必须*/
            "maxTime":'',        /*结束时间，格式：yyyy-MM-dd，不必须*/
            "page":'',           /*页数，大于0的整数，必须*/
            "num":''             /*每页数据条数，大于0的整数，必须*/
        }
    }).then(function successCallback(response) {
        if(response.data.result == 1){
            $scope.detailList = response.data.data;
            /*data：数据
            {
                orderList：      数据	数组
                [{
                orderid：        订单号，必须
                type：           类型，必须 直接返回出金、入金
                amount：         发生金额，必须
                fees：           手续费，必须	double类型
                createtime：     操作时间，时间戳格式 需要转换成时间格式
                bankname：       银行名，必须
                status：         订单状态，必须 可选值：0审核中（出金才有该状态）；1	成功；2失败；3处理中
                else3：          处理时间，格式：yyyy-MM-dd HH-mm-ss
            },{}...],*/
        }else {
            $(".tishi").text('数据请求失败').fadeIn(300).delay(3000).fadeOut(300);
        }
    }, function errorCallback(response) {

    })

    var mobileSelect4 = new MobileSelect({
        trigger: '#TimePick',
        title: '',
        wheels: [
            {data: [
                '2018', '2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'
            ]},
            {data: [ '01', '02','03','04','05','06','07','08','09','10','11','12'
            ]},
            {data: [ '01', '02','03','04','05','06','07','08','09','20','21','22','23','24','25','26','27','28','29','30','31'
            ]}
        ],
        connector:'.',
        title:'选择日期',
        triggerDisplayData:false, /*trigger的innerHtml是否变为选择的数据。*/
        position: [0,6,4], //初始化定位
        transitionEnd:function (indexArr, data) {
            $scope.TimeNow = data[0];
        },
        callback: function(indexArr, data) {
            $scope.$apply(function() {
                $scope.Year = data[0];
                $scope.Mon = data[1];
                $scope.Day = data[2]
            })
        }
    });


});
