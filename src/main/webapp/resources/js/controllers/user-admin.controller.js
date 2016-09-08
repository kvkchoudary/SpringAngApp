angular.module('useradmin.controllers',['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngAnimate', 'ui.grid', 'ui.grid.grouping', 'ui.grid.selection'])
  .controller('useradminController',["$scope","$rootScope","$mdBottomSheet","$http","$interval","$timeout","$mdSidenav","useradminService","useradminModel","uiGridConstants","$log","uiGridGroupingConstants","$state",
  function ($scope,$rootScope,$mdBottomSheet,$http,$interval,$timeout,$mdSidenav,useradminService,useradminModel,uiGridConstants,$log,uiGridGroupingConstants,$state) {
  
  	var vm = this;
	vm.isReplyIncluded=false;
	
	(function init() {
	        vm.usersModel = useradminModel;
	        vm.lastSelectedUser = null;
	        vm.selectedUser = null;
	        vm.users = useradminModel.users;
	        vm.firstLogin = true;
			vm.gridTableHeight = 0;
			vm.gridTableOriginalHeight = 0;
	        vm.state = {};       

			var listRowHeight=75;
			var listTableViewable = window.innerHeight - 50;
			var listRowsToShow =  Math.floor(listTableViewable / listRowHeight);
			
	        vm.gridOptions = {		
	            enableFullRowSelection: false,
	            enableRowSelection: false,
	            multiSelect: false,
	            noUnselect: false,
	            enableGrouping: true,
	            enableGroupHeaderSelection: false,
	            enableRowHeaderSelection: false,
	            enableFiltering: false,
	            enableSorting: true,
	            enableHorizontalScrollbar: 0,
	            enableVerticalScrollbar: 1,
	            groupsCollapsedByDefault: false,
	            rowHeight: 67,
	            showHeader: false,
	            showTreeRowHeader: false,
	            treeRowHeaderAlwaysVisible: true,
				excessRows: listRowsToShow,
				minRowsToShow: listRowsToShow,
	            columnDefs: [{
	            	displayName: 'Name',
		            field: 'fullName',
	                width: '60%'
	              }, {
	            	displayName: 'SOE ID',
	                field: 'soeId',	            	
	                width: '40%'
	              }, {
	            	displayName: 'Region',
	                field: 'region',
					enableGrouping: true,	            	
	                width: '40%'
	              }, {
	            	displayName: 'Country',
	                field: 'country',
					enableGrouping: true,	            	
	                width: '40%'
	              }, {
	            	displayName: 'Created On',
	                field: 'createdts',
					enableSorting: true,
					enableGrouping: false,	            	
	                width: '40%'
	              }, {
	            	displayName: 'Last Modified',
	                field: 'lastUpdated',
					enableSorting: true,
					enableGrouping: false,	            	
	                width: '40%'
	              }],	            
	            onRegisterApi: function(gridApi) {
	                vm.gridApi = gridApi;
					vm.gridTableOriginalHeight = gridApi.grid.gridHeight;
					vm.gridTableHeight = vm.gridTableOriginalHeight;
					vm.gridApi.grid.registerRowsProcessor(vm.filterQuickFilter, 60);
					vm.gridApi.grid.registerRowsProcessor(vm.filterViewSettings, 60);
	            },
	            appScopeProvider: {
	                onDblClick: function(row) {
					},
	                onToggleClick: function(row) {
	                    vm.toggleGroupVisibility(row);
	                },
	                onSingleClick: function(row) {
						
	                    // if single click is wanted, just disable the checkbox and have people think they are clicking the
	                    // checkbox when in reality they are checking the entire row.
	                    // Then the checkbox will automatically highlight
	                    //vm.beforeSelection(row);
	                    if (!row.isClicked) {
	                    	if (!row.isSelected) {
	                    		vm.gridApi.selection.clearSelectedRows();
	                    		row.isSelected = true;
	    						vm.selectUser(row.entity);
	                    	}
	                    } else {
	                      vm.beforeSelection(row);  
	                    }
	                    row.isClicked = false;
	                },
	                changeChecked: function(row) {
	                	row.isClicked = true;
	                }
	           },
	           rowTemplate: 'listItemTemplate.html'
	        };	        
			
	        $scope.$watchCollection('vm.users', function(collection) {
	           if (vm.users.length > 0) {
	                vm.gridOptions.data = vm.users;
					
				  $timeout(function() {
					if (vm.gridApi) {
						configureSortingAndGrouping();
					} else {
						vm.loading = false;
					}
                }, 10, false);
				  
				    $timeout(function() {
						if (vm.gridApi && vm.gridApi.treeBase != undefined) {
							vm.gridApi.treeBase.expandAllRows();
						}                   
					}, 1000, false);
				  
	            }
	       });
			
	        $scope.$watch('vm.users', function(newValue, oldValue) {
	            //refreshGrid();
	        }, true);

	        //var unsubscribeStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, state) {
	        	
	        //});
	        // $scope.$on('$destroy', unsubscribeStateChangeSuccess);

	    })();
	
    function beforeSelection(row) {
        var total = vm.gridApi.selection.getSelectedRows().length;
        if (total == 1 && row.isSelected) {
            row.isSelected = true;
        }
    }
    
	function filterViewSettings(renderableRows) {
        var foundOne = false;
		
        //if (!vm.alertsModel.legacyOpen) {
        //	vm.view.isClosed = false;
        //}
		
        var totalCount = 0;
    	var openCount = 0;
    	var closedCount = 0;
        renderableRows.forEach(function(row) {
            
            if (vm.view.fid) {
                if (row.entity.fid !== 'Y') {
                    row.visible = false;
                }
            }
			
			if (vm.view.inActive) {
                if (row.entity.active !== 'N') {
                    row.visible = false;
                }
            }
			
            if (row.visible) {
                foundOne = true;
            }

            //since we are iterating through each row here anyway, lets get the total row counts for open/closed alerts
        	//if (row.entity.uno_alert_state == 'open') {
        		//if (row.visible) openCount++;
        	//} else {
        		//if (row.visible) closedCount++;
        	//}

        });
        
		if (!foundOne && renderableRows.length > 0 && vm.firstLogin) {
            vm.view.inActive = false;
           	//vm.view.isClosed = false;
            vm.firstLogin = false;
            refreshGrid();
        }
        
		//vm.totalAlertCount = openCount + closedCount;
        //vm.totalAlertText = openCount>0? openCount + ' Open ' + (closedCount>0? ' | ' + closedCount + ' Closed '  : '' ) : (closedCount>0? closedCount + ' Closed ': ''); 
        return renderableRows;
    }
	
	 function initializeView() {
        //vm.view = unoLocalStorage.get("uno.admin.controllers.view");
        //if (vm.view === null || vm.view == 'undefined') {
            console.log('tis null')
            vm.view = new View('Admin');
        //}
        vm.selectedSettings = angular.copy(vm.view);
        //if (!vm.alertsModel.firstLogin) {
            //vm.alertsModel.firstLogin = true;
            vm.view.fid = false;
            vm.view.inActive = false;
        //}
    }
	
	 function saveView(view) {
      //vm.manuallyCheckedAssigedToMe = true;
        vm.view = angular.extend(vm.view, view);
       //unoLocalStorage.set("uno.admin.controllers.view", vm.view);
        vm.mode = "view";
        //if (!vm.alertsModel.legacyOpen) {
        configureSortingAndGrouping();
        //}
        refreshGrid();
    }
	
	initializeView();
	
	 function View(title) {
        var self = this;
        self.title = 'Admin';//title;
        self.groupBy = 'region';
        self.orderBy = 'createdts';
		//self.fid = 'N';
        //self.assignedToMe = true;
    }
	
	function clearQuickFilter(dontRefresh) {
        vm.searchText = undefined;
        if (!dontRefresh) {
            refreshGrid();
        }
    }
	
	function filterQuickFilter(renderableRows) {
        if (vm.searchText) {
            var matcher = new RegExp(vm.searchText, "i");
            renderableRows.forEach(function(row) {
                var match = false;
                [
                 'fullName', 'soeId','fid_description'

                ].forEach(function(field) {
                    if (row.entity[field] && row.entity[field].match(matcher) && row.visible) {
                        match = true;
                    }
                });
                if (!match) {
                    row.visible = false;
                }
            });
        }
        return renderableRows;
    }
	
	function configureSortingAndGrouping() {
        configureSorting();
        configureGrouping();
    }

    function configureSorting() {
        vm.gridApi.grid.sortColumn(vm.gridApi.grid.getColumn(vm.view.groupBy), uiGridConstants.ASC, false);
        vm.gridApi.grid.sortColumn(vm.gridApi.grid.getColumn(vm.view.orderBy), uiGridConstants.DESC, true);
    }

    function configureGrouping() {
        vm.gridApi.grouping.clearGrouping();
        vm.gridApi.grouping.groupColumn(vm.view.groupBy);
    }
	
	 function refreshGrid() {		
        vm.gridApi.grid.refresh();
    }
	
	function autoSelectUser(selectedRow) {
				if (vm.users.length > 0) {
					vm.gridApi.selection.clearSelectedRows();
					selectUser(vm.gridApi.selection.selectRowByVisibleIndex(0));
				}
    }
	
	$scope.$on('updateUsers', function (event, res) {
					vm.gridOptions.data = res.users;
					useradminModel.users=res.users;
    });
	
	function addUser() {
		$state.go('form.userAdmin.addUser');
    }
	
	function editView() {
        vm.selectedSettings = angular.copy(vm.view);
        vm.mode = "edit";
    }
	
	var downloadUsers = function () {
	    var uno_ids = "all";	
	    return useradminService.getDownloadUsers(uno_ids)
	        .then(function (data) {
	            var blob = new Blob([data.data], {
	                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	            });
	
	            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
	                window.navigator.msSaveOrOpenBlob(blob);
	            } else {
	                var objectUrl = URL.createObjectURL(blob);
	                //window.open(objectUrl, '_self');
	                var currDate = moment().format('MM-DD-YYYY');
	                var filename = "USERS_LIST EXPORT OF "
	                filename = filename + " " + currDate;
	                var a = document.createElement('a');
	                a.download = filename; // or whatever you want to name it
	                a.href = objectUrl;
	                // $window.open(objectUrl, '_self');
	                a.click();
	                // $window.URL.revokeObjectURL(objectUrl);
	            }
	        })
	        .catch(function (data, status, headers, config) {
	            console.log('Download failed');
	        });
	};
	
	 /*User Selection*/
    function selectUser(data) {
			vm.seletedUser = data;
		  //alertsModel.selectedAlertList = [data];
          //scrollSelectionIntoView();

          //if($state.current.$fullname !== $state.lookup('uno.alertInbox.alertDetails').$fullname || $state.current.$params.alertId !== data.uno_alert_id) {
          //data.isUnRead = false;
            //var searchParams = $state.current.$params.$search;
			var searchParams={userId:data.soeId};
            //searchParams.userId = data.soeId;
            //$state.go('form.userAdmin.selectedUserDetails', searchParams);
			$state.go('form.userAdmin.selectedUserDetails', {userId:searchParams.userId});
			//$state.go('form.profile',{name:'Krishna'});
          //}
    }
	
	/*Group Management*/
    function toggleGroupVisibility(row) {
        if (row.treeNode.state === 'expanded') {
            vm.gridApi.treeBase.collapseRow(row);
        } else {
            vm.gridApi.treeBase.expandRow(row);
        }
    }
	
	 function toggleLoading() {
	   vm.loading = !vm.loading;
     }
	
    $scope.expandAll = function() {
      $scope.gridApi.treeBase.expandAllRows();
    };

    $scope.toggleRow = function(rowNum) {
      $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
    };

    $scope.changeGrouping = function() {
      $scope.gridApi.grouping.clearGrouping();
      $scope.gridApi.grouping.groupColumn('region');
      
    };
	$scope.getAggregates = function() {
      var aggregatesTree = [];
      var gender;

      var recursiveExtract = function(treeChildren) {
        return treeChildren.map(function(node) {
          var newNode = {};
          angular.forEach(node.row.entity, function(attributeCol) {
            if (typeof(attributeCol.groupVal) !== 'undefined') {
              newNode.groupVal = attributeCol.groupVal;
              newNode.aggVal = attributeCol.value;
            }
          });
          newNode.otherAggregations = node.aggregations.map(function(aggregation) {
            return {
              colName: aggregation.col.name,
              value: aggregation.value,
              type: aggregation.type
            };
          });
          if (node.children) {
            newNode.children = recursiveExtract(node.children);
          }
          return newNode;
        });
      }

      aggregatesTree = recursiveExtract($scope.gridApi.grid.treeBase.tree);

      console.log(aggregatesTree);
    };
	
	$scope.toggleLeft = buildDelayedToggler('left');
    
    $scope.isOpenRight = function(){
      var right = $mdSidenav('right');
      return right && right.isOpen();
    };

	 /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
	
	 /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
	
	 function buildToggler(navID) {		
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
	function openBottomSheet() {
		console.log('Botumn tab clicked');
		$mdBottomSheet.show({
		  template: '<h2>Are you sure of adding this user ? </h2>'+
		  '<md-bottom-sheet><md-button id="add" class="md-fab md-accent"><font size="1" color="black">Confirm </font> </md-button>'+
		  '<md-button id="add" class="md-fab md-accent"><font size="1" color="black">Cancel </font> </md-button>'+
		  '</md-bottom-sheet>'
		});
	}
	function showDialog() {
		console.log('I am clicked now');
		vm.isReplyIncluded=true;
	}
	vm.showDialog=showDialog;
	vm.openBottomSheet=openBottomSheet;      
    vm.toggleGroupVisibility = toggleGroupVisibility;   
    vm.selectUser = selectUser;   
	vm.addUser =addUser;
	vm.showExcelMenu  = false;
	vm.downloadUsers = downloadUsers;
	vm.filterViewSettings = filterViewSettings;
	vm.saveView = saveView;
    vm.refreshGrid = refreshGrid;
	vm.filterQuickFilter = filterQuickFilter;
	vm.clearQuickFilter =clearQuickFilter;
	vm.toggleLoading = toggleLoading;
	vm.editView = editView;
	vm.mode="view";
  
   // $scope.toggleLeft = buildDelayedToggler('left');
   // $scope.toggleRight = buildToggler('right');
   /* $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
   */
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
/*
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
*/
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
/*
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
*/
/*
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
*/
  }])
  .controller('emptyInboxController',["$scope","$rootScope","useradminModel",
  function ($scope,$rootScope,useradminModel) {  
  	var vm = this;
    vm.loadingUser = false;
    vm.useradminModel = useradminModel;
	}])
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/
