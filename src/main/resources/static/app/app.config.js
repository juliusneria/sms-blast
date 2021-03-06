angular.module('App').config(configure);
configure.$inject = ['$stateProvider', '$urlRouterProvider', '$validationProvider'];
function configure($stateProvider, $urlRouterProvider, $validationProvider) {

    $stateProvider
        .state('user', {
            url: '/user',
            templateUrl: 'app/controllers/user/user.html',
            controller: 'UserController'
        }).state('messages', {
            url: '/messages',
            templateUrl: 'app/controllers/messages/messages.html',
            controller: 'MessagesController'
        }).state('receivers', {
            url: '/receivers',
            templateUrl: 'app/controllers/receivers/receivers.html',
            controller: 'ReceiversController'
        }).state('home', {
            url: '/home',
            templateUrl: 'app/controllers/dashboard/dashboard.html',
            controller: 'DashboardController'
        });

    $urlRouterProvider.otherwise("/home");

    $validationProvider.setExpression({
        isValidEmail: function (value, scope, element, attrs){
            return validateEmail(value);
        },noEmptyWhiteSpace: function (value, scope, element, attrs){
            return !isNullOrWhitespace(value);
        },maximumLength: function (value, scope, element, attrs){
            if(value){
                return value.length <= parseInt(attrs.max);
            } else {
                return false;
            }
        },minimumLength: function (value, scope, element, attrs){
            if(value){
                return value.length >= parseInt(attrs.min);
            } else {
                return false;
            }
        },isOptional: function (value, scope, element, attrs){
            return true;
        }
    }).setDefaultMsg({
        isValidEmail: {
            error: function(value, scope){
                return errorMessage(scope.name + ' is not valid');
            }
        },noEmptyWhiteSpace: {
            error: function(value, scope){
                return errorMessage(scope.name + ' must not be empty');
            }
        },maximumLength: {
            error: function(value, scope){
                return errorMessage(scope.name + ' reached the maximum number of characters' );
            }
        },minimumLength: {
            error: function(value, scope){
                return errorMessage(scope.name + ' should atleast be ' + scope.min + ' characters');
            }
        },isOptional: {
            error: function(value, scope){
                return errorMessage(scope.name + ' should atleast be ' + scope.min + ' characters');
            }
        }
    });


    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;
        return input.toString().replace(/\s/g, '').length < 1;
    }
    function errorMessage(msg) {
        return '<p class="invalid" style="color: red;">' + msg + '</p>'
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}