(function () {
    var User = function (soeId) {
        this.soeId = soeId;
        this.fullName = null;
        this.region = null;
        this.email = null;
		this.auditHistory = null;
		this.groups =null;
    };
    angular.module('useradmin.controllers')
            .factory('userAdminFactory', function () {
                return {
                    create: function (soeId) {
                        return new User(soeId);
                    }
                };
            });
}());
