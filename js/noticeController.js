app.controller('noticeCity', function($scope) {
    $scope.title = "用户协议";
    $scope.$emit('title', $scope.title);
})