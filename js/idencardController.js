// Creation time:2018-4-24

//Principal:Brave.shao

//Describe

app.controller('idencardCity', function($http, $scope, wxService, wxService2) {

    $scope.title = "身份证验证";
    $scope.$emit('title', $scope.title);
    $scope.staust = false;
    $scope.information = false;
    $scope.arr = [];
    $scope.tel = window.name;
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

    $scope.mation = (value) => {
        $scope.information = value;
    }

    wxService.getData($scope.str, $scope.times, test).then(function(data) {})
    wxService2.getData($scope.str, $scope.times, test).then(function(data) {})


    //相机拍照或从手机相册中选图接口
    $scope.choose = function(url) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                $(url).attr('src', res.localIds);
                wx.uploadImage({
                    localId: String(res.localIds), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function(res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        $scope.arr.push(res.serverId);
                    }
                });
            }
        });
    };

    //上传图片
    $scope.verification = function() {
        if ($scope.arr == null || $scope.arr.length < 1) {
            $(".tishi").text('身份证照片不能为空').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            $scope.staust = true;

            $http({
                method: 'GET',
                url: '/wx/regist/savePhoto',
                params: {
                    "tel": $scope.tel,
                    "mediaId": $scope.arr[0],
                    "mediaId2": $scope.arr[1]
                }
            }).then(function successCallback(response) {
                if (response.data == null || response.data == "") {
                    $scope.staust = false;
                    $(".tishi").text('身份证不规范').fadeIn(300).delay(3000).fadeOut(300);
                } else {
                    $scope.arr = [];
                    $scope.date = response.data.result;
                    $scope.informotion = response.data.data;
                    if ($scope.date == 1) {
                        //跳转页面
                        $scope.staust = false;
                        $scope.information = true;
                    } else if ($scope.date == 3) {
                        $scope.staust = false;
                        $(".tishi").text('身份证不规范').fadeIn(300).delay(3000).fadeOut(300);
                    }
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                $scope.staust = false;
                $(".tishi").text('身份证不规范').fadeIn(300).delay(3000).fadeOut(300);
            });
        }
    };

})