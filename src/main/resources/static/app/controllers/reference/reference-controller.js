/**
 * Created by juliusneria on 29/05/2018.
 */
angular.module('App').controller('ReferenceController', ReferenceController);

ReferenceController.$inject = ['$scope', 'ReferenceService', '$injector'];

function ReferenceController($scope, ReferenceService, $injector) {
    var reference;
    var $validationProvider = $injector.get('$validation');
    $scope.isViewDetail = false;
    $scope.isLoading = false;
    $scope.references = [];
    $scope.reference = {};

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totaReference = 0;
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

    $scope.formReference = {
        submit: function(form) {
            reference = form;
            $validationProvider.validate(form).success($scope.save)
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

    $scope.$watch('search', function(newValue) {
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)){
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

    $scope.delete = function(){
        swalConfig.title = "Are you sure you want to delete the details?";
        swal(swalConfig,
            function(isConfirm){
                if (isConfirm) {
                    ReferenceService.deleteById($scope.reference.id).then(function(res){
                        if(res.status === 200){
                            $scope.references.splice($scope.referenceIndex, 1);
                            backConfig();
                            swal("Deleted!", "Your data has been deleted.", "success");
                        } else {
                            swal("Denied", "Something went wrong", "error");
                        }
                    });
                } else {
                    swal("Cancelled", "Action has been cancelled", "error");
                }
            });
    };

    $scope.save = function(){
        swalConfig.title = "Are you sure you want to save the details?";
        swal(swalConfig,
            function(isConfirm){
                var promise;
                if (isConfirm) {
                    if($scope.reference.id){
                        promise = ReferenceService.updateReference($scope.reference);
                    } else {
                        promise = ReferenceService.createReference($scope.reference);
                    }
                    promise.then(function(res){
                        console.log(res);
                        if(res.status === 200){
                            if($scope.reference.id){
                                $scope.references[$scope.referenceIndex] = res.data;
                            } else {
                                $scope.references.unshift(res.data);
                                if($scope.references.length > 10){
                                    $scope.references.pop();
                                }
                                $scope.totaReference++;
                            }
                            $scope.formReference.reset(reference);
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
    };

    $scope.createReference = function(){
        $scope.reference = {};
        $scope.isViewDetail = true;
    };

    $scope.editReference = function(reference, index){
        // $scope.reference = reference;
        angular.copy(reference, $scope.reference);
        $scope.isViewDetail = true;
        $scope.referenceIndex = index;
    };

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function backConfig(){
        $scope.isViewDetail = false;
        $scope.reference = {};
        $scope.referenceIndex = null;
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace( search )){
            search = null;
        }
        ReferenceService.loadReferences(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totaReference = res.data.totalElements;
            $scope.references = res.data.content;
        },function(res){
            $scope.isLoading = false;
        });
    }
}