angular.module('App').factory('RoleService', ['$http', '$q',
    function ($http, $q) {
        /*var successResponse = function (response) {
            defer.resolve(response);
        };
        var errorResponse = function (response) {
            defer.resolve(response);
        };*/

        return {
            findOne: findOne,
            findAll: findAll,
            loadRoles: loadRoles,
            createRole: createRole,
            updateRole: updateRole,
            deleteById: deleteById,
            getTabs: getTabs
        };

        function createRole(JSONObject) {
            var defer = $q.defer();
            $http.post('/role/createRole', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function updateRole(JSONObject) {
            var defer = $q.defer();
            $http.put('/role/updateRole', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function deleteById(id) {
            var defer = $q.defer();
            $http.delete('/role/deleteRole/' + id).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findOne(baseUrl, payload) {
            var url = baseUrl.concat(payload);
            var defer = $q.defer();
            $http.get(url).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findAll() {
            var defer = $q.defer();
            $http.get('/role/findRoles/').then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadRoles(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/role/loadRoles/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getTabs() {
            var defer = $q.defer();
            $http.get('/libs/tabs.json').then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);
