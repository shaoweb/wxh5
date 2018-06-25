app.controller('informationCity', function($scope, $http) {

    $scope.title = "个人信息";
    $scope.$emit('title', $scope.title);
    $scope.tel = window.name;

    //职业
    var mobileSelect1 = new MobileSelect({
        trigger: '#trigger1',
        title: '',
        wheels: [{
            data: [
                '国家机关、党群组织、企业、事业单位负责人',
                '专业技术人员',
                '办事人员和有关人员',
                '商业、服务业人员',
                '农、林、牧、渔、水利业生产人员',
                '生产、运输设备操作人员及有关人员',
                '军人及现服役人员',
                '金融、经济业务人员',
                '个体工商户、私营企业主',
                '科学研究人员',
                '法律专业人员',
                '教学人员、体育工作、新闻出版工作人员',
                '安全保卫和消防人员',
                '邮政和电信业务人员',
                '离退休人员',
                '专业投资者'
            ]
        }],
        position: [2], //初始化定位
        callback: function(indexArr, data) {
            $scope.$apply(function() { $scope.profession = data[0]; })
        }
    });

    //学历
    var mobileSelect2 = new MobileSelect({
        trigger: '#trigger2',
        title: '',
        wheels: [
            { data: ['博士', '硕士', '学士', '大专', '中专', '高中', '初中及其以下', '其他'] }
        ],
        position: [2], //初始化定位
        callback: function(indexArr, data) {
            $scope.$apply(function() { $scope.culture = data[0]; })
        }
    });

    //有无中间人介绍
    var mobileSelect3 = new MobileSelect({
        trigger: '#trigger3',
        title: '',
        wheels: [
            { data: ['无介绍人', '有介绍人'] }
        ],
        position: [0], //初始化定位
        callback: function(indexArr, data) {
            $scope.$apply(function() { $scope.renne = data[0]; })
        }
    });

    var area1 = new LArea();
    area1.init({
        'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value1', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });

    $scope.hrefed = function() {
        if ($scope.region == undefined) {
            $(".tishi").text('请选择所在省市').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.address == undefined) {
            $(".tishi").text('请输入有效联系地址').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.email == undefined) {
            $(".tishi").text('请输入有效的电子邮箱').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.postcode == undefined) {
            $(".tishi").text('请输入有效的邮编地址').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.profession == undefined) {
            $(".tishi").text('请选择职业').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.culture == undefined) {
            $(".tishi").text('请选择学历').fadeIn(300).delay(3000).fadeOut(300);
        } else if ($scope.renne == undefined) {
            $(".tishi").text('请选择是否有中间人').fadeIn(300).delay(3000).fadeOut(300);
        } else {
            //判断是否有介绍人
            if ($scope.renne == "无介绍人") {
                $scope.renne = 0;
            } else {
                $scope.renne = 1;
            }
            $http({
                method: 'GET',
                url: 'regist/check',
                params: {
                    "tel": $scope.tel,
                    "address": $scope.region + "," + $scope.address,
                    "email": $scope.email,
                    "zipCode": $scope.postcode,
                    "career": $scope.profession,
                    "education": $scope.culture,
                    "middleman": $scope.renne,
                }
            }).then(function successCallback(response) {
                $scope.date = response.data.result;
                console.log($scope.date);
                if ($scope.date == 1) {
                    window.location.href = 'http://91qhkh.com/wx/index.html#!/bankaccount';
                } else {
                    $(".tishi").text('信息填写错误').fadeIn(300).delay(3000).fadeOut(300);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    }
})