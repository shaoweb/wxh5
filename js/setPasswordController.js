app.controller('setPasswordCity', function($scope, $http,$interval) {

    $scope.title = "密码设置";
    $scope.$emit('title', $scope.title);

    $scope.data = {
        current: "1"
    };
    $scope.actions = {
        setCurrent: function(param) {
            $scope.data.current = param;
        }
    }

    $scope.cation = false;
    $scope.vm = {};
    var vm = $scope.vm;
    $scope.paracont = "获取验证码";
    vm.disabledClick = false;

    //验证码读秒
    vm.sendMessage = function() {
        if ($scope.Tel == undefined || $scope.Tel == null) {
            $(".tishi").text('请输入手机号').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.Tel.length !== 11) {
            $(".tishi").text('手机号码格式错误').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            vm.disabledClick = false;
            var second = 60;
            $http({
                method: 'GET',
                url: 'user/sms',
                params: {
                    "tel": $scope.Tel
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
    $scope.SetPsaawordNow = false;
    $scope.SetPsaawordOk = function () {
        wx.closeWindow()
    };

    //修改支付密码
    $scope.PayPsd = function () {
        if($scope.newPsd == null){
            $(".tishi").text('密码不能为空').fadeIn(300).delay(3000).fadeOut(300);
        }else if($scope.newPsd !== $scope.newPsd2){
            $(".tishi").text('两次输入不一致').fadeIn(300).delay(3000).fadeOut(300);
        }else {
            $http({
                method:'GET',
                url:'user/onlineup',
                params:{
                    "check": $scope.testNum,
                    "newPaypwd": $scope.newPsd
                }
            }).then(function successCallback(response) {
                $scope.SetRes = response.data.result;
                if($scope.SetRes == 1){
                    $scope.SetPsaawordNow = true;
                }else if($scope.SetRes == 2){
                    $(".tishi").text('验证码已过期').fadeIn(300).delay(3000).fadeOut(300);
                }else if($scope.SetRes == 3){
                    $(".tishi").text('验证码错误').fadeIn(300).delay(3000).fadeOut(300);
                }else if($scope.SetRes == 4){
                    $(".tishi").text('与原密码相同').fadeIn(300).delay(3000).fadeOut(300);
                }else {
                    $(".tishi").text('未知错误').fadeIn(300).delay(3000).fadeOut(300);
                    $scope.SetPsaawordNow = true;
                }
            }, function errorCallback(response) {
                //失败执行代码
            })
        }
    }
    //修改登录密码
    $scope.loginOK = function () {
        if($scope.loginPsd == null){
            $(".tishi").text('密码不能为空').fadeIn(300).delay(3000).fadeOut(300);
        }else if($scope.loginPsd !== $scope.loginPsd2){
            $(".tishi").text('两次输入不一致').fadeIn(300).delay(3000).fadeOut(300);
        }else {
            $http({
                method:'GET',
                url:'user/updateLoginPas',
                params:{
                    "pwd": $scope.loginPsd
                }
            }).then(function successCallback(response) {
                $scope.loginRes = response.data.result;
                if($scope.loginRes == 1){
                    $scope.SetPsaawordNow = true;
                }else if($scope.loginRes == 2){
                    $(".tishi").text('修改失败').fadeIn(300).delay(3000).fadeOut(300);
                }else if($scope.loginRes == 4){
                    $(".tishi").text('与原密码相同').fadeIn(300).delay(3000).fadeOut(300);
                }else {
                    $(".tishi").text('未知错误').fadeIn(300).delay(3000).fadeOut(300);
                    $scope.SetPsaawordNow = true;
                }
            }, function errorCallback(response) {
                //失败执行代码
            })
        }
    }
})