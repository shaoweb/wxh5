app.controller('replaceTelCity', function($scope,$http,$interval) {

    $scope.title = "更换手机号";
    $scope.$emit('title', $scope.title);



    $scope.cation = false;
    $scope.vm = {};
    var vm = $scope.vm;
    $scope.paracont = "获取验证码";
    vm.disabledClick = false;

    //验证码读秒
    vm.sendMessage = function() {
        /*测试专用，勿删
        $http({
            method:'GET',
            url:'login/landed',
            params:{
                "username":'8500028',
                "pwd":123456
            }
        }).then(function successCallback(response) {
            $scope.LOGIN = response.data.result;
            if($scope.LOGIN == 1){
            }else {
                $(".tishi").text('登录失败').fadeIn(300).delay(3000).fadeOut(300);
            }
        }, function errorCallback(response) {
            //失败执行代码
        });*/

        if ($scope.NewTel == undefined || $scope.NewTel == null) {
            $(".tishi").text('请输入手机号').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.NewTel.length !== 11) {
            $(".tishi").text('手机号码格式错误').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            vm.disabledClick = false;
            var second = 60;
            $http({
                method: 'GET',
                url: 'user/sms',
                params: {
                    "tel": $scope.NewTel
                }
            }).then(function successCallback(response) {
                if (response.data.result == 0) {
                    $(".tishi").text("验证码发送失败").fadeIn(300).delay(3000).fadeOut(300);
                } else if (response.data.result == 1) {
                    $scope.sms = response.data;
                    var timePromise = $interval(function() {
                        vm.disabledClick = true;
                        if (second <= 0) {
                            $interval.cancel(timePromise);
                            second = 60;
                        } else {
                            second--;
                            $scope.paracont = "验证码 " + second + " s";
                            if (second == 0) {
                                $scope.paracont = "重发验证码";
                                vm.disabledClick = false;
                            }
                        }
                    }, 1000, 60);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    };

    // 完成
    $scope.ReplaceTel = function () {
        $http({
            method:'GET',
            url:'user/updateTel',
            params:{
                "tel":$scope.NewTel,
                "check":$scope.testNum
            }
        }).then(function successCallback(response) {
            $scope.date = response.data.result;
            if($scope.date == 1){
                window.location.href = "#!/setPerson"
            }else if($scope.date == 2){
                $(".tishi").text('验证码过期').fadeIn(300).delay(3000).fadeOut(300);
            }else if($scope.date == 3){
                $(".tishi").text('验证码错误').fadeIn(300).delay(3000).fadeOut(300);
            }else {
                $(".tishi").text('未知错误').fadeIn(300).delay(3000).fadeOut(300);
            }
        }, function errorCallback(response) {
            //失败执行代码
        })
    }
});