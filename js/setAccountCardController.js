app.controller('setAccountCardCity', function($scope,$http) {

    $scope.title = "更换银行卡";
    $scope.$emit('title', $scope.title);


    // 原银行卡号
    $http({
        method:'GET',
        url:'/user/personal'
    }).then(function successCallback(response) {
        $scope.accountNomber = response.data.bankid;
    }, function errorCallback(response) {
        //失败执行代码
    });

    $scope.setCardNow = false;
    // 绑定
    $scope.OK = function () {
        $http({
            method: 'GET',
            url: 'user/bankCheck',
            params: {
                "status":2,
                "name":$scope.name,
                "idNo":$scope.IDcard,
                "cardNo":$scope.accountNo,
                "phoneNo":$scope.phone
            }
        }).then(function successCallback(response) {
            $scope.backRes = response.data.result;
            if($scope.backRes == 2){
                $scope.setCardNow = true;
            }else {
                $(".tishi").text('操作失败').fadeIn(300).delay(3000).fadeOut(300);
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    };
    // 确认提示框
    $scope.setOk = function () {
        window.location.href = "#!/setAccount"
    };
})
