/**
 * Created by juliusneria on 14/06/2018.
 */
angular
    .module('App')
    .directive('createUpdateProduct', createUpdateProduct);
function createUpdateProduct(){
    return {
        restrict: 'AE', //attribute or element
        scope: {
            product: '=',
            imgSrc: '=',
            itemType: '=',
            itemTypes: '=',
            brands: '=',
            isItemTypeError: '=',
            isBrandError: '=',
            fileUpload: '='
        },
        templateUrl: 'app/directives/productDirective/product.html',
        controller: 'ProductDetailController'
    };
}