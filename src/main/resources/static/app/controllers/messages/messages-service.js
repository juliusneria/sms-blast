angular.module('App').factory('MessagesService', ['$http', '$q',
    function ($http, $q) {
        return {
            saveMessage: saveMessage,
            sendBulkViberMessage: sendBulkViberMessage,
            sendBulkWhatsappMessage: sendBulkWhatsappMessage,
            sendBulkSms: sendBulkSms,
            sendSingleViberMessage: sendSingleViberMessage,
            sendSingleWhatsappMessage: sendSingleWhatsappMessage,
            sendSingleSms: sendSingleSms,
        };

        function saveMessage(JSONObject) {
            var defer = $q.defer();
            $http.post('/message/saveMessage/', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendBulkViberMessage(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendViber/sendByBulk', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendBulkWhatsappMessage(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendWhatsapp/sendByBulk', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendBulkSms(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendSms/sendByBulk', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendSingleViberMessage(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendViber/sendByIndividual', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendSingleWhatsappMessage(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendWhatsapp/sendByIndividual', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };

        function sendSingleSms(JSONObject) {
            var defer = $q.defer();
            $http.post('/sendSms/sendByIndividual', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
    }]);
