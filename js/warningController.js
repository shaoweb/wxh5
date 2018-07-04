app.controller('warningCity', function($scope) {

    $scope.title = "提示";
    $scope.$emit('title', $scope.title);


    $scope.warningOk = function () {
        wx.closeWindow()
    };

});
