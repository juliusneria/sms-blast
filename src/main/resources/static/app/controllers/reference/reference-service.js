/**
 * Created by juliusneria on 29/05/2018.
 */
angular.module('App').factory('ReferenceService', ['$http', '$q',
    function ($http, $q) {

        return {
            findAll: findAll,
            findByCategory: findByCategory,
            loadReferences: loadReferences,
            createReference: createReference,
            updateReference: updateReference,
            deleteById: deleteById
        };

        function createReference(JSONObject) {
            var defer = $q.defer();
            $http.post('/reference/createReference', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function updateReference(JSONObject) {
            var defer = $q.defer();
            $http.put('/reference/updateReference', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function deleteById(id) {
            var defer = $q.defer();
            $http.delete('/reference/deleteReference/' + id).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findAll() {
            var defer = $q.defer();
            $http.get('/reference/findAll/').then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findByCategory(category) {
            var defer = $q.defer();
            $http.get('/reference/findAll/'+category).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadReferences(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/reference/loadReferences/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);
