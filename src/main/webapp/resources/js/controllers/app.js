// app.js
// =============================================================================
angular.module('inSync.factories', []);
angular.module('useradmin.controllers', []);
angular.module('inSync.controllers', ['inSync.factories','useradmin.controllers','angular.filter','ui.grid.pinning']);
//angular.module('inSync', ['ng','ngAria','ngAnimate', 'ui.router', 'ui.grid', 'ui.grid.pagination','ui.slimscroll','ui.bootstrap','ui.grid.moveColumns',
//'ui.grid.grouping','ui.grid.selection','ui.grid.exporter','ui.grid.autoResize','ui.grid.resizeColumns','ngMaterial','ui.grid.saveState','ui.select',
//'adf','duScroll','ngSanitize','highcharts-ng','chart.js','inSync.controllers'])

//angular.module('inSync.controllers', ['inSync.factories','useradmin.controllers','angular.filter','ui.grid.pinning']);
angular.module('inSync', ['ng','ngAria','ngAnimate', 'ui.router', 'ui.grid', 'ui.grid.pagination','ui.bootstrap','ui.grid.moveColumns',
'ui.grid.grouping','ui.grid.selection','ui.grid.exporter','ui.grid.autoResize','ui.grid.resizeColumns','ngMaterial','ngMessages','ui.grid.saveState','ui.select',
'duScroll','ngSanitize','highcharts-ng','inSync.controllers'])



// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {    
    $stateProvider 
        .state('form', {       			url: '/form',       		templateUrl: 'resources/views/DemoViews/form.html',      controller: 'formController'})				
        .state('temp1', {      			url: '/temp1',      		templateUrl: 'resources/views/temp/temp1.html',          controller: 'temp1Controller'})				 
        .state('temp1.temp2', {	    	url: '/temp2',  			templateUrl: 'resources/views/temp/temp2.html',          controller: 'temp2Controller'})		
		.state('login', {	      		url: '/login',      		templateUrl: 'resources/views/login/login.html',         controller: 'loginController'})                
        .state('form.profile', {    	url: '/profile',    		templateUrl: 'resources/views/DemoViews/form-profile.html', controller: 'profileController'})		
		.state('form.f1race', {     	url: '/f1race',     		templateUrl: 'resources/views/F1Views/drivers.html',     controller: 'driversController'})						  
		.state('form.driver', {     	url: '/driver/:driverid',	templateUrl: 'resources/views/F1Views/driver.html', controller: 'driverController'})			
		.state('form.gridPagination', { url: '/gridPagination',     templateUrl: 'resources/views/SearchViews/gridPagination.html',controller: 'gridPaginationController'})		
		.state('form.instantSearch', {  url: '/instantSearch',      templateUrl: 'resources/views/SearchViews/instantSearch.html',controller: 'InstantSearchController'})		
		.state('form.profile.check', {  url: '/check',            	templateUrl: 'resources/views/DemoViews/form-profile-check.html'})                
        .state('form.interests', {      url: '/interests',          templateUrl: 'resources/views/DemoViews/form-interests.html'})				
        .state('register.info', {       url: '/register',           templateUrl: 'resources/views/DemoViews/form-interests.html'})                
        .state('form.payment', {        url: '/payment',			views:{'' : {templateUrl: 'resources/views/DemoViews/form-payment.html'}}})		
		.state('private', {			abstract: true,					templateUrl: 'resources/views/temp/temp1.html'		})	
		.state('private.visits', {
			//params: {'name': null}, 
			url: '/visits',
			views: {
				'main': {
					controller: 'visitsListCtrl',
					templateUrl: 'resources/views/temp/temp2.html',
					resolve: {
							name: ['$stateParams', function($stateParams) {
								return $stateParams.name;
							}]
						}
				}
			}
		})
		
		// Admin Screen States		
		.state('form.userAdmin', {
                url: "/userAdmin",
                views: {
                    '': {
                          templateUrl: "resources/views/AdminViews/user-admin.tpl.html",
                          controller: 'useradminController as vm',
                          sticky: true
                    }
                },
                resolve: {
                    config: function () {
                        return {
                            autoSelect: true
                        };
                    }
                },
                reloadOnSearch: true, data: {
                    pageTitle: "Entitlements Manager"
                },
                access: {
                    loginRequired: false
                } 
            })
		.state('form.userAdmin.userDetails', {
				url: "/details",
                views: {
                    'details': {
                        templateUrl: "resources/views/AdminViews/empty-inbox.tpl.html",
                        controller: "emptyInboxController as vm",
						sticky: true
                    }
                },                
                data: {
                    pageTitle: "User Inbox"
                },
                access: {
                    loginRequired: false
                }
           })
		 .state('form.userAdmin.addUser', {
				url: "/addUser",
				views: {
					"details": {
						templateUrl: "resources/views/AdminViews/add-user.tpl.html",
						controller: "adduserController as vm",
						sticky: true
					}
				},
				resolve: {
					userId: ["$stateParams", function ($stateParams) {
						return $stateParams.userId;
					}] 
				},
				data: {
					pageTitle: "User Inbox"
				},
				access: {
					loginRequired: false
				}
		 })
		 .state('form.userAdmin.selectedUserDetails', {
				url: "/:userId/details",
                views: {
                    'details': {
                        templateUrl: "resources/views/AdminViews/user.tpl.html",
                        controller: "userController as vm",
                        sticky: ["$to", function ($to) {
                            var sticky = $to.$params['userId'];
                            return sticky;
                        }]
                    }
                },
                resolve: {
                    userId: ["$stateParams", function ($stateParams) {
                        return $stateParams.userId;
                    }],
                    user: ["$stateParams","$q","$state", "$rootScope","useradminModel","useradminService", function ($stateParams,$q,$state, $rootScope,useradminModel,useradminService) {
                        //var userId = userAdminFactory.create($stateParams.userId);
						var userId = $stateParams.userId;
						var users = useradminModel.users;
						var user;
						for (var key in users) {
							if (users.hasOwnProperty(key)) {
								if(userId == users[key].soeId){
								    user=users[key];
									break;
								}
							}
						}
						
						var auditList =[{userId:'VK29544',changed_userName:'Robin',change_done:'Added User',changed_by:'RG91694',changed_time:'2016/04/06'},
										{userId:'VK29544',changed_userName:'Robin',change_done:'Added to Group Business Analyst',changed_by:'RG91694',changed_time:'2016/06/04'},
										{userId:'VK29544',changed_userName:'Robin',change_done:'Removed from Group Nam Analyst',changed_by:'RG91694',changed_time:'2016/08/14'}];
										
						
						user.auditHistory=auditList;	
						return user;						
																					
						//var promises = [];
                        //promises.push(useradminService.getAuditHistory($stateParams.userId));						
                        //return $q.all(promises)
                        //    .then(function (dataArray) {
                        //       angular.forEach(
                        //            dataArray, function (data) {
						//				if (data.adminUserAuditDetails) {
						//					if (user) {
						//						user.auditHistory = data.adminUserAuditDetails;												
						//					}
						//				} 
                        //           }							
                        //        );								
                        //        return user;
                        //    })
                        //    .catch(function (error) {
                        //        $state.goto('form.userAdmin.userDetails');
                        //    });
                    }]
                },
                data: {
                    pageTitle: "User Inbox"
                },
                access: {
                    loginRequired: false
                }
            })
			.state('form.userAdmin.userDetails.default', {
                url: "/",
                views: {
                    "tab1": {
                        tabConfig: {
                            name: 'tab1',
                            label: 'Summary',
                            icon: 'info_outline',
                            popoutStateName: 'uno.userSummary'
                        },
                        templateUrl: "resources/views/AdminViews/summary.tpl.html",
                        controller: 'userSummaryController as vm'
                    },
					"tab2": {
                        tabConfig: {
                            name: 'tab2',
                            label: 'Audit History',
                            icon: 'history',
                            //counter: 'user.auditList.length',
                            counterDefault: 1,
                            //popoutStateName: 'uno.userAuditHistory'
                        },
                        templateUrl: "resources/views/AdminViews/audithistory.tpl.html",
                        controller: "userAuditHistoryController as vm"
                    }                   
                },
                data: {
                    pageTitle: "User Inbox"
                },
                access: {
                    loginRequired: false
                }

            });    
		  /*.state('form.userAdmin.userDetails', {
                route: "/:userId/details",
                views: {
                    "details": {
                        template: "js/components/user-details/user.tpl.html",
                        controller: "userController as vm",
                        sticky: ["$to", function ($to) {
                            var sticky = $to.$params['userId'];
                            return sticky;
                        }]
                    }
                },
                resolve: {
                    userId: ["$route", function ($route) {
                        return $route.current.params.userId;
                    }],
                    user: ["$route","$q", "userAdminFactory", "$state", "$rootScope","useradminModel","useradminService", "logger", function ($route,$q,userAdminFactory,$state, $rootScope,useradminModel,useradminService, logger) {
                        var userId = userAdminFactory.create($route.current.params.userId);
                  var users = useradminModel.users;
                 //var history = useradminService.getAuditHistory($route.current.params.userId);
                  var user;
                  for (var key in users) {
                     if (users.hasOwnProperty(key)) {
                        if(userId.soeId == users[key].soeId){
                            user=users[key];
                           break;
                        }
                     }
                  }  
                  
                  var promises = [];
                        promises.push(useradminService.getAuditHistory($route.current.params.userId));                  
                        return $q.all(promises)
                            .then(function (dataArray) {
                                angular.forEach(
                                    dataArray, function (data) {
                                        //if (!data.summary) {
                              if (data.adminUserAuditDetails) {
                                 if (user) {
                                    user.auditHistory = data.adminUserAuditDetails;                                     
                                 }
                              } 
                                    }                    
                                );                      
                                return user;
                            })
                            .catch(function (error) {
                                logger.warn('Error loading the alert.');
                                $state.goto('uno.alertInbox');
                            });
                    }]
                },
                data: {
                    pageTitle: "User Inbox"
                },
                access: {
                    loginRequired: false
                }
            });    
    */			
    
	//$urlRouterProvider.when('/home', '/home/index').
    //$urlRouterProvider.otherwise('/form/profile');
	//$urlRouterProvider.when('/form/profile', '/form/profile');
	$urlRouterProvider.otherwise('/login');
})
.run(['$rootScope', '$state', '$stateParams','$templateCache',
  function ($rootScope, $state, $stateParams,$templateCache) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	 $templateCache.put('addShare.html', 'resources/views/DemoViews/addShare.html');
}]);