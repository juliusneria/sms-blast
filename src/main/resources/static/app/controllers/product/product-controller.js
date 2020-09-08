/**
 * Created by juliusneria on 29/05/2018.
 */
angular.module('App').controller('ProductController', ProductController);

ProductController.$inject = ['$scope', 'ProductService', 'FileUploadService', '$injector', '$filter'];
function ProductController($scope, ProductService, FileUploadService, $injector, $filter) {
    var product;
    var $validationProvider = $injector.get('$validation');
    $scope.itemTypes = [];
    $scope.brands = [];
    $scope.itemType = {};
    $scope.product = {};
    $scope.isViewDetail = false;
    $scope.isLocked = true;
    $scope.isBrandError = false;
    $scope.isItemTypeError = false;

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalProducts = 0;
    $scope.search = '';
    $scope.sortBy = 'id';

    var swalConfig = {
        title: "",
        text: "You will not be able to recover after proceeding!",
        type: "warning",
        showCancelButton: true,
        animation: "slide-from-top",
        confirmButtonColor: "#14dd8f",
        confirmButtonText: "Yes, Proceed!",
        cancelButtonText: "No, Cancel!",
        closeOnConfirm: false,
        closeOnCancel: false
    };

    $scope.formProduct = {
        submit: function(form) {
            product = form;
            if(angular.equals({}, $scope.product.itemType)){
                $scope.isItemTypeError = true;
            } else {
                $validationProvider.validate(form).success($scope.save);
            }
        },
        reset: function(form) {
            $validationProvider.reset(form);
            backConfig();
        }
    };

    $scope.pageChangeHandler = function(num){
        $scope.currentPage = num;
        $scope.isLoading = true;
        searchOrFindAll($scope.search, num - 1);
    };

    $scope.$watch('search', function(newValue){
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)){
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

    $scope.save = function(){
        var fd = new FormData();
        var checkBrand;
        if($scope.itemType.requireBrand){
            checkBrand = !isNullOrWhitespace($scope.product.brand.id.toString());
        } else {
            checkBrand = true;
        }
        if(!isNullOrWhitespace($scope.product.itemType.id.toString()) && checkBrand){
            if(angular.isObject($scope.product.brand)){
                $scope.product.brand = $filter('filter')($scope.brands, {'id':$scope.product.brand.id})[0];
            }
            $scope.product.itemType = $filter('filter')($scope.itemTypes, {'id':$scope.product.itemType.id})[0];
            swalConfig.title = "Are you sure you want to save the details?";
            fd.append('file', $scope.fileUpload);
            swal(swalConfig,
                function(isConfirm){
                    if (isConfirm){
                        if(angular.equals({}, $scope.fileUpload)){
                            saveProduct(null);
                        } else {
                            FileUploadService.uploadProductImage(fd).then(function(res){
                                saveProduct(res.data);
                            }, function(resErr){
                                swal("Denied", "Something went wrong", "error");
                            });
                        }
                    } else {
                        swal("Cancelled", "Action has been cancelled", "error");
                    }
                });
        } else {
            if(!checkBrand){
                $scope.isBrandError = true;
            }
            if(isNullOrWhitespace($scope.product.itemType.id)){
                $scope.isItemTypeError = true;
            }
        }
    };

    $scope.createProduct = function(){
        $scope.product = {
            itemType:{},
            brand:{}
        };
        $scope.isViewDetail = true;
    };

    $scope.editProduct = function(product, index){
        angular.copy(product, $scope.product);
        $scope.productIndex = index;
        $scope.product.itemType = (!$scope.product.itemType) ? {} : $scope.product.itemType;
        $scope.isViewDetail = true;
    };

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function saveProduct(file){
        if(file){
            $scope.product['image'] = file;
        }
        if($scope.product.id){
            ProductService.updateProduct($scope.product).then(function(res){
                saveAndPushProduct(res);
            }, function(errRes){
                swal("Denied", "Something went wrong", "error");
            });
        } else if(!$scope.product.id && file){
            ProductService.createProduct($scope.product).then(function(res){
                saveAndPushProduct(res);
            }, function(errRes){
                swal("Denied", "Something went wrong", "error");
            });
        } else {
            swal("Denied", "You must upload an image first", "error");
        }
    }

    function saveAndPushProduct(res){
        if(res.status === 200){
            if($scope.product.id){
                $scope.products[$scope.productIndex] = res.data;
            } else {
                $scope.products.unshift(res.data);
                if($scope.products.length > 10){
                    $scope.products.pop();
                }
                $scope.totalProducts++;
            }
            $scope.formProduct.reset(product);
            swal("Saved!", "Your data has been saved.", "success");
        } else {
            swal("Denied", "Something went wrong", "error");
        }
    }

    function backConfig(){
        $scope.fileUpload = {};
        $scope.itemType = {};
        $scope.product = {
            itemType:{},
            brand:{},
            image:{
                filePath:'asset/images/icon/basic-upload.png'
            }
        };
        $scope.isViewDetail = false;
        $scope.productIndex = null;
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace( search )){
            search = null;
        }
        ProductService.loadProducts(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totalProducts = res.data.totalElements;
            $scope.products = res.data.content;
        },function(res){
            $scope.isLoading = false;
        });
    }
}