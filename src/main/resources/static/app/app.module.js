angular.module('App', ['ui.router', 'ui.materialize', 'selectize', 'angularUtils.directives.dirPagination', 'validation', 'validation.rule','ngStorage'])
.run(myFunction)
.factory('AuthService', function($http, $q, $rootScope){

    return {
        loggedUser:loggedUser
    };

    function loggedUser(){
        var defer = $q.defer();
        $http.get("/user/loggeduser").success(function (response) {
            defer.resolve(response);
        }, function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    }

}).directive('restrict', function(AuthService, $rootScope, $filter){
    return{
        restrict: 'A',
        priority: 100000,
        scope: false,
        compile:  function(element, attr, linker){
            var accessDenied = true;
            var user = $rootScope.user;
            if(user){
                var attributes = attr.access.split(" ");
                angular.forEach(attributes, function(attribute){
                    if($filter('filter')(user.role.privileges, attribute).length > 0){
                        accessDenied = false;
                    }
                });

                if(accessDenied){
                    element.children().remove();
                    element.remove();
                }
            }

            return function linkFn() {

            }
        }
    }
}).directive('fileread', function () {
    //https://stackoverflow.com/questions/17063000/ng-model-for-input-type-file?answertab=votes#tab-top
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
});

myFunction.$inject = ['$rootScope', 'AuthService'];
function myFunction($rootScope, AuthService) {
    $rootScope.user = undefined;
    AuthService.loggedUser().then(function(res){
        $rootScope.user = res;
    }, function(errRes){

    });
}
