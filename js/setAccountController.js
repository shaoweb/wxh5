app.controller('setAccountCity', function($scope,$http) {

    $scope.title = "账户设置";
    $scope.$emit('title', $scope.title);


    $http({
        method:'GET',
        url:'user/personal'
    }).then(function successCallback(response) {
        $scope.accountNomber = response.data.bankid;
    }, function errorCallback(response) {

    });

    $scope.changeCard = function () {
        window.location.href = "#!/setAccountCard"
    }
})
