/**
 * Created by juliusneria on 06/06/2018.
 */
angular.module('App').factory('FileUploadService', ['$http', '$q',
    function ($http, $q) {

        return {
            uploadFile: uploadFile,
            uploadProductImage: uploadProductImage,
            downloadFile: downloadFile
        };

        function uploadProductImage(JSONObject) {
            var defer = $q.defer();
            $http.post('/file/uploadProductImage', JSONObject, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function uploadFile(JSONObject) {
            var defer = $q.defer();
            $http.post('/file/uploadFile', JSONObject, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function downloadFile(fileName) {
            var defer = $q.defer();
            $http.get('/file/downloadFile/'+fileName).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);