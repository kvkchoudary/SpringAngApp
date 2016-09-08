angular.module('useradmin.controllers')
    .controller('userSummaryController', function ($scope, user) {
        var vm = this;
        function init() {
          //vm.template = getTemplateViaConvention();
			vm.template="modules/user-admin/components/user-details/summary.tpl.html";
            vm.user = user;
            $scope.user = user;
        }
        init();
        //if view in modal then show threshold value in table
       // var viewMode = unoLocalStorage.get("uno.alertInbox.controllers.alertController.viewMode");
    });
