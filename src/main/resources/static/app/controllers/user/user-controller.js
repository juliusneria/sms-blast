angular.module('App').controller('UserController', UserController);

UserController.$inject = ['$scope', 'UserService', 'RoleService', '$filter', '$injector'];

function UserController($scope, UserService, RoleService, $filter, $injector) {
    var $validationProvider = $injector.get('$validation');
    var user;
    $scope.users = [];
    $scope.roles = [];
    $scope.user = {};
    $scope.userIndex = null;
    $scope.isViewDetail = false;
    $scope.isLoading = false;
    $scope.roleId = null;

    //paging and search
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalUsers = 0;
    $scope.search = '';
    $scope.sortBy = 'id';
    $scope.isRoleHasError = false;

    $scope.myConfig = {
        valueField: 'id',
        labelField: 'roleName',
        searchField: ['roleName'],
        placeholder: 'Select Role',
        maxItems:1
    };

    $scope.formUser = {
        submit: function(form) {
            user = form;
            $scope.isRoleHasError = false;
            $validationProvider.validate(form).success($scope.saveUser)
        },
        reset: function(form) {
            $validationProvider.reset(form);
        }

    };

    $scope.back = function(userForm){
        backConfig();
        $scope.formUser.reset(userForm);
    };

    RoleService.findAll().then(function(roleRes){
        $scope.roles = roleRes.data;
    }, function(errRess){
        $scope.isLoading = false;
    });

    $scope.$watch('search', function(newValue) {
        if(newValue.toString().length > 2 || isNullOrWhitespace(newValue)){
            $scope.isLoading = true;
            searchOrFindAll(newValue, 0);
        }
    });

    $scope.pageChangeHandler = function(num){
        $scope.currentPage = num;
        $scope.isLoading = true;
        searchOrFindAll($scope.search, num - 1);
    };

    $scope.saveUser = function(){
        if(angular.isObject($scope.user.role)){
            if(!isNullOrWhitespace($scope.user.role.id.toString())){
                $scope.user.role = $filter('filter')($scope.roles, {'id':$scope.user.role.id})[0];
                swal({  title: "Are you sure you want to save the details?",
                        text: "You will not be able to recover after proceeding!",
                        type: "warning",
                        showCancelButton: true,
                        animation: "slide-from-top",
                        confirmButtonColor: "#14dd8f",
                        confirmButtonText: "Yes, Proceed!",
                        cancelButtonText: "No, Cancel!",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function(isConfirm){
                        $scope.isLoading = true;
                        var promise;
                        if (isConfirm) {
                            if($scope.user.id){
                                promise = UserService.updateUser($scope.user);
                            } else {
                                promise = UserService.createUser($scope.user);
                            }
                            promise.then(function(res){
                                if(res.status === 200){
                                    if($scope.user.id){
                                        $scope.users[$scope.userIndex] = res.data;
                                    } else {
                                        $scope.users.unshift(res.data);
                                        if($scope.users.length > 10){
                                            $scope.users.pop();
                                        }
                                        $scope.totalUsers++;
                                    }
                                    swal("Saved!", "Your data has been saved.", "success");
                                    $validationProvider.reset(user);
                                    backConfig();
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
                $scope.isRoleHasError = true;
            }
        } else {
            $scope.isRoleHasError = true;
        }
    };

    $scope.editUser = function(user, index){
        angular.copy(user, $scope.user);
        $scope.userIndex = index;
        $scope.isViewDetail = true;
    };

    function backConfig(){
        $scope.isViewDetail = false;
        $scope.isRoleHasError = false;
    }

    function isNullOrWhitespace( input ) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    function searchOrFindAll(search, page){
        if(isNullOrWhitespace( search )){
            search = null;
        }
        UserService.loadUsers(page, $scope.sortBy, search, false).then(function(res){
            $scope.isLoading = false;
            $scope.totalUsers = res.data.totalElements;
            $scope.users = res.data.content;
        },function(res){
            $scope.isLoading = false;

        });
    }
}