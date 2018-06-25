app.controller('virtualCity', function($scope, $interval, $http, closeWindow) {

    $scope.title = "虚拟开户";
    $scope.$emit('title', $scope.title);
    $scope.fine = false;
    $scope.vm = {};
    var vm = $scope.vm;
    $scope.paracont = "获取验证码";
    vm.disabledClick = false;

    var test = window.location.href;
    $scope.times = Date.parse(new Date());
    var index = test.indexOf("#");
    if (index > -1) {
        test = test.substring(0, index);
    }
    //随机字符串
    function randomString(len) {　　
        len = len || 32;　　
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
        var maxPos = $chars.length;　　
        var pwd = '';　　
        for (i = 0; i < len; i++) { pwd += $chars.charAt(Math.floor(Math.random() * maxPos)); }
        return pwd;
    };
    $scope.str = randomString(32);

    closeWindow.getData($scope.str, $scope.times, test).then(function(data) {});

    $scope.finexd = (value) => {
        $scope.fine = value;
        wx.closeWindow();
    }

    //监听电话号
    $scope.blured = (value) => {
        if ($scope.tel == undefined || $scope.tel == null) {
            $(".tishi").text('请输入手机号').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.tel.length !== 11) {
            $(".tishi").text('手机号码格式错误').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $http({
                method: 'GET',
                url: 'regist/tel/',
                params: {
                    "tel": value
                }
            }).then(function successCallback(response) {
                $scope.date = response.data;
                if ($scope.date.result == 0) {
                    vm.disabledClick = false;
                    $(".tishi").text('手机号已注册').fadeIn(300).delay(3000).fadeOut(300);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    };

    vm.sendMessage = function() {
        if ($scope.tel !== "" && $scope.tel.length == 11) {
            var second = 60;
            if ($scope.tel !== "") {
                $http({
                    method: 'GET',
                    url: 'regist/sms/',
                    params: {
                        "tel": $scope.tel
                    }
                }).then(function successCallback(response) {
                    $scope.sms = response.data;
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
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
        }
    };

    //检测
    $scope.account = function() {
        if ($scope.tel == undefined || $scope.tel.length < 11) {
            $(".tishi").text('请确保输入有效手机号').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $http({
                method: 'GET',
                url: 'regist/addIn/',
                params: {
                    "tel": $scope.tel,
                    "check": $scope.check,
                    "invitecode": $scope.invitecode
                }
            }).then(function successCallback(response) {
                $scope.addIn = response.data;
                if ($scope.addIn.result == 1) {
                    $scope.fine = true;
                } else if ($scope.addIn.result == 2) {
                    $(".tishi").text('验证码过期').fadeIn(300).delay(3000).fadeOut(300);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    }

})