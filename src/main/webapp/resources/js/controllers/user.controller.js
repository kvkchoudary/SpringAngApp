angular.module('useradmin.controllers')
    .controller('userController', ["$q", "$location","$mdDialog", "$anchorScroll", "$scope", "$state", "userId", "$mdBottomSheet","$rootScope", "$templateCache", "user", "$timeout", "$mdDialog","useradminService","useradminModel", function ($q, $location,$mdDialog,$anchorScroll, $scope, $state, userId, $mdBottomSheet, $rootScope, $templateCache, user, $timeout, $mdDialog,useradminService,useradminModel) {

        var vm = this;
		vm.user = user;
        function init() {            
            var viewDefinitions = {};  
			var def={
                    "tab1": {
                        tabConfig: {
                            name: 'tab1',
                            label: 'User Summary',
                            icon: 'info_outline',
                            popoutStateName: 'uno.userSummary'
                        },
                        templateUrl: "views/AdminViews/summary.tpl.html",
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
                        templateUrl: "views/AdminViews/audithistory.tpl.html",
                        controller: "userAuditHistoryController as vm"
                    }                   
                };
            viewDefinitions = angular.extend(viewDefinitions, def);
            vm.viewDefinitions = viewDefinitions;
        }
		
		 function confirmation(ev,soeId) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				  .title('Do you really want to delete user?')
				  .targetEvent(ev)
				  .ok('Yes')
				  .cancel('No');

			$mdDialog.show(confirm).then(function() {
				vm.removeUser(true,soeId);
				vm.showPopUp=false;  
			}, function() {
				vm.showPopUp=false;  
			});
		};
		
		function scrollTo(location) {
            vm.selected = location;
        }
		
		function removeUser(response,soeId) {
			/****************************************************************/
				
				var users = useradminModel.users;
				for (i = 0; i < users.length; i++) { 
					 if(users[i].soeId == soeId){
						//vm.user=users[i];
						//vm.user=user;
						users[i].active='N';
						break;
					  }
				}
				$rootScope.$broadcast('updateUsers', {"users" : users});
				
			/*****************************************************************/
			/*
			if(response){
			  return useradminService.removeAdminUser(soeId)
                .then(function (response) {
						if(response.data.status=='success') {
							user.active='N';							
							var promises = [];
							promises.push(useradminService.getAdminUsers());
							promises.push(useradminService.getAuditHistory(soeId));							
								$q.all(promises)
                            .then(function (dataArray) {
                                angular.forEach(
                                    dataArray, function (data) {
									if(data.adminUserAuditDetails){
											vm.user.auditHistory=data.adminUserAuditDetails;
										} else if (data) {
											var users=data;
											//for (i = 0; i < users.length; i++) { 
										     // if(users[i].soeId == soeId){
											//	vm.user=users[i];
												//vm.user=user;
												//break;
											  //}
										    //}
											$rootScope.$broadcast('updateUsers', {"users" : users});
											//var searchParams = $state.current.$params.$search;
											//searchParams.userId = soeId;
											//$state.goto('uno.userAdmin.userDetails', searchParams);
											
											
										} 
								  }							
                                );	
                            })
                            .catch(function (error) {
                                logger.warn('Error loading Users.');
                                $state.goto('uno.alertInbox');
                            });
							
						}
                });
			}else{
				 vm.showPopUp=false;
			}*/
        }
		
		function editUser(soeId) {
			vm.editFlag=true;	
			//******************************************************************
				$scope.groups =    [{groupName:'Business Analyst',groupId:'BusinessAnalyst',roleId:'BA',roleName:'Business Analyst'},
									{groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'},
									{groupName:'Nam Manager',groupId:'NamManager',roleId:'NM',roleName:'Nam Manager'},
									{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
									{groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'},
									{groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
									{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
									{groupName:'Compliance',groupId:'Compliance',roleId:'Compliance',roleName:'Compliance'},
									{groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
									{groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
									{groupName:'Level3',groupId:'Level3',roleId:'Level3',roleName:'Level3'}];
				$scope.adminUser = {groups: vm.user.userGroupList};		
			//******************************************************************
			/*
			var promises = [];
            promises.push(useradminService.getAllGroups());						
				 $q.all(promises)
					.then(function (dataArray) {
						angular.forEach(
							dataArray, function (data) {
								if (data.adminAllGroupsList) {
									$scope.groups = data.adminAllGroupsList;
									$scope.adminUser = {
											groups: vm.user.userGroupList
									};
								} 
						  }							
						);	
					})
					.catch(function (error) {
						logger.warn('Error loading groups.');
						$state.go('uno.alertInbox');
					});
			*/
        }
		
		function cancelUpdate(){
			vm.editFlag=false;
		}
		
		function updateUser(user) {
            var formData = new FormData();          
            formData.append("user_id", user.soeId);
            formData.append("fullname", user.fullName);
            formData.append("email", user.email);
            formData.append("fid", user.fid);
            formData.append("geid", user.geid);
			formData.append("active", user.active);
			formData.append("fid_description", user.fid_description);
			formData.append("emer_user", user.emer_user);
            
			var groups='';
			
			if(vm.selectedGroups != undefined){
				groups = vm.selectedGroups;
			}else{
				groups =user.userGroupList;
			}
			
			/********************************************************************************************************************************************/
			var users = useradminModel.users;				
			var usr={soeId:user.soeId,fullName:user.fullName,	region:'NAM',country:'Canada',	createdts:'2014/08/06',	fid_description:'',	fid:'N',
					 email:user.email, emer_user:'N',active:user.active,	userGroupList:groups};			
			for (i = 0; i < users.length; i++) { 
			  if(users[i].soeId == user.soeId){
				users[i]=usr;
				break;
			  }
			}			
			$rootScope.$broadcast('updateUsers', {"users" : users});	
			vm.editFlag=false;
			vm.user=usr;
			$state.go('form.userAdmin.selectedUserDetails', {userId:user.soeId});		
			/*********************************************************************************************************************************************/
			
			/*			
			if(user.fid =='N'){
				if(vm.selectedGroups != undefined){
					user.userGroupList=vm.selectedGroups;
					for (i = 0; i < vm.selectedGroups.length; i++) { 
						if(i!=0){
							groups=groups.concat(',');	
						}
							groups=groups.concat(vm.selectedGroups[i].groupId);					
					}
				}else{
					for (i = 0; i < user.userGroupList.length; i++) { 
						if(i!=0){
							groups=groups.concat(',');	
						}
							groups=groups.concat(user.userGroupList[i].groupId);					
					}
				}
			}
			
            return useradminService.updateAdminUser(user.soeId,user.fullName,user.email,user.fid,user.geid,user.fid_description,user.emer_user,groups,user.active)
                .then(function (response) {
                    if(response && response.data == "Error") {
                        //notification.error("Error occurred closing alert. Please contact the administrator");
                    } else {
							vm.editFlag=false;
						//vm.user=user;						
						//var searchParams = $state.current.$params.$search;
						//searchParams.userId = user.soeId;
						//$state.goto('uno.userAdmin.userDetails', searchParams);	
						
						var promises = [];
							promises.push(useradminService.getAdminUsers());
							promises.push(useradminService.getAuditHistory(user.soeId));						
								$q.all(promises)
                            .then(function (dataArray) {
                                angular.forEach(
                                    dataArray, function (data) {
										if(data.adminUserAuditDetails){
											vm.user.auditHistory=data.adminUserAuditDetails;
										} else if (data) {
                                          var users=data;
										  for (i = 0; i < users.length; i++) { 
										      if(users[i].soeId == vm.user.soeId){
												user=users[i];
												//vm.user=user;
												break;
											  }
										  }
										  $rootScope.$broadcast('updateUsers', {"users" : users});										  
											//var searchParams = $state.current.$params.$search;
											//searchParams.userId = user.soeId;
											//$state.goto('uno.userAdmin.userDetails', searchParams);
											//$state.transitionTo('new-state', null, {'reload':true});
										} 
								  }							
                                );	
                            })
                            .catch(function (error) {
                                logger.warn('Error loading Users.');
                                $state.go('uno.alertInbox');
                            });						
                    }
                })
                .catch(function (error){
                    //notification.error("Error occurred closing alert. Please contact the administrator");
                });						
			*/
			
        }
		
        function refresh(params) {
            vm.user = params.$locals.user;
            vm.userId = params.$locals.userId;
        }
		
		$scope.scrollTo = function(id) {
        	var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);            
        }
        
		function refresh(params) {
            vm.user = params.$locals.user;
            vm.userId = params.$locals.userId;
        }
		
        function getTabCounter(tabConfig) {
            return objectPath.get(vm, tabConfig.counter) || tabConfig.counterDefault;
        }

        vm.user = user;
        vm.userId = userId;
	
        //vm.alertTitle = alert.summary.alert_title;
        //vm.alert_type_name = alert.summary.alert_type_name;
        vm.getTabCounter = getTabCounter;         
        vm.data;
        vm.fields;      
        vm.scrollTo = scrollTo;
		vm.emptyUser = false;
		vm.showPopUp=false;
		vm.confirmation=confirmation;
		vm.removeUser=removeUser;
		vm.editFlag=false;
		vm.editUser=editUser;
		vm.updateUser =updateUser;
		vm.cancelUpdate =cancelUpdate;
        init(); 

        
    }]).directive('ngConfirmClick', [
		  function(){
			return {
			  priority: -1,
			  restrict: 'A',
			  link: function(scope, element, attrs){
				element.bind('click', function(e){
				  var message = attrs.ngConfirmClick;
				  // confirm() requires jQuery
				  if(message && !confirm(message)){
					e.stopImmediatePropagation();
					e.preventDefault();
				  }
				});
			  }
			}
		  }
	]);
