/**
 * Created by juliusneria on 31/05/2018.
 */
angular.module('App').controller('IndexController', IndexController);

IndexController.$inject = ['$scope','$filter', '$rootScope','$state'];

function IndexController($scope,$filter,$rootScope,$state) {
    $scope.stateName = '';
    $scope.access = function(access){
       $scope.stateName = $state.$current.name;
        var accessDenied = true;
        var user = $rootScope.user;
        if(user){
            var attributes = access.split(" ");
            angular.forEach(attributes, function(attribute){
                if($filter('filter')(user.role.privileges, attribute).length > 0){
                    accessDenied = false;
                }
            });
        }
        return accessDenied
    }
}