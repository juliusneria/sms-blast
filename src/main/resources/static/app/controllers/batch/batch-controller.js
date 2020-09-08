/**
 * Created by juliusneria on 06/06/2018.
 */
angular.module('App').controller('BatchController', BatchController).factory('$exceptionHandler', function() {
    return function(exception, cause) {
        console.log(exception);
    }
});
BatchController.$inject = ['$scope', 'BatchService', 'ItemTypeService', 'ReferenceService', 'FileUploadService', 'ProductService', '$filter', '$rootScope', '$injector'];
function BatchController($scope, BatchService, ItemTypeService, ReferenceService, FileUploadService, ProductService, $filter, $rootScope, $injector) {
    var product;
    var $validationProvider = $injector.get('$validation');

    $scope.isViewDetail = false;
    $scope.isAddNewItem = false;
    $scope.batch = {
        arrivedLine:[],
        createdBy:{}
    };
    $scope.product = {};
    $scope.fileUpload = {};
    $scope.itemType = {};
    $scope.tempProduct = {};
    $scope.products = [];
    $scope.itemTypes = [];
    $scope.batches = [];
    $scope.brands = [];
    $scope.supplier = '';
    $scope.barcode = '';
    $scope.imgSrc = null;
    $scope.suppliers = [{
        key:'ALB',
        value:'Alibaba'
    },{
        key:'LAZ',
        value:'Lazada'
    },{
        key:'SAL',
        value:'Salora'
    }];

    $scope.supplierConfig = {
        valueField: 'key',
        labelField: 'value',
        searchField: ['value'],
        placeholder: 'Select Supplier',
        maxItems:1
    };

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalBatches = 0;
    $scope.search = '';
    $scope.sortBy = 'id';

    $scope.formProduct = {
        submit: function(form){
            product = form;
            $validationProvider.validate(form).success($scope.addToItemList)
        },
        reset: function(form){
            $validationProvider.reset(form);
            $scope.product = {};
        }
    };

    $scope.$watch('search', function(newValue){
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)){
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

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

    $scope.populateProductFields = function(data){
        if(data.keyCode === 13){
            var product = $filter('filter')($scope.products, {barCode:data.target.value})[0];
            $scope.product = product ? product : {};
            $scope.imgSrc = $scope.product.image ? '/file/downloadFile/'+$scope.product.image.fileName : null;
        }
    };

    $scope.$watch('product.itemType.id', function(newValue){
        if(newValue !== undefined && newValue.toString().length > 0){
            $scope.itemType = $filter('filter')($scope.itemTypes, {'id':parseInt(newValue)})[0];
            $scope.isItemTypeError = false;
            $scope.isLocked = false;
        }
    });

    $scope.$watch('isAddNewItem', function(){
        clearAll();
    });

    ProductService.findAll().then(function(res){
        $scope.products = res.data;
    }, function(resErr){

    });

    ItemTypeService.findAll().then(function(resItemType){
        ReferenceService.findByCategory('BRAND').then(function(resReference){
            $scope.itemTypes = resItemType.data;
            $scope.brands = resReference.data;
        }, function(resErr){

        });
    }, function(resErr){

    });

    $scope.createBatch = function(){
        $scope.isViewDetail = true;
    };

    $scope.createBatch = function(batch){
        $scope.isViewDetail = true;
    };

    $scope.back = function(){
        backConfig();
    };

    $scope.clear = function(){
        clearAll();
    };

    $scope.formatDate = function(date){
        return moment(date).format('LLL');
    };

    $scope.addToItemList = function(productForm){
        product = productForm;
        if(!angular.equals({}, $scope.product) && $scope.isAddNewItem){
            saveProduct();
        } else if(!angular.equals({}, $scope.product)){
            $scope.batch.arrivedLine.push({
                product:$scope.product,
                quantity:1,
                lineNumber:$scope.batch.arrivedLine.length + 1
            });
            clearAll();
        }
    };

    $scope.save = function(status){
        $scope.batch['status'] = status;
        $scope.batch.arrivalDate = ($scope.batch.arrivalDate) ? new Date($scope.batch.arrivalDate) : null;
        angular.copy($rootScope.user, $scope.batch.createdBy);
        swalConfig.title = "Are you sure you want to save the details?";
        swal(swalConfig,
            function(isConfirm){
                var promise;
                if (isConfirm) {
                    if($scope.product.id){
                        // promise = BatchService.updateProduct(fd);
                    } else {
                        promise = BatchService.createBatch($scope.batch);
                    }
                    promise.then(function(res){
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
                    }, function(errRes){
                        swal("Denied", "Something went wrong", "error");
                    });
                } else {
                    swal("Cancelled", "Action has been cancelled", "error");
                }
            });
        /*InventoryService.createBatch($scope.batch).then(function(res){
            console.log(res);
        },function(resErr){
            console.log(resErr);
        });*/
    };

    function clearAll(){
        $scope.imgSrc = null;
        $scope.product = {};
        $scope.itemType = {};
        $scope.fileUpload = {};
        $scope.product = {};
    }

    function saveProduct(){
        var fd = new FormData();
        var checkBrand;
        if($scope.itemType.requireBrand){
            checkBrand = !isNullOrWhitespace($scope.product.brand.id.toString());
        } else {
            checkBrand = true;
        }
        if(!isNullOrWhitespace($scope.product.itemType.id.toString()) && checkBrand){
            if(angular.isObject($scope.product.brand)){
                $scope.product.brand = $filter('filter')($scope.brands, {id:$scope.product.brand.id})[0];
            }
            $scope.product.itemType = $filter('filter')($scope.itemTypes, {'id':$scope.product.itemType.id})[0];
            fd.append('file', $scope.fileUpload);
            FileUploadService.uploadProductImage(fd).then(function(resUpload){
                $scope.product['image'] = resUpload.data;
                $scope.batch.arrivedLine.push({
                    product:$scope.product,
                    quantity:1,
                    lineNumber:$scope.batch.arrivedLine.length + 1
                });
                $scope.formProduct.reset(product);
            }, function(resErr){
                swal("Denied", "Something went wrong", "error");
            });
        } else {
            if(!checkBrand){
                $scope.isBrandError = true;
            }
            if(isNullOrWhitespace($scope.product.itemType.id)){
                $scope.isItemTypeError = true;
            }
        }
    }

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function backConfig(){
        $scope.product = {};
        $scope.isViewDetail = false;
        $scope.batch = {
            arrivedLine:[],
            createdBy:{}
        };
        $scope.product = {};
        $scope.itemType = {};
        $scope.tempProduct = {};
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace( search )){
            search = null;
        }
        BatchService.loadBatches(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totalBatches = res.data.totalElements;
            $scope.batches = res.data.content;
        },function(res){
            $scope.isLoading = false;
        });
    }

    if($('#tabs-swipe-demo').length){
        $('#tabs-swipe-demo').tabs({
            'swipeable': true
        });
    }

    // Materialize Tabs
    $('.tab-demo').show().tabs();
    $('.tab-demo-active').show().tabs();

    $('.dropify').dropify({
        tpl: {
            message: '<div class="dropify-message"><span class="fileUpload-icon" /><br /> {{ default }}</div>'
        }
    });
}