// Creation time:2018-4-24

//Principal:Brave.shao

//Describe
app.controller('bankaccountCity', function($scope, $http) {

    $scope.title = "银行账户";
    $scope.$emit('title', $scope.title);
    $scope.tel = window.name;
    //正则去空格
    function removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }
    $scope.bankCheck = function() {
        if ($scope.name == null || $scope.name == undefined) {
            $(".tishi").text('请输入姓名').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.idNo == null || $scope.idNo == undefined) {
            $(".tishi").text('请输入身份证号').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.cardNo == null || $scope.cardNo == undefined) {
            $(".tishi").text('请输入银行卡号').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.phoneNo == null || $scope.phoneNo == undefined) {
            $(".tishi").text('请输入预留手机号').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $scope.bankid = removeAllSpace($scope.cardNo);
            $http({
                method: 'GET',
                url: 'regist/bankCheck',
                params: {
                    "tel": $scope.tel,
                    "name": $scope.name,
                    "idNo": $scope.idNo,
                    "cardNo": $scope.bankid,
                    "phoneNo": $scope.phoneNo
                }
            }).then(function successCallback(response) {
                $scope.date = response.data;
                if ($scope.date.result == 1) {
                    window.location.href = 'http://91qhkh.com/wx/index.html#!/payment';
                } else if ($scope.date.result == 0) {
                    $(".tishi").text('与原来银行卡号一样').fadeIn(300).delay(3000).fadeOut(300);
                } else if ($scope.date.result == 3) {
                    $(".tishi").text('银行卡信息有误').fadeIn(300).delay(3000).fadeOut(300);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

    }
})