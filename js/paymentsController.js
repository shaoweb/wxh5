app.controller('paymentsCity', function($scope, $http, $filter) {

    $scope.title = "出金申请处理";
    $scope.$emit('title', $scope.title);

    $scope.data = {
        current: "1" 
    };
    $scope.actions =
        {
        setCurrent: function (param) {
            $scope.data.current = param;
        }
    }
})
