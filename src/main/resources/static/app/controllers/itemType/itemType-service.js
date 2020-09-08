angular.module('App').factory('ItemTypeService', ['$http', '$q',
    function ($http, $q) {

        return {
            findAll: findAll,
            loadItemType: loadItemType,
            createItemType: createItemType,
            updateItemType: updateItemType,
            deleteByItemType: deleteByItemType
        };

        function createItemType(JSONObject) {
            var defer = $q.defer();
            $http.post('/itemType/createItemType', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function updateItemType(JSONObject) {
            var defer = $q.defer();
            $http.put('/itemType/updateItemType', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function deleteByItemType(id) {
            var defer = $q.defer();
            $http.delete('/itemType/deleteItemType/' + id).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findAll() {
            var defer = $q.defer();
            $http.get('/itemType/findAll/').then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadItemType(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/itemType/loadItemType/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);
