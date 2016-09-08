angular.module('useradmin.controllers')
    .controller('userAuditHistoryController', function ($rootScope, $q, $scope, user, $mdDialog, $templateCache) {
        var vm = this;
        function init() {
			vm.template="modules/user-admin/components/user-details/audithistory.tpl.html";
            vm.user = user;
            $scope.user = user;
        }
        init();
    });
