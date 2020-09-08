/**
 * Created by juliusneria on 14/06/2018.
 */
angular
    .module('App')
    .directive('selectDate', selectDate);
function selectDate(){
    return {
        restrict: 'AE', //attribute or element
        scope: {
            date: '='
        },
        templateUrl: 'app/directives/dateDirective/date.html',
        replace: true,
        link: function($scope, elem, attr, ctrl) {
            $scope.limit = 80;
            $scope.currentTime = new Date();
            $scope.minDate = (new Date(1900 + $scope.currentTime.getYear() - $scope.limit, 1, 1)).toISOString();
            $scope.maxDate = $scope.currentTime.toISOString();
            console.debug($scope);
        }
    };
}