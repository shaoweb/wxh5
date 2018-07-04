app.controller('paymentsCity', function($scope, $http, $filter) {

    $scope.title = "出金申请处理";
    $scope.$emit('title', $scope.title);

    $(".bark_ul li").click(function() {
        var i = $(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(".cadde").eq(i).show().siblings(".cadde").hide();
    })
    $(".cadul li").click(function() {
        var arr = [];
        $(this).find("span").addClass("select").parent("li").siblings().find("span").removeClass("select");
        $scope.BankCode = $(this).attr("name");
        $scope.Bankname = $(this).attr("date-name");
        arr.push($scope.BankCode, $scope.Bankname, $scope.packtype);
        window.name = arr;
        window.history.back(-1);
    });

})