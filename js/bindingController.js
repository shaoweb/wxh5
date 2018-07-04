app.controller('bindingCity', function($scope,$http) {

    $scope.title = "绑定";
    $scope.$emit('title', $scope.title);

    $scope.eyes = true;
    $scope.eye = function () {
        $scope.eyes = !$scope.eyes
    };

    $scope.bindingNow = false;
    $scope.bindingOk = function () {
        wx.closeWindow()
    };
    $scope.save = function () {
        if($scope.act == null || $scope.psd == null){
            $(".tishi").text('账户或密码输入错误').fadeIn(300).delay(3000).fadeOut(300);
        }else {

            $http({
                method: 'GET',
                url: 'regist/bind',
                params: {
                    "userName":$scope.act,
                    "password":$scope.psd
                }
            }).then(function successCallback(response) {
                $scope.date = response.data;
                if ($scope.date.result == 1) {
                    $scope.bindingNow = true;
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });


        }
    }


    //波浪效果
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.parentNode.offsetWidth/4;
    // 这里/4是为了消除锯齿，canvas会合并临近像素
    canvas.height = canvas.parentNode.offsetHeight/4;
    //setTimeout时间
    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    // 波浪大小
    var boHeight = canvas.height / 10;
    var posHeight = canvas.height / 1.1;
    //初始角度为0
    var step = 0;
    //定义三条不同波浪的颜色
    var lines = ["rgba(255,255,255, 0.2)",
        "rgba(255,255,255, 0.6)",
        "rgba(255,255,255, 1)"];
    function loop(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        step++;
        //画3个不同颜色的矩形
        for(var j = lines.length - 1; j >= 0; j--) {
            ctx.fillStyle = lines[j];
            //每个矩形的角度都不同，每个之间相差45度
            var angle = (step+j*60)*Math.PI/180;
            var deltaHeight = Math.sin(angle) * boHeight;
            var deltaHeightRight = Math.cos(angle) * boHeight;
            ctx.beginPath();
            ctx.moveTo(0, posHeight+deltaHeight);
            ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width/2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, posHeight+deltaHeight);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimFrame(loop);
    }
    loop();

});
