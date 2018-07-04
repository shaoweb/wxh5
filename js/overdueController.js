app.controller('overdueCity', function($scope) {

    $scope.title = "过期";
    $scope.$emit('title', $scope.title);

    $scope.ok = function () {
        wx.closeWindow();
    }

});
