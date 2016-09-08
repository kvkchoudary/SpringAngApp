angular.module('useradmin.controllers',[])
  .controller('emptyInboxController',["$scope","$rootScope","useradminModel",
  function ($scope,$rootScope,useradminModel) {  
  	var vm = this;
    vm.loadingUser = false;
    vm.useradminModel = useradminModel;
}]);


