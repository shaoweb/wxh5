app.controller('setPasswordCity', function($scope, $http, $filter) {

    $scope.title = "密码设置";
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
