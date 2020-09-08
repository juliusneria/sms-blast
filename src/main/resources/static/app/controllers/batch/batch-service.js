/**
 * Created by juliusneria on 06/06/2018.
 */
angular.module('App').factory('BatchService', ['$http', '$q',
    function ($http, $q) {

        return {
            createBatch: createBatch,
            loadBatches: loadBatches
        };

        function createBatch(JSONObject) {
            var defer = $q.defer();
            $http.post('/batch/createBatch', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadBatches(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/batch/loadBatches/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);