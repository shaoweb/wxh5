app.controller('invitecodeCity', function($scope, $http, onMenuShareAppMessage, onMenuShareQQ) {

    $scope.title = "邀请码";
    $scope.$emit('title', $scope.title);




    $http({
        method: 'GET',
        url: 'user/invicat'
    }).then(function successCallback(response) {
        $scope.date = response.data;
    }, function errorCallback(response) {
        // 失败
    });

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

    onMenuShareAppMessage.getData($scope.str, $scope.times, test).then(function(data) {});
    onMenuShareQQ.getData($scope.str, $scope.times, test).then(function(data) {});

    //分享给朋友
    wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    //分享给QQ
    wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

})