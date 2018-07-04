app.controller('finishCity', function($scope, $http, closeWindow) {

    $scope.title = "开户成功";
    $scope.$emit('title', $scope.title);
    $scope.fine = true;
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

    closeWindow.getData($scope.str, $scope.times, test).then(function(data) {})


    $scope.finexd = function(value) {
        $scope.fine = value;
    }

    $scope.fanhui = function() {
        wx.closeWindow();
    }

})