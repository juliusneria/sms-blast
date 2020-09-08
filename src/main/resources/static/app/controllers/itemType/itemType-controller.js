angular.module('App').controller('ItemTypeController', ItemTypeController);

ItemTypeController.$inject = ['$scope', 'ItemTypeService'];

function ItemTypeController($scope, ItemTypeService) {
    $scope.isViewDetail = false;
    $scope.isItemTypeError = false;
    $scope.itemType = {};
    $scope.itemTypes = [];

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totaItemType = 0;
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

    $scope.back = function(){
        backConfig();
    };

    $scope.$watch('itemType.itemTypeName', function(newValue){
        if(newValue !== undefined && newValue.toString().length > 0){
            $scope.isItemTypeError = false;
        }
    });

    $scope.pageChangeHandler = function(num){
        $scope.currentPage = num;
        $scope.isLoading = true;
        searchOrFindAll($scope.search, num - 1);
    };

    $scope.$watch('search', function(newValue) {
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)){
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

    $scope.save = function(){
        if(!isNullOrWhitespace($scope.itemType.itemTypeName)){
            swalConfig.title = "Are you sure you want to save the details?";
            swal(swalConfig,
                function(isConfirm){
                    $scope.isLoading = true;
                    var promise;
                    if (isConfirm) {
                        if($scope.itemType.id){
                            promise = ItemTypeService.updateItemType($scope.itemType);
                        } else {
                            promise = ItemTypeService.createItemType($scope.itemType);
                        }
                        promise.then(function(res){
                            if(res.status === 200){
                                if($scope.itemType.id){
                                    $scope.itemTypes[$scope.itemTypeIndex] = res.data;
                                } else {
                                    $scope.itemTypes.unshift(res.data);
                                    if($scope.itemTypes.length > 10){
                                        $scope.itemTypes.pop();
                                    }
                                    $scope.totaItemType++;
                                }
                                backConfig();
                                swal("Saved!", "Your data has been saved.", "success");
                            } else {
                                swal("Denied", "Something went wrong", "error");
                            }
                            $scope.isLoading = false;
                        }, function(errRes){
                            swal("Denied", "Something went wrong", "error");
                            $scope.isLoading = false;
                        });
                    } else {
                        swal("Cancelled", "Action has been cancelled", "error");
                        $scope.isLoading = false;
                    }
                });
        } else {
            $scope.isItemTypeError = isNullOrWhitespace($scope.itemType.itemTypeName);
        }
    };

    $scope.delete = function(){
        swalConfig.title = "Are you sure you want to delete the details?";
        swal(swalConfig,
            function(isConfirm){
                if (isConfirm) {
                    ItemTypeService.deleteByItemType($scope.itemType.id).then(function(res){
                        if(res.status === 200){
                            $scope.itemTypes.splice($scope.referenceIndex, 1);
                            backConfig();
                            swal("Deleted!", "Your data has been deleted.", "success");
                        } else {
                            swal("Denied!", "Something went wrong", "error");
                        }
                    });
                } else {
                    swal("Cancelled", "Action has been cancelled", "error");
                }
            });
    };

    $scope.createItemType = function(){
        $scope.isViewDetail = true;
    };

    $scope.editItemType = function(itemType, index){
        angular.copy(itemType, $scope.itemType);
        $scope.itemTypeIndex = index;
        $scope.isViewDetail = true;
    };

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function backConfig(){
        $scope.itemType = {};
        $scope.itemTypeIndex = null;
        $scope.isViewDetail = false;
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace( search )){
            search = null;
        }
        ItemTypeService.loadItemType(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totaItemType = res.data.totalElements;
            $scope.itemTypes = res.data.content;
        },function(res){
            $scope.isLoading = false;

        });
    }
}