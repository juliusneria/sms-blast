angular.module('App').controller('RoleController', RoleController);

RoleController.$inject = ['$scope', 'RoleService'];

function RoleController($scope, RoleService) {
    // var $validationProvider = $injector.get('$validation');
    var role;
    $scope.roles = [];
    $scope.tabs = [];
    $scope.role = {};
    $scope.isLoading = false;
    $scope.roleIndex = null;
    $scope.isRoleNameHasError = false;

    //paging and search
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalRoles = 0;
    $scope.search = '';
    $scope.sortBy = 'id';

    var swalConfig = {
        title: "",
        text: "You will not be able to recover after!",
        type: "warning",
        showCancelButton: true,
        animation: "slide-from-top",
        confirmButtonColor: "#14dd8f",
        confirmButtonText: "Yes, Proceed!",
        cancelButtonText: "No, Cancel!",
        closeOnConfirm: false,
        closeOnCancel: false
    };

    setVariable();

    //validation
    $scope.submit = function() {
        var hasPrivilege = false;
        $scope.tabs.filter(function(tab){
            tab.privileges.filter(function(privilege){
                if(privilege.boolean){
                    hasPrivilege = true;
                }
            });
        });
        if(hasPrivilege && !isNullOrWhitespace($scope.role.roleName)){
            saveRole();
        } else {
            if(isNullOrWhitespace($scope.role.roleName)){
                $scope.isRoleNameHasError = isNullOrWhitespace($scope.role.roleName);
            }
            if(!hasPrivilege){
                $('#selectPrivileges').addClass('animated shake');
                Materialize.toast('Select Privilege First', 3000, 'rounded',function(){
                    $('#selectPrivileges').removeClass('animated shake');
                });
            }
        }
    };

    $scope.$watch('search', function(newValue) {
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)) {
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

    $scope.$watch('role.roleName', function(newValue) {
        if(!isNullOrWhitespace(newValue)){
            $scope.isRoleNameHasError = isNullOrWhitespace($scope.role.roleName);
        }
    });

    $scope.pageChangeHandler = function(num){
        $scope.currentPage = num;
        $scope.isLoading = true;
        searchOrFindAll($scope.search, num - 1);
    };

    $scope.back = function(){
        $scope.role = {};
        setVariable();
    };

    $scope.editRole = function(role, index){
        angular.copy(role, $scope.role);
        $scope.roleIndex = index;
        $scope.tabs.filter(function(tab){
            tab.privileges.filter(function(privilege){
                $scope.role.privileges.filter(function(p){
                    if(p === privilege.key){
                        privilege.boolean = true;
                    }
                });
            });
        });
        $scope.isViewDetail = true;
    };

    function saveRole(){
        $scope.role['privileges'] = [];
        $scope.tabs.filter(function(tab){
            tab.privileges.filter(function(privilege){
                if(privilege.boolean){
                    $scope.role.privileges.push(privilege.key);
                }
            });
        });
        swalConfig.title = 'Are you sure you want to save the details?';
        swal(swalConfig,
            function(isConfirm){
                var promise;
                if (isConfirm) {
                    if($scope.role.id){
                        promise = RoleService.updateRole($scope.role);
                    } else {
                        promise = RoleService.createRole($scope.role);
                    }
                    promise.then(function(res){
                        if(res.status === 200){
                            if($scope.role.id){
                                $scope.roles[$scope.roleIndex] = res.data;
                            } else {
                                $scope.roles.unshift(res.data);
                                if($scope.roles.length > 10){
                                    $scope.roles.pop();
                                }
                                $scope.totalRoles++;
                            }
                            setVariable();
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
    }

    $scope.deleteRole = function(){
        swalConfig.title = 'Are you sure you want to delete the details?';
        swal(swalConfig,
            function(isConfirm){
                if (isConfirm) {
                    RoleService.deleteById($scope.role.id).then(function(res){
                        if(res.status === 200){
                            $scope.roles.splice($scope.roleIndex, 1);
                            setVariable();
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

    $scope.createRole = function(){
        $scope.isViewDetail = true;
    };

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function setVariable(){
        $scope.role = {};
        $scope.roleIndex = null;
        $scope.isViewDetail = false;
        RoleService.getTabs().then(function(tabs){
            $scope.tabs = tabs.data;
        }, function(errRess){

        });
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace(search)){
            search = null;
        }
        RoleService.loadRoles(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totalRoles = res.data.totalElements;
            $scope.roles = res.data.content;
        }, function(res){

        });
    }
}