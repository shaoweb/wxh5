 // 支付密码
 app.directive('passForm', function($http) {
         return {
             restrict: 'EA',
                 link: function(scope, ele, attr) {
                 var inputDom = angular.element(ele[0].querySelector('.Jpass3')); //密码框 
                 var spanDoms = ele.find('span'); //光标span 
                 var faguang = angular.element(ele[0].querySelector('.Jfaguang3')); //发光外框 
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
                                 scope.spead = false;
                                 console.log(scope.spead);
                                 scope.passes = '';
                                 spanDoms.find('i').css({ backgroundColor: 'transparent' });
                                 spanDoms.removeClass('active').eq(0).addClass('active');
                                 faguang.css({ left: '0' });
                             }       
                         } else { 
                             this.value = this.value.replace(/\D/g, '');
                         }        
                     }
                 });    
             }   
         }
     })
     .controller('spendingCity', function($scope,$http) {

         $scope.title = "出金申请";
         $scope.$emit('title', $scope.title);
         $scope.result = false;
         $scope.spead = false;
         $scope.tagge = false;
         $scope.passes = "";
         $scope.imgsrc = "images/lan.png";

         $scope.tagglse = function(value) {
             $scope.tagge = value;
             if (value !== false) {
                 $scope.imgsrc = "images/lan.png";
                 $('.input').attr('type', 'text');
             } else {
                 $scope.imgsrc = "images/hei.png";
                 $('.input').attr('type', 'password');
             }
         };

         $scope.tagespan = function(value) {
             $scope.spead = value;
             if (value) {
                 console.log(value);
                 $http({
                     method: 'GET',
                     url: 'order/newwithdraw',
                     params: {
                         "amount":$scope.mongy
                     }
                 }).then(function successCallback(response) {
                     $scope.date = response.data;
                     if ($scope.date.result == 1) {
                         $(".tishi").text('充值成功').fadeIn(300).delay(3000).fadeOut(300);
                     }
                 }, function errorCallback(response) {
                     // 相对路径跳过期页
                     window.location.href = "#!/overdue";
                 });


             } else {
                 var spanDoms = $('.pass-border-box').find('span');
                 $scope.pass = '';
                 spanDoms.find('i').css({ backgroundColor: 'transparent' });
                 spanDoms.removeClass('active').eq(0).addClass('active');
                 var faguang = angular.element($('.pass-border-box')[0].querySelector('.Jfaguang3'));
                 faguang.css({ left: '0' });
             }
         }
         $scope.change = function(value) {
             $scope.result = value;
         }

         //支付密码展示
         $scope.staste = function(value) {
             if (value) {
                 $('.img').attr('src', 'images/biyan.png');
                 for (var i = 0; i < $scope.passes.length; i++) {
                     $(".pass-border-box>span").children().css("background", "#fff");
                     $(".pass-border-box>span").children().css("margin-top", "");
                     $(".pass-border-box>span").eq(i).children().text($scope.passes[i]);
                 }
             } else {
                 $('.img').attr('src', 'images/yanjing.png');
                 for (var i = 0; i < $scope.passes.length; i++) {
                     $(".pass-border-box>span").children().css("background", "#418fde");
                     $(".pass-border-box>span").eq(i).children().empty();
                 }
             }
         };
     })