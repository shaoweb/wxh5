app.controller('paymentCity', function($scope, $interval, $http, $q) {

    $scope.title = "设置支付密码";
    $scope.$emit('title', $scope.title);
    $scope.tel = window.name;
    $scope.pass = '';
    $scope.passed = '';

    $scope.staste = (value) => {
        if (value) {
            $('.img').attr('src', 'images/biyan.png');
            for (var i = 0; i < $scope.pass.length; i++) {
                $(".pass-border-box>span").children().css("background", "#fff");
                $(".pass-border-box>span").eq(i).children().text($scope.pass[i]);
            }
        } else {
            $('.img').attr('src', 'images/yanjing.png');
            for (var i = 0; i < $scope.pass.length; i++) {
                $(".pass-border-box>span").children().css("background", "#418fde");
                $(".pass-border-box>span").eq(i).children().empty();
            }
        }
    };

    $scope.stasted = (value) => {
        console.log($scope.passed);
        if (value) {
            $('.img').attr('src', 'images/biyan.png');
            for (var i = 0; i < $scope.passed.length; i++) {
                $(".passed>span").children().css("background", "#fff");
                $(".passed>span").eq(i).children().text($scope.passed[i]);
            }
        } else {
            $('.img').attr('src', 'images/yanjing.png');
            for (var i = 0; i < $scope.passed.length; i++) {
                $(".passed>span").children().css("background", "#418fde");
                $(".passed>span").eq(i).children().empty();
            }
        }
    };

    //支付密码
    $scope.paypwd = function() {
        if ($scope.pass !== $scope.passed) {
            $(".tishi").text('两次密码不一样').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.passed == null || $scope.passed == undefined || $scope.passed == "") {
            $(".tishi").text('请确认密码').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $http({
                method: 'GET',
                url: 'regist/paypwd',
                params: {
                    "tel": $scope.tel,
                    "paypwd": $scope.passed,
                    "weichar": "A"
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                window.location.href = 'http://91qhkh.com/wx/index.html#!/finish';
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    }
})  