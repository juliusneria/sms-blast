/**
 * Created by juliusneria on 29/05/2018.
 */
angular.module('App').factory('ProductService', ['$http', '$q',
    function ($http, $q) {

        return {
            findAll: findAll,
            createProduct: createProduct,
            updateProduct: updateProduct,
            loadProducts: loadProducts
        };

        function createProduct(JSONObject) {
            var defer = $q.defer();
            $http.post('/product/createProduct', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function updateProduct(JSONObject) {
            var defer = $q.defer();
            $http.put('/product/updateProduct', JSONObject).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function findAll() {
            var defer = $q.defer();
            $http.get('/product/loadAllProducts/').then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function loadProducts(page,sort,search,isSort) {
            var defer = $q.defer();
            $http.get('/product/loadProducts/'+page+'/'+sort+'/'+search+'/'+isSort).then(function (response) {
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }
    }]);
