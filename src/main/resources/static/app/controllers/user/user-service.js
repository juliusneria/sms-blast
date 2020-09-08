angular.module('App').factory('UserService', ['$http', '$q',
    function ($http, $q) {

        return {
            loadUsers: loadUsers,
            findAll: findAll,
            createUser: createUser,
            updateUser: updateUser
        };

        function createUser(JSONObject) {
            var defer = $q.defer();
            $http.post('/user/createUser/', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function updateUser(JSONObject) {
            var defer = $q.defer();
            $http.put('/user/updateUser/', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadUsers(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/user/loadUsers/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findAll(page) {
            var defer = $q.defer();
            $http.get('/user/findUsers/'+page).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);
