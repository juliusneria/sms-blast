/**
 * Created by juliusneria on 14/06/2018.
 */
angular.module('App').controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['$scope', 'ItemTypeService', 'ReferenceService', '$filter'];
function ProductDetailController($scope, ItemTypeService, ReferenceService, $filter) {
    $scope.itemTypes = [];
    $scope.brands = [];
    $scope.itemType = {};
    $scope.products = [];
    $scope.product = {
        itemType:{},
        brand:{}
    };
    $scope.isBrandError = false;
    $scope.isItemTypeError = false;

    $scope.itemTypeConfig = {
        valueField: 'id',
        labelField: 'itemTypeName',
        searchField: ['itemTypeName'],
        placeholder: 'Select Item Type',
        maxItems:1
    };

    $scope.brandConfig = {
        valueField: 'id',
        labelField: 'value',
        searchField: ['value'],
        placeholder: 'Select Brand',
        maxItems:1
    };

    ItemTypeService.findAll().then(function(resItemType){
        ReferenceService.findByCategory('BRAND').then(function(resReference){
            $scope.itemTypes = resItemType.data;
            $scope.brands = resReference.data;
        }, function(resErr){

        });
    }, function(resErr){

    });

    $scope.$watch('product.image.fileName', function(newValue){
        $scope.imgSrc = newValue ? '/file/downloadFile/'+newValue : null;
    });

    $scope.$watch('product.id', function(newValue){
        if(!newValue){
            $scope.itemType = {};
            $scope.brand = {};
        }
    });

    $scope.$watch('product.itemType.id', function(newValue){
        if(newValue !== undefined && newValue.toString().length > 0){
            $scope.itemType = $filter('filter')($scope.itemTypes, {'id':parseInt(newValue)})[0];
            $scope.isItemTypeError = false;
            $scope.isLocked = false;
        }
    });

    $scope.$watch('product.brand.id', function(newValue){
        if(newValue !== undefined && newValue.toString().length > 0){
            $scope.isBrandError = false;
        }
    });

    $scope.$watch('fileUpload', function(newValue){
        var reader  = new FileReader();
        var preview = document.getElementById('productimg');
        var file    = document.querySelector('input[type=file]').files[0];
        reader.onloadend = function () {
            preview.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
            $scope.imgSrc = preview.src;
        } else {
            $scope.imgSrc = 'asset/images/icon/basic-upload.png';
            preview.src = 'asset/images/icon/basic-upload.png';
        }
    });
}