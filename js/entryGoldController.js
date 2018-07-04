app.controller('entryGoldCity', function($scope, $http) {

    $scope.title = "入金申请";
    $scope.$emit('title', $scope.title);



    if(window.name == ''){
        $scope.payname = "请选择支付方式";
    }else{
        $scope.arr = window.name;
        $scope.payname = $scope.arr.split(',')[1];
        switch($scope.payname)
        {
            case '农业银行':
                $scope.bank = 'abc';
                break;
            case '建设银行':
                $scope.bank = 'ccb';
                break;
            case '兴业银行':
                $scope.bank = 'cib';
                break;
            case '招商银行':
                $scope.bank = 'cmb';
                break;
            case '华夏银行':
                $scope.bank = 'hxb';
                break;
            case '工商银行':
                $scope.bank = 'icbc';
                break;
            case '上海银行':
                $scope.bank = 'bosh';
                break;
            case '中国银行':
                $scope.bank = 'boc';
                break;
            case '交通银行':
                $scope.bank = 'comm';
                break;
            case '上海浦东发展银行':
                $scope.bank = 'spdb';
                break;
            case '广东发展银行':
                $scope.bank = 'gdb';
                break;
            case '深圳发展银行':
                $scope.bank = 'desz';
                break;
            case '中国邮政储蓄':
                $scope.bank = 'psbc';
                break;
            case '上海农村商业银行':
                $scope.bank = 'shrcb';
                break;
            case '北京银行':
                $scope.bank = 'bob';
                break;
            case '广州商业银行':
                $scope.bank = 'gzcb';
                break;
            case '光大银行':
                $scope.bank = 'ceb';
                break;
            case '温州银行':
                $scope.bank = 'bowz';
                break;
            case '中信银行':
                $scope.bank = 'cncb';
                break;
            case '民生银行':
                $scope.bank = 'cmbc';
                break;

        }

    }

    $scope.sure = function () {
        $http({
            method: 'GET',
            url: 'testqw',
            params: {
                "amount":$scope.summoney,
                "bankCode":$scope.bank
            }
        }).then(function successCallback(response) {
            $scope.date = response.data;
            if ($scope.date.result == 1) {
                $(".tishi").text('充值成功').fadeIn(300).delay(3000).fadeOut(300);
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }
});
