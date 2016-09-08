angular.module('useradmin.controllers')
    .controller('adduserController', ["$location","$q","useradminModel","$anchorScroll", "$scope", "$state","$mdBottomSheet","$rootScope", "$templateCache","$timeout", "$mdDialog","useradminService", function ($location,$q,useradminModel,$anchorScroll, $scope, $state,$mdBottomSheet, $rootScope, $templateCache,$timeout, $mdDialog,useradminService) {
        
		var vm = this;
		vm.useradminModel =useradminModel;
		function init() {
			//vm.isFid ='N';
			var promises = [];
			$scope.groups = 		[{groupName:'Business Analyst',groupId:'BusinessAnalyst',roleId:'BA',roleName:'Business Analyst'},
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
			$scope.user = {	groups: []};
           /* promises.push(useradminService.getAllGroups());						
                         $q.all(promises)
                            .then(function (dataArray) {
                                angular.forEach(
                                    dataArray, function (data) {
										if (data.adminAllGroupsList) {
                                            $scope.groups = data.adminAllGroupsList;
											$scope.user = {
													groups: []
											};
										} 
								  }							
                                );	
                            })
                            .catch(function (error) {
                                logger.warn('Error loading groups.');
                                $state.goto('uno.alertInbox');
                            });	
			*/
        }

	/*********************************/	
	vm.simulateQuery = false;
    vm.isDisabled    = false;

    // list of `state` value/display objects
    vm.states        = loadAll();
    vm.querySearch   = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;

    vm.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states,
          deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      //$log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      //$log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alberta, British Columbia, Manitoba, New Brunswick, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
		
	/****************************************************************/	
		function query(search) {
        	if(vm.selectedItem!=undefined){
        		vm.selected = undefined;
        	}
           return useradminService.getUsersFromXSU(search)
                .then(function (response) {
						if(response.users.length > 0) {
							vm.queryResults = [].concat(response.users);							
						}
                });
        }
		
		//$scope.$on('updateVm', function (event, response) {
        //	vm.selectedGroups = response.data;
        //});

		function onSelected(selectedItem){
			vm.user=selectedItem;
			$scope.user.username = vm.user.name;
			for (i = 0; i < vm.useradminModel.users.length; i++) { 
				    if(vm.useradminModel.users[i].soeId == selectedItem.soeId){
						$mdDialog.show(
						  $mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(true)
							.title('The User you want to add is already in System.')							
							.ariaLabel('Alert Dialog Demo')
							.ok('Ok')
							.targetEvent()
						);
						var searchParams = $state.current.$params.$search;
						searchParams.userId = selectedItem.soeId;
						$state.go('form.userAdmin.selectedUserDetails', searchParams);	
					}   				
				}			
		}
		
		function emerUser(emerUser){
			if(!emerUser){
				if (vm.user.fidDescription) {
					vm.user.fidDescription='';
				}
			}
		}
		
		function fid(fid){
			if(fid){				
				vm.user.fidDescription='';
				vm.user.fidUserName='';
				vm.isFid =false;		
			}else{
				vm.isFid =true;	
				if (vm.user) {
					vm.user.selectedItem='';
					vm.user.name='';
					vm.user.emailAddress='';	
				}
			}
		}
		

		function cancel(vm) {
			$state.go('form.userAdmin.userDetails');
		}
		
		function addUser(vm) {
            var formData = new FormData();          
            formData.append("user_id", vm.user.soeId);
            formData.append("fullname", vm.user.name);
            formData.append("email", vm.user.emailAddress);
            formData.append("fid", vm.user.fid);
            formData.append("geid", vm.user.geid);
			formData.append("fid_description", vm.user.fidDescription);
			formData.append("emer_user", vm.user.emer_user);
			formData.append("fid_userName", vm.user.fidUserName);
			
			var groups='';
			if(!vm.user.fid && !vm.user.emer_user){
				if(vm.selectedGroups != undefined){
					for (i = 0; i < vm.selectedGroups.length; i++) { 
						if(i!=0){
							groups=groups.concat(',');	
						}
							groups=groups.concat(vm.selectedGroups[i].groupId);					
					}
				}
			}
			
			//formData.append("groups", groups);
			
			//******************************************************************************************************************************
			
			var usr={soeId:vm.user.soeId,fullName:vm.user.name,	region:'NAM',country:'Canada',	createdts:'2014/08/06',	fid_description:'',	fid:'N',
								email:vm.user.emailAddress, emer_user:'N',active:'Y',	userGroupList:vm.selectedGroups};
			var users= vm.useradminModel.users;
			users.push(usr);
			$rootScope.$broadcast('updateUsers', {"users" : users});
			$state.go('form.userAdmin.userDetails');
			
			//******************************************************************************************************************************
			/*
				return useradminService.addAdminUser(vm.user.soeId,vm.user.name,vm.user.emailAddress,vm.user.fid,vm.user.geid,vm.user.fidDescription,vm.user.emer_user,groups,vm.user.fidUserName)
					.then(function (response) {
						if(response && response.data == "Error") {
							notification.error("Error occurred closing alert. Please contact the administrator");
						}else{					
								var promises = [];
								promises.push(useradminService.getAdminUsers());						
									$q.all(promises)
								.then(function (dataArray) {
									angular.forEach(
										dataArray, function (data) {
											if (data) {
													var users=data;
													$rootScope.$broadcast('updateUsers', {"users" : users});
											  
													var searchParams = $state.current.$params.$search;
													if(vm.user.fid){
														searchParams.userId = vm.user.fidUserName;
													}else{
														searchParams.userId = vm.user.soeId;
													}
													$state.go('form.userAdmin.userDetails', searchParams);
											} 
									  }							
									);	
								})
								.catch(function (error) {
									logger.warn('Error loading Users.');
									$state.go('form.userAdmin.userDetails');
								});	
						} 
					})
					.catch(function (error){
						notification.error("Error occurred closing alert. Please contact the administrator");
				});	
			*/
        }
		
		
		vm.query = query; 
		vm.query = query; 
		vm.query = query; 
		
		vm.query = query; 
		vm.queryResults =[];
		vm.selectedItem = undefined;
		vm.addUser = addUser;
		vm.cancel = cancel;
		vm.onSelected = onSelected;
		vm.emerUser = emerUser;
		vm.fid = fid;
		vm.isFid = false;
		init();
    }]).directive('multiSelect', function($q,$rootScope) {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      selectedLabel: "@",
      availableLabel: "@",
      displayAttr: "@",
      available: "=",
      model: "=ngModel"
    },
    template: '<div class="multiSelect">' + 
                '<div class="select">' + 
	                '<label class="control-label" for="multiSelectAvailable">{{ availableLabel }} ({{ available.length }})</label><br>' +
	                '<select class="selectionDD" id="multiSelectAvailable" ng-model="selected.available" multiple ng-options="e as e[displayAttr] for e in available"></select>' +
                '</div>' + 
                
                '<div class="select buttons">' + 
                	'<button class="btn mover left" ng-click="remove()" title="Remove selected" ' + 
		              'ng-disabled="selected.current.length == 0">' + 
		              '<i class="icon-arrow-right"> < </i>' + 
		            '</button>' +
		            '<button class="btn mover right" ng-click="add()" title="Add selected" ' + 
                      'ng-disabled="selected.available.length == 0">' + 
                      '<i class="icon-arrow-left"> > </i>' + 
                    '</button>' + 
                '</div>' +
                
                '<div class="select">' +
	                '<label class="control-label" for="multiSelectSelected">{{ selectedLabel }} ({{ model.length }})</label><br>' +
                	'<select class="selectionDD" id="currentGroups" ng-model="selected.current" multiple ng-options="e as e[displayAttr] for e in model"></select>' + 
                '</div>' +
              '</div>',
    link: function(scope, elm, attrs) {
      scope.selected = {
        available: [],
        current: []
      };

      /* Handles cases where scope data hasn't been initialized yet */
      var dataLoading = function(scopeAttr) {
        var loading = $q.defer();
        if(scope[scopeAttr]) {
          loading.resolve(scope[scopeAttr]);
        } else {
          scope.$watch(scopeAttr, function(newValue, oldValue) {
            if(newValue !== undefined)
              loading.resolve(newValue);
          });  
        }
        return loading.promise;
      };

      /* Filters out items in original that are also in toFilter. Compares by reference. */
      var filterOut = function(original, toFilter) {
        var filtered = [];
        angular.forEach(original, function(entity) {
          var match = false;
          for(var i = 0; i < toFilter.length; i++) {
            if(toFilter[i][attrs.displayAttr] == entity[attrs.displayAttr]) {
              match = true;
              break;
            }
          }
          if(!match) {
            filtered.push(entity);
          }
        });
        return filtered;
      };

      scope.refreshAvailable = function() {
        scope.available = filterOut(scope.available, scope.model);
        scope.selected.available = [];
        scope.selected.current = [];
      }; 

      scope.add = function() {
		if(scope.model !== undefined){
			scope.model = scope.model.concat(scope.selected.available);
		}else{
			scope.model = scope.selected.available;
		}
		scope.$parent.vm.selectedGroups=scope.model;
		//$scope.$broadcast('updateVm', {"data":scope.model});
        scope.refreshAvailable();
      };
      scope.remove = function() {
        scope.available = scope.available.concat(scope.selected.current);
        scope.model = filterOut(scope.model, scope.selected.current);
		scope.$parent.vm.selectedGroups=scope.model;
		//$scope.$broadcast('updateVm', {"data":scope.model});
        scope.refreshAvailable();
      };

      $q.all([dataLoading("model"), dataLoading("available")]).then(function(results) {
        scope.refreshAvailable();
      });
    }
  };
});
