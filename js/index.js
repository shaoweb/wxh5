// Creation time:2018-4-24

//Principal:Brave.shao

//Describe

var app = angular.module('indexCity', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/virtual', { templateUrl: 'content/virtual.html', controller: "virtualCity", title: "虚拟开户" }) //虚拟开户
            .when('/register', { templateUrl: 'content/register.html', controller: "registerCity", title: "注册开户" }) //注册开户
            .when('/idencard', { templateUrl: 'content/idencard.html', controller: "idencardCity", title: "身份证验证" }) //身份证验证
            .when('/bankaccount', { templateUrl: 'content/bankAccount.html', controller: "bankaccountCity", title: "银行账户" }) //银行账户
            .when('/payment', { templateUrl: 'content/payment.html', controller: "paymentCity", title: "设置支付密码" }) //设置支付密码
            .when('/finish', { templateUrl: 'content/finish.html', controller: "finishCity", title: "开户成功" }) //开户成功
            .when('/mine', { templateUrl: 'content/personalCenter/mine.html', controller: "mineCity", title: "总资产" }) //总资产
            .when('/detail', { templateUrl: 'content/personalCenter/detail.html', controller: "detailCity", title: "资金明细" }) //资金明细
            .when('/apply', { templateUrl: 'content/personalCenter/apply.html', controller: "applyCity", title: "出金申请处理" }) //出金申请处理
            .when('/notice', { templateUrl: 'content/notice.html', controller: "noticeCity", title: "用户协议" }) //用户协议
            .when('/information', { templateUrl: 'content/information.html', controller: "informationCity", title: "个人信息" }) //个人信息
            .when('/invitecode', { templateUrl: 'content/invitecode.html', controller: "invitecodeCity", title: "邀请码" }) //邀请码
            .when('/spending', { templateUrl: 'content/spending.html', controller: "spendingCity", title: "出金申请" }) //出金申请
            .when('/entryGold', { templateUrl: 'content/personalCenter/entryGold.html', controller: "entryGoldCity", title: "入金申请" }) //入金申请
            .when('/payments', { templateUrl: 'content/personalCenter/payments.html', controller: "paymentsCity", title: "支付方式" }) //支付方式
            .when('/setAccount', { templateUrl: 'content/personalCenter/setAccount.html', controller: "setAccountCity", title: "账户设置" }) //账户设置
            .when('/setPerson', { templateUrl: 'content/personalCenter/setPerson.html', controller: "setPersonCity", title: "个人设置" }) //个人设置
            .when('/replaceTel', { templateUrl: 'content/personalCenter/replaceTel.html', controller: "replaceTelCity", title: "更换手机号" }) //更换手机号
            .when('/setAccountCard', { templateUrl: 'content/personalCenter/setAccountCard.html', controller: "setAccountCardCity", title: "更换银行卡" }) //更换银行卡
            .when('/setPassword', { templateUrl: 'content/personalCenter/setPassword.html', controller: "setPasswordCity", title: "密码设置" }) //密码设置
            .otherwise({ redirectTo: '/register', title: '注册开户' });
    }])
    // 支付密码第一次
    .directive('passForm', function($http) {
        return {
            restrict: 'EA',
                link: function(scope, ele, attr) {
                var inputDom = angular.element(ele[0].querySelector('.Jpass')); //密码框 
                var spanDoms = ele.find('span'); //光标span 
                var faguang = angular.element(ele[0].querySelector('.Jfaguang')); //发光外框 
                var that = this;
                inputDom.on('focus blur keyup', function(e) {
                    e = e ? e : window.event;
                    e.stopPropagation();
                    if (e.type === 'focus') {
                        var _currFocusInputLen = this.value.length === 6 ? 5 : this.value.length;
                        spanDoms.eq(_currFocusInputLen).addClass('active');
                        faguang.css({ left: _currFocusInputLen * 16.666 + '%', opacity: 1 });
                    } else if (e.type === 'blur') {
                        var _currBlurInputLen = this.value.length;
                        spanDoms.eq(_currBlurInputLen).removeClass('active');
                        faguang.css({ opacity: 0 });
                    } else if (e.type === 'keyup') {
                        //键盘上的数字键按下才可以输入 
                        if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {  
                            var curInputLen = this.value.length; //输入的文本内容长度 
                            for (var j = 0; j < 6; j++) {
                                spanDoms.eq(j).removeClass('active');   
                                spanDoms.eq(curInputLen).addClass('active');
                                spanDoms.eq(curInputLen - 1).next().find('i').css({ backgroundColor: 'transparent' });
                                spanDoms.eq(curInputLen - 1).find('i').css({ backgroundColor: '#418fde' });
                                faguang.css({  left: curInputLen * 16.666 + '%' });
                            }        
                            if (curInputLen === 0) {
                                spanDoms.find('i').css({ backgroundColor: 'transparent' }); 
                            }        
                            if (curInputLen === 6) {
                                spanDoms.eq(5).addClass('active');
                                faguang.css({ left: '83.333%' }); //直接发起密码验证
                                $("#one").css("display", "none");
                                $("#two").css("display", "block");
                            }       
                        } else { 
                            this.value = this.value.replace(/\D/g, '');
                        }        
                    }
                });    
            }   
        }
    })
    // 支付密码第二次
    .directive('passForm', function($http) {
        return {
            restrict: 'EA',
                link: function(scope, ele, attr) {
                var inputDom = angular.element(ele[0].querySelector('.Jpass2')); //密码框 
                var spanDoms = ele.find('span'); //光标span 
                var faguang = angular.element(ele[0].querySelector('.Jfaguang2')); //发光外框 
                var that = this;
                inputDom.on('focus blur keyup', function(e) {
                    e = e ? e : window.event;
                    e.stopPropagation();
                    if (e.type === 'focus') {
                        var _currFocusInputLen = this.value.length === 6 ? 5 : this.value.length;
                        spanDoms.eq(_currFocusInputLen).addClass('active');
                        faguang.css({ left: _currFocusInputLen * 16.666 + '%', opacity: 1 });
                    } else if (e.type === 'blur') {
                        var _currBlurInputLen = this.value.length;
                        spanDoms.eq(_currBlurInputLen).removeClass('active');
                        faguang.css({ opacity: 0 });
                    } else if (e.type === 'keyup') {
                        //键盘上的数字键按下才可以输入 
                        if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {  
                            var curInputLen = this.value.length; //输入的文本内容长度 
                            for (var j = 0; j < 6; j++) {
                                spanDoms.eq(j).removeClass('active');   
                                spanDoms.eq(curInputLen).addClass('active');
                                spanDoms.eq(curInputLen - 1).next().find('i').css({ backgroundColor: 'transparent' });
                                spanDoms.eq(curInputLen - 1).find('i').css({ backgroundColor: '#418fde' });
                                faguang.css({  left: curInputLen * 16.666 + '%' });
                            }        
                            if (curInputLen === 0) {
                                spanDoms.find('i').css({ backgroundColor: 'transparent' }); 
                            }        
                            if (curInputLen === 6) {
                                spanDoms.eq(5).addClass('active');
                                faguang.css({ left: '83.333%' }); //直接发起密码验证
                            }       
                        } else { 
                            this.value = this.value.replace(/\D/g, '');
                        }        
                    }
                });    
            }   
        }
    }) //图像接口
    .factory("wxService", function($http) {
        return {
            getData: function(str, times, test) {
                return $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: 'wechat/jsapiTicket',
                    data: {
                        "noncestr": str,
                        "timestamp": times,
                        "url": test
                    },
                    success: function(resp) {
                        return wx.config({
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx77090dfab89283a1",
                            // 必填，公众号的唯一标识
                            timestamp: times,
                            // 必填，生成签名的时间戳
                            nonceStr: str,
                            // 必填，生成签名的随机串
                            signature: resp.signature,
                            // 必填，签名
                            jsApiList: [
                                    "chooseImage"
                                ] // 必填，需要使用的JS接口列表
                        });
                        wx.error(function(res) {});
                    },
                    error: function(data) {}
                });
            }
        }
    }) //上传图片
    .factory("wxService2", function($http) {
        return {
            getData: function(str, times, test) {
                return $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: 'wechat/jsapiTicket',
                    data: {
                        "noncestr": str,
                        "timestamp": times,
                        "url": test
                    },
                    success: function(resp) {
                        return wx.config({
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx77090dfab89283a1",
                            // 必填，公众号的唯一标识
                            timestamp: times,
                            // 必填，生成签名的时间戳
                            nonceStr: str,
                            // 必填，生成签名的随机串
                            signature: resp.signature,
                            // 必填，签名
                            jsApiList: [
                                    "uploadImage"
                                ] // 必填，需要使用的JS接口列表
                        });
                        wx.error(function(res) {});
                    },
                    error: function(data) {}
                });
            }
        }
    }) //返回微信首页
    .factory("closeWindow", function($http) {
        return {
            getData: function(str, times, test) {
                return $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: 'wechat/jsapiTicket',
                    data: {
                        "noncestr": str,
                        "timestamp": times,
                        "url": test
                    },
                    success: function(resp) {
                        return wx.config({
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx77090dfab89283a1",
                            // 必填，公众号的唯一标识
                            timestamp: times,
                            // 必填，生成签名的时间戳
                            nonceStr: str,
                            // 必填，生成签名的随机串
                            signature: resp.signature,
                            // 必填，签名
                            jsApiList: [
                                    "closeWindow"
                                ] // 必填，需要使用的JS接口列表
                        });
                        wx.error(function(res) {});
                    },
                    error: function(data) {}
                });
            }
        }
    }) //分享给朋友  
    .factory("onMenuShareAppMessage", function($http) {
        return {
            getData: function(str, times, test) {
                return $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: 'wechat/jsapiTicket',
                    data: {
                        "noncestr": str,
                        "timestamp": times,
                        "url": test
                    },
                    success: function(resp) {
                        return wx.config({
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx77090dfab89283a1",
                            // 必填，公众号的唯一标识
                            timestamp: times,
                            // 必填，生成签名的时间戳
                            nonceStr: str,
                            // 必填，生成签名的随机串
                            signature: resp.signature,
                            // 必填，签名
                            jsApiList: [
                                    "onMenuShareAppMessage"
                                ] // 必填，需要使用的JS接口列表
                        });
                        wx.error(function(res) {});
                    },
                    error: function(data) {}
                });
            }
        }
    }) //分享给QQ
    .factory("onMenuShareQQ", function($http) {
        return {
            getData: function(str, times, test) {
                return $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: 'wechat/jsapiTicket',
                    data: {
                        "noncestr": str,
                        "timestamp": times,
                        "url": test
                    },
                    success: function(resp) {
                        return wx.config({
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: "wx77090dfab89283a1",
                            // 必填，公众号的唯一标识
                            timestamp: times,
                            // 必填，生成签名的时间戳
                            nonceStr: str,
                            // 必填，生成签名的随机串
                            signature: resp.signature,
                            // 必填，签名
                            jsApiList: [
                                    "onMenuShareQQ"
                                ] // 必填，需要使用的JS接口列表
                        });
                        wx.error(function(res) {});
                    },
                    error: function(data) {}
                });
            }
        }
    })
    .controller('mainCity', function($scope) {
        $scope.$on('title', function(event, data) {
            $scope.$watch("titile", function() {
                $scope.title = data;
            })
        });
    });