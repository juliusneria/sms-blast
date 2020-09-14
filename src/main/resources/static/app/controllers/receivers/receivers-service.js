angular.module('App').factory('ReceiversService', ['$http', '$q',
    function ($http, $q) {
        return {
            searchByMobileNo: searchByMobileNo,
            saveReceiver: saveReceiver,
            updateReceiver: updateReceiver
        };

        function searchByMobileNo(mobileNo) {
            var defer = $q.defer();
            $http.get('/receiver/'+mobileNo).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function saveReceiver(JSONObject) {
            var defer = $q.defer();
            $http.post('/receiver/saveReceiver/', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function updateReceiver(JSONObject) {
            var defer = $q.defer();
            $http.put('/receiver/updateReceiver/', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
    }]);
