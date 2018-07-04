app.controller('resetPsdCity', function($scope,$http,$interval) {

    $scope.title = "忘记密码";
    $scope.$emit('title', $scope.title);


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
                url: 'regist/sms',
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

    // 完成并返回
    $scope.save = function () {
        if($scope.psd !== $scope.apsd){
            $(".tishi").text('两次密码输入不一致').fadeIn(300).delay(3000).fadeOut(300);
        }else if($scope.psd == null || $scope.apsd == null){
            $(".tishi").text('密码不能为空').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $http({
                method:'GET',
                url:'regist/updatefotPas',
                params:{
                    "tel":$scope.Tel,
                    "pwd":$scope.psd,
                    "check":$scope.testNum
                }
            }).then(function successCallback(response) {
                $scope.SetResult = response.data.result;
                if($scope.SetResult == 1){
                    window.location.href = "#!/binding"
                }else if($scope.SetResult == 2){
                    $(".tishi").text('验证码过期').fadeIn(300).delay(3000).fadeOut(300);
                }else if($scope.SetResult == 3){
                    $(".tishi").text('验证码错误').fadeIn(300).delay(3000).fadeOut(300);
                }else if($scope.SetResult == 4){
                    $(".tishi").text('手机号不存在').fadeIn(300).delay(3000).fadeOut(300);
                }else{
                    $(".tishi").text('修改失败').fadeIn(300).delay(3000).fadeOut(300);
                }
            }, function errorCallback(response) {
                //失败执行代码
            });

        }
    }



})