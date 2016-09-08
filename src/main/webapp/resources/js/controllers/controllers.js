// app.js
// =============================================================================
angular.module('inSync.controllers',['inSync.factories','useradmin.controllers'])
.config(function($mdIconProvider) {
    $mdIconProvider
      .icon('share-arrow', 'img/icons/share-arrow.svg', 24)
      .icon('upload', 'img/icons/upload.svg', 24)
      .icon('copy', 'img/icons/copy.svg', 24)
      .icon('print', 'img/icons/print.svg', 24)
      .icon('hangout', 'img/icons/hangout.svg', 24)
      .icon('mail', 'img/icons/mail.svg', 24)
      .icon('message', 'img/icons/message.svg', 24)
      .icon('copy2', 'img/icons/copy2.svg', 24)
      .icon('facebook', 'img/icons/facebook.svg', 24)
      .icon('twitter', 'img/icons/twitter.svg', 24);
  })
.run(function($templateRequest) {
    var urls = [
      'img/icons/share-arrow.svg',
      'img/icons/upload.svg',
      'img/icons/copy.svg',
      'img/icons/print.svg',
      'img/icons/hangout.svg',
      'img/icons/mail.svg',
      'img/icons/message.svg',
      'img/icons/copy2.svg',
      'img/icons/facebook.svg',
      'img/icons/twitter.svg'
    ];
    angular.forEach(urls, function(url) {
      $templateRequest(url);
    });
  })
.controller('formController', function($scope,$rootScope,$state,$stateParams,shareDataService,$mdDialog,$templateCache,$mdBottomSheet,$http) { 

  $http.get('properties/connection.properties').then(function (response) {
	console.log('devUrl is ', response.data.uatUrl);
	console.log('uatUrl is ', response.data.uatUrl);
  });

	//console.log($stateParams);
	var vm = this;
    // we will store all of our form data in this object
    $scope.formData = {name:'Venkat',email:'kvk.choudary@gmail.com',empid:'13876',technology:'Java/J2ee',dep:'Channel & Product Marketing', project:'Red Point'};    
    // function to process the form
   /* $scope.processForm = function() {
        alert('awesome!');
    };	
	*/
	//---------------------------------  Employees ----------------------------------
	var employeesData = [];
	var numOfEmployees=10;
	var employees =     [{firstName:'Krishna',lastName:'K',role:'Senior Developer',technology:'Java/J2ee',project:'InSync',email:'kvk@investco.com'},
						{firstName:'Nikola',lastName:'Kapetanovic',role:'Senior Developer',technology:'Java/J2ee',project:'MobileApp',email:'nik@investco.com'},
						{firstName:'Hong',lastName:'Wang',role:'Senior Developer',technology:'Java/J2ee',project:'Sherpa',email:'hong@investco.com'},
						{firstName:'Xu',lastName:'Jing',role:'Senior Developer',technology:'Java/J2ee',project:'Sherpa',email:'xu@investco.com'},
						{firstName:'Wendy',lastName:'Zong',role:'Technical Architect',technology:'Java/J2ee',project:'All',email:'wendy@investco.com'},
						{firstName:'Ken',lastName:'Qiu',role:'Team Lead',technology:'Java/J2ee',project:'All',email:'ken@investco.com'},
						{firstName:'Joseph',lastName:'DSouza',role:'Senior Developer',technology:'Java/J2ee',project:'MobileApp',email:'joseph@investco.com'},
						{firstName:'Andrew',lastName:'Mitchell',role:'Senior Developer',technology:'Java/J2ee',project:'Red Point',email:'andrew@investco.com'}									
					];

	if (Array.isArray(employees)) {
		employeesData = employees;
	} else if (employees!="No Value"){
		employeesData.push(employees);
	}

	$scope.employeesGridOptions = {
				minRowsToShow:Math.min(employees!="No Value"?employees.length:1,10),				
				excessRows: 20,
				excessColumns: 2,
				enableFiltering: true,
				enableSorting: true,
				enableColumnMenus: true,
				enableColumnResizing: true,
				enableHiding: true,
				enableHorizontalScrollbar: 0,
				//enableVerticalScrollbar: 1,
				onRegisterApi: function(gridApi1) {
					gridApi1.grid.canvasWidth = 500;
					gridApi1.grid.gridWidth = 500;
					//$scope.crossNoSecuritiesGridApi = vm.crossNoSecuritiesGridApi = gridApi;
					$scope.employeesGridApi = gridApi1;
				},
				columnDefs: getColsEmployees(),
				data: employeesData
	};
	
	
	$scope.employeeDetails = (function(param){
			$state.go('form.userAdmin.userDetails');
	});
					
	
	
	function getColsEmployees() {
		var headerCellTemplateHtml = "<div role=\"columnheader\" ng-class=\"{ 'sortable': sortable }\" ui-grid-one-bind-aria-labelledby-grid=\"col.uid + '-header-text ' + col.uid + '-sortdir-text'\" aria-sort=\"{{col.sort.direction == asc ? 'ascending' : ( col.sort.direction == desc ? 'descending' : (!col.sort.direction ? 'none' : 'other'))}}\"><div role=\"button\" tabindex=\"0\" class=\"ui-grid-cell-contents ui-grid-header-cell-primary-focus\" col-index=\"renderIndex\" title=\"TOOLTIP\"><span class=\"ui-grid-header-cell-label\" ui-grid-one-bind-id-grid=\"col.uid + '-header-text'\">{{ col.displayName CUSTOM_FILTERS }}</span><span class=\"badge\">" + numOfEmployees + "</span><span ui-grid-one-bind-id-grid=\"col.uid + '-sortdir-text'\" ui-grid-visible=\"col.sort.direction\" aria-label=\"{{getSortDirectionAriaLabel()}}\"><i ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\" title=\"{{col.sort.priority ? i18n.headerCell.priority + ' ' + col.sort.priority : null}}\" aria-hidden=\"true\"></i> <sub class=\"ui-grid-sort-priority-number\">{{col.sort.priority}}</sub></span></div><div role=\"button\" tabindex=\"0\" ui-grid-one-bind-id-grid=\"col.uid + '-menu-button'\" class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\" ui-grid-one-bind-aria-label=\"i18n.headerCell.aria.columnMenuButtonLabel\" aria-haspopup=\"true\"><i class=\"ui-grid-icon-angle-down\" aria-hidden=\"true\">&nbsp;</i></div><div ui-grid-filter></div></div>";
		var cols = [{
			field: 'firstName',
			displayName: 'First Name',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.firstName}}</a></div>' ,
			width: '*',
			displayOrder: 10,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		}, {
			field: 'lastName',
			displayName: 'Last Name',
			//cellTemplate:'<div ng-if="row.entity.price" class="ui-grid-cell-contents">{{row.entity.price| valueFormatter}}</div>',
			//cellTemplate:'<div ng-if="row.entity.price" class="ui-grid-cell-contents">{{row.entity.price}}</div>',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.lastName}}</a></div>' ,
			//cellTemplate: '<div class="ui-grid-cell-contents" ng-class="col.colIndex()"><a ng-click="grid.appScope.sharePopUp(COL_FIELD)"></a></div>',
			width: '*',
			displayOrder: 20,
			type: 'number',
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		},{
			field: 'role',
			displayName: 'Role',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.role}}</a></div>' ,
			width: '*',
			displayOrder: 30,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		},{
			field: 'technology',
			displayName: 'Technology',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.technology}}</a></div>' ,
			width: '*',
			displayOrder: 40,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		},{
			field: 'project',
			displayName: 'Project',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.project}}</a></div>' ,
			width: '*',
			displayOrder: 50,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		},{
			field: 'email',
			displayName: 'Email',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.employeeDetails(COL_FIELD)">{{row.entity.email}}</a></div>' ,
			width: '*',
			displayOrder: 60,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: true
		}];
		cols = sortByDisplayOrder(cols);
		return cols;
	}
	//-------------------------------   Employee Information End  ---------------------------------
	
	
	//---------------------------------  Trade Information Start ----------------------------------
	var securityData = [];
	var numOfSecurities =10;
	var shares =       [{name:'IFCI',price:'12',country:'India',status:'Profit',units:'8',amount:'96'},
						{name:'Unitech',price:'8',country:'India',status:'Loss',units:'10',amount:'80'},
						{name:'Infosys',price:'70',country:'India',status:'Profit',units:'7',amount:'490'},
						{name:'TCS',price:'40',country:'India',status:'Profit',units:'8',amount:'320'},
						{name:'CGI',price:'58',country:'Canada',status:'Profit',units:'10',amount:'580'},
						{name:'TD',price:'62',country:'Canada',status:'Profit',units:'10',amount:'620'},
						{name:'Investco',price:'70',country:'Canada',status:'Profit',units:'10',amount:'700'},
						{name:'DLF',price:'48',country:'India',status:'Loss',units:'20',amount:'960'},
						{name:'Cineplex',price:'62',country:'USA',status:'Profit',units:'10',amount:'620'},
						{name:'BMO',price:'70',country:'Canada',status:'Profit',units:'10',amount:'700'},					  			   			
						{name:'Telus',price:'56',country:'Canada',status:'Profit',units:'10',amount:'560'},
						{name:'Indiabulls ',price:'124',country:'India',status:'Loss',units:'10',amount:'1240'},
						{name:'PNC',price:'280',country:'USA',status:'Profit',units:'2',amount:'560'},
						{name:'Welsforgo',price:'186',country:'Canada',status:'Loss',units:'1',amount:'186'},
						{name:'Bell',price:'220',country:'Canada',status:'Loss',units:'2',amount:'440'},
						{name:'Rogers',price:'168',country:'Canada',status:'Profit',units:'4',amount:'672'},
						{name:'Sunlife',price:'180',country:'USA',status:'Loss',units:'2',amount:'360'},
						{name:'Wind',price:'72',country:'Canada',status:'Profit',units:'10',amount:'720'},
						{name:'Tata',price:'180',country:'India',status:'Loss',units:'1',amount:'180'},
						{name:'Microsoft',price:'280',country:'USA',status:'Profit',units:'1',amount:'280'},
						{name:'Google',price:'240',country:'USA',status:'Profit',units:'2',amount:'480'},
						{name:'Yahoo',price:'32',country:'USA',status:'Profit',units:'20',amount:'640'}
					];

	if (Array.isArray(shares)) {
		securityData = shares;
	} else if (shares!="No Value"){
		securityData.push(shares);
	}

	$scope.crossNoSecuritiesGridOptions = {
				//minRowsToShow:Math.min(alert.details.shares!="No Value"?alert.details.shares.length:1,20),
				minRowsToShow:Math.min(shares!="No Value"?shares.length:1,10),				
				excessRows: 20,
				excessColumns: 2,
				enableFiltering: true,
				enableSorting: true,
				enableColumnMenus: true,
				enableColumnResizing: true,
				enableHiding: true,
				enableHorizontalScrollbar: 0,
				//enableVerticalScrollbar: 1,
			onRegisterApi: function(gridApi) {
				gridApi.grid.canvasWidth = 500;
				gridApi.grid.gridWidth = 500;
				//$scope.crossNoSecuritiesGridApi = vm.crossNoSecuritiesGridApi = gridApi;
				$scope.crossNoSecuritiesGridApi = gridApi;
			},
				columnDefs: getColsSecurities(),
				data: securityData
	};

	function getColsSecurities() {
		var headerCellTemplateHtml = "<div role=\"columnheader\" ng-class=\"{ 'sortable': sortable }\" ui-grid-one-bind-aria-labelledby-grid=\"col.uid + '-header-text ' + col.uid + '-sortdir-text'\" aria-sort=\"{{col.sort.direction == asc ? 'ascending' : ( col.sort.direction == desc ? 'descending' : (!col.sort.direction ? 'none' : 'other'))}}\"><div role=\"button\" tabindex=\"0\" class=\"ui-grid-cell-contents ui-grid-header-cell-primary-focus\" col-index=\"renderIndex\" title=\"TOOLTIP\"><span class=\"ui-grid-header-cell-label\" ui-grid-one-bind-id-grid=\"col.uid + '-header-text'\">{{ col.displayName CUSTOM_FILTERS }}</span><span class=\"badge\">" + numOfSecurities + "</span><span ui-grid-one-bind-id-grid=\"col.uid + '-sortdir-text'\" ui-grid-visible=\"col.sort.direction\" aria-label=\"{{getSortDirectionAriaLabel()}}\"><i ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\" title=\"{{col.sort.priority ? i18n.headerCell.priority + ' ' + col.sort.priority : null}}\" aria-hidden=\"true\"></i> <sub class=\"ui-grid-sort-priority-number\">{{col.sort.priority}}</sub></span></div><div role=\"button\" tabindex=\"0\" ui-grid-one-bind-id-grid=\"col.uid + '-menu-button'\" class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\" ui-grid-one-bind-aria-label=\"i18n.headerCell.aria.columnMenuButtonLabel\" aria-haspopup=\"true\"><i class=\"ui-grid-icon-angle-down\" aria-hidden=\"true\">&nbsp;</i></div><div ui-grid-filter></div></div>";
		var cols = [{
			field: 'name',
			displayName: 'Name',
			//headerCellTemplate: headerCellTemplateHtml,
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.name}}</a></div>' ,
			width: '*',
			displayOrder: 10,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		}, {
			field: 'price',
			displayName: 'Price',
			//cellTemplate:'<div ng-if="row.entity.price" class="ui-grid-cell-contents">{{row.entity.price| valueFormatter}}</div>',
			//cellTemplate:'<div ng-if="row.entity.price" class="ui-grid-cell-contents">{{row.entity.price}}</div>',
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.price}}</a></div>' ,
			//cellTemplate: '<div class="ui-grid-cell-contents" ng-class="col.colIndex()"><a ng-click="grid.appScope.sharePopUp(COL_FIELD)"></a></div>',
			width: '*',
			displayOrder: 20,
			type: 'number',
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		},{
			field: 'country',
			displayName: 'Country',
			//headerCellTemplate: headerCellTemplateHtml,
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.country}}</a></div>' ,
			width: '*',
			displayOrder: 30,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		},{
			field: 'status',
			displayName: 'Current Status',
			//headerCellTemplate: headerCellTemplateHtml,
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.status}}</a></div>' ,
			width: '*',
			displayOrder: 40,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		},{
			field: 'units',
			displayName: 'Units',
			//headerCellTemplate: headerCellTemplateHtml,
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.units}}</a></div>' ,
			width: '*',
			displayOrder: 40,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		},{
			field: 'amount',
			displayName: 'Amount',
			//headerCellTemplate: headerCellTemplateHtml,
			cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.shareDetailsPopUp(COL_FIELD)">{{row.entity.amount}}</a></div>' ,
			width: '*',
			displayOrder: 40,
			headerTooltip: true,
			headerCellClass: "center",
			cellClass: "center",
			cellTooltip: true,
			filterCellFiltered: true,
			enableHiding: false
		}];
		cols = sortByDisplayOrder(cols);
		return cols;
	}
	//-------------------------------   Trade Information End  ---------------------------------
	

	//Utility Start
	function sortByDisplayOrder(colArr) {
			colArr.sort(function(a, b) {
				return a.displayOrder - b.displayOrder;
			});
			return colArr;
	}
		
		
	$scope.sharePopUp1 = function(event) {
			var scopePop = $rootScope.$new();
		   $mdDialog.show({
			  clickOutsideToClose: true,
			  scope: scopePop,        
			  preserveScope: true,           
			  template: '<md-dialog>' +
						  '  <md-dialog-content>' +
						  '    Its Popup' +
						  '  </md-dialog-content>' +
						  '</md-dialog>',
			  controller: function DialogController($scope, $mdDialog) {
				 $scope.closeDialog = function() {
					$mdDialog.hide();
				 }
			  }
		   });
	 };
		
		
	$scope.sharePopUp7 = function($event) {
			var tpl = $templateCache.get('views/DemoViews/shareDetailsInfo.html');
			var shareData = getShareData();
			var scope = $rootScope.$new();
			scope.closeDialog = $mdDialog.cancel;
			$scope.modalConfig = {
				template: '<md-dialog flex><md-toolbar><div class="md-toolbar-tools"><h3>Share Details</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar><md-dialog-content>' + 
				'<div layout="column" layout-fill class="alert-details">'+
				'	<div layout="column" layout-wrap class="alert-summary cross-details">'+
				'		<div class="threshold-table">'+
				'			<table style="width: 100%;">'+
				'				<thead>'+
				'					<tr>'+
				'						<th ng-repeat="eachField in fields">{{eachField}}</td>'+
				'					</tr>'+
				'				</thead>'+
				'				<tbody>'+
				'					<tr>'+
				'						<td ng-repeat="row in data">{{row[eachField]}}</td>'+
				'					</tr>'+
				'				</tbody>'+
				'			</table>'+
				'		</div>'+
				'	</div>'+
				'</div>'+				
				'</md-dialog-content></md-dialog>',
				clickOutsideToClose: true,
				locals: {
					fields: shareData.fieldsToShow,
					shareDetails: shareData.dataToShow
				},
				scope: scope,
				controller: DialogController
			};
			$mdDialog.show($scope.modalConfig);
			function DialogController($scope, $mdDialog, fields, shareDetails) {
				$scope.data = shareDetails;
				$scope.fields = fields;
			}
	}
	
	
	$scope.sharePopUp = function($event) {
			var tpl = $templateCache.get('views/DemoViews/shareDetailsInfo.html');
			var shareData = getShareData();
			var scope = $rootScope.$new();
			scope.closeDialog = $mdDialog.cancel;
			$scope.modalConfig = {
				template: '<md-dialog flex><md-toolbar><div class="md-toolbar-tools"><h3>Share Details</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar><md-dialog-content>' 
				+ tpl +				
				'</md-dialog-content></md-dialog>',
				clickOutsideToClose: true,
				locals: {
					fields: shareData.fieldsToShow,
					shareDetails: shareData.dataToShow
				},
				scope: scope,
				controller: DialogController
			};
			$mdDialog.show($scope.modalConfig);
			function DialogController($scope, $mdDialog, fields, shareDetails) {
				$scope.data = shareDetails;
				$scope.fields = fields;
			}
	}
	
   $scope.userName='Venkata Krishna';
   
   
   $scope.sharePopUp6 = function($event) {			
		   $scope.items=['1','2','3','4','5','6'];  
		   $scope.fieldsToShow = ['PurchaseDate', 'Volume', 'SharePrice','Status','Amount'];		   
		   var parentEl = angular.element(document.body);
		   var tpl = $templateCache.get('views/DemoViews/shareDetailsInfo.html');
		   $mdDialog.show({
			 parent: parentEl,
			 targetEvent: $event,
			 template:'<md-dialog aria-label="List dialog"> <md-toolbar><div class="md-toolbar-tools"><h3>Share Details</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar>' +
           '  <md-dialog-content>'+
		   '	<div layout="column" layout-fill class="alert-details">'+
		   '	<div layout="column" layout-wrap class="alert-summary cross-details">'+
		   '		<div class="shares-table">'+
		   '		<table style="width: 100%;">'+
		   '		<thead>'+
		   '		<tr>'+
		   '		<th ng-repeat="field in fields">{{field}}</td>'+
		   '	</tr>'+
		   '	</thead>'+
		   '	</table>'+
		   '	</div>'+
		   '	</div>'+
		   '	</div>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
			 locals: {
			   items: $scope.items,
			   fields: $scope.fieldsToShow
			 },
			 controller: DialogController
		  });
		  function DialogController($scope, $mdDialog, items,fields) {
			$scope.items = items;
			$scope.fields = fields;
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			}
		  }
	}
   
   
   $scope.sharePopUp3=function() {	
      alert = $mdDialog.alert()
        .title('Attention, ' + $scope.userName)
        .textContent('This is an example of how easy dialogs can be!')
        .ok('Close');
      $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
    };
	
   $scope.sharePopUp4=function() {
	   $mdDialog.show({
		  clickOutsideToClose: true,
		  scope: $scope,        // use parent scope in template
		  preserveScope: true,  // do not forget this if use parent scope
		  // Since GreetingController is instantiated with ControllerAs syntax
		  // AND we are passing the parent '$scope' to the dialog, we MUST
		  // use 'vm.<xxx>' in the template markup
		  template: '<md-dialog>' +
					'  <md-dialog-content>' +
					'     Hi There {{userName}}' +
					'  </md-dialog-content>' +
					'</md-dialog>',
		  controller: function DialogController($scope, $mdDialog) {
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			}
		  }
	   });
   };
   
   
    $scope.test=function() {
		console.log($scope.user.title);
		console.log($scope.user.submissionDate);
		console.log($scope.user.city);
   };
		
		
	
	
	function getShareData() {
		var fieldsToShow = ['PurchaseDate', 'Volume', 'SharePrice','Status','Amount'];			
		/*var data =   [{ 'PurchaseDate':'2016/07/10', 'Volume':'20', 'SharePrice':'20','Status':'Sold','Amount':'40'},
					  { PurchaseDate:'2016/04/08', Volume:'10', SharePrice:'20',Status:'Sold',Amount:'200'},
					  { PurchaseDate:'2015/02/06', Volume:'20', SharePrice:'20',Status:'Sold',Amount:'400'},
					  { PurchaseDate:'2014/03/05', Volume:'25', SharePrice:'20',Status:'Sold',Amount:'500'},
					  { PurchaseDate:'2013/06/14', Volume:'16', SharePrice:'20',Status:'Sold',Amount:'320'},
					  { PurchaseDate:'2012/07/12', Volume:'100', SharePrice:'20',Status:'Sold',Amount:'2000'}];*/
					  
		var data =   [{ PurchaseDate:'2016/07/10', Volume:'20', SharePrice:'20',Status:'Sold',Amount:'40'}];
		//var dataToShow = _.pick(alert.details.alertDetails,fieldsToShow);
		//var dataToShow = _.pick(data, fieldsToShow);
		return {
			fieldsToShow: fieldsToShow,
			dataToShow: data
		};
	}
	
	
	  function getShareDetails() {           
           var dataToShow=[{ PurchaseDate:'2016/07/10', Volume:'20', SharePrice:'20',Status:'Sold',Amount:'40'},
						{ PurchaseDate:'2016/04/08', Volume:'10', SharePrice:'20',Status:'Sold',Amount:'200'},
					  { PurchaseDate:'2015/02/06', Volume:'20', SharePrice:'20',Status:'Sold',Amount:'400'},
					  { PurchaseDate:'2014/03/05', Volume:'25', SharePrice:'20',Status:'Sold',Amount:'500'},
					  { PurchaseDate:'2013/06/14', Volume:'16', SharePrice:'20',Status:'Sold',Amount:'320'},
					  { PurchaseDate:'2012/07/12', Volume:'100', SharePrice:'20',Status:'Sold',Amount:'2000'}];							
		
          return {
					dataToShow: dataToShow
		  };
        }

	
	$scope.$on('addTeamMember', function (event,res) {
					var empData = $scope.employeesGridOptions.data;
					empData.push(res.member);
					//vm.gridOptions.data = res.users;			
					$scope.employeesGridOptions.data=empData;
    });
	
	
	$scope.$on('addShare', function (event,res) {
					var sharesData = $scope.crossNoSecuritiesGridOptions.data;
					sharesData.push(res.share);
					//vm.gridOptions.data = res.users;			
					$scope.crossNoSecuritiesGridOptions.data=sharesData;
    });
		
		
		
		
	$scope.addMember = function($event) { 
				//var tpl = $templateCache.get('addShare.html');
                var scope = $rootScope.$new();
                scope.closeDialog = $mdDialog.cancel;
                $scope.modalConfig = {
                    template: '<md-dialog flex><md-toolbar><div class="md-toolbar-tools"><h3>Add Team Member</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar><md-dialog-content>'  												
						//+ '<div layout="column" ng-cloak class="md-inline-form"><md-content md-theme="docs-dark" layout-gt-sm="row" layout-padding><div> '
						//+ '<md-input-container> <label>Title</label>  <input ng-model="user.title"> </md-input-container> <md-input-container> <label>Email</label> <input ng-model="user.email" type="email"> '
						//+ '</md-input-container></div></md-content></div>'
						
						+'<div layout="column" ng-cloak class="md-inline-form">'
						//+'  <md-content md-theme="docs-dark" layout-gt-sm="row" layout-padding>'
						+'  <md-content md-theme="docs-dark" layout-gt-sm="row" layout-padding>'
						+'<div> <md-input-container><label>Title</label>'
						+'	<input ng-model="user.role">  </md-input-container>'
						+'			<md-input-container> <label>Email</label>'
						+'				<input ng-model="user.email" type="email">'
						+'			</md-input-container>'
						+'			<md-input-container> <label>Technology</label>'
						+'				<input ng-model="user.technology">'
						+'			</md-input-container>'
						+'	</div>'
						+' </md-content>'
						+'<md-content md-theme="docs-dark" layout-padding>'
						+'	<div>'
						+'	  <form name="userForm">'
						+'		<div layout-gt-xs="row">'
						+'		  	<md-input-container class="md-block" flex-gt-xs>'
						+'				<label>Company (Disabled)</label>'
						+'				<input ng-model="user.company" disabled>'
						+'		  	</md-input-container>'
						+'			<md-input-container> <label>Project</label>'
						+'				<input ng-model="user.project">'
						+'			</md-input-container>'
						+'		  	<md-datepicker ng-model="user.submissionDate" md-placeholder="Enter date"></md-datepicker>'
						+'		</div>'
						+'		<div layout-gt-sm="row">'
						+'		  <md-input-container class="md-block" flex-gt-sm>'
						+'			<label>First name</label>'
						+'			<input ng-model="user.firstName">'
						+'		  </md-input-container>'
						+'		  <md-input-container class="md-block" flex-gt-sm>'
						+'			<label>Last Name</label>'
						+'			<input ng-model="user.lastName">'
						+'		  </md-input-container>'
						+'		</div>'
						+'		<md-input-container class="md-block"> <label>Address</label> <input ng-model="user.address"></md-input-container>'
						+'		<md-input-container md-no-float class="md-block"><input ng-model="user.address2" placeholder="Address 2"></md-input-container>'
						+'			<div layout-gt-sm="row">'
						+'				<md-input-container class="md-block" flex-gt-sm><label>City</label><input ng-model="user.city"></md-input-container>'
						+'		  		<md-input-container class="md-block" flex-gt-sm><label>province</label><md-select ng-model="user.province">'
						+'			  		<md-option ng-repeat="province in provinces" value="{{province.abbrev}}">{{province.abbrev}}</md-option></md-select>'
						+'		  		</md-input-container>'
						+'		  		<md-input-container class="md-block" flex-gt-sm>'
						+'						<label>Postal Code</label>'
						+'						<input name="postalCode" ng-model="user.postalCode" placeholder="12345" required ng-pattern="/^[0-9]{5}$/" md-maxlength="5">'
						//+'							<div ng-messages="userForm.postalCode.$error" role="alert" multiple>'
						//+'			  					<div ng-message="required" class="my-message">You must supply a postal code.</div>'
						//	+'			  					<div ng-message="pattern" class="my-message">That doesn''t look like a valid postal code. </div>'
						//	+'			  					<div ng-message="md-maxlength" class="my-message">Don''t use the long version silly...we don''t need to be that specific...</div>'
						//		+'						</div>'
						+'		  		</md-input-container>'
						+'			</div>'
						+'		<md-input-container class="md-block">'
						+'		  <label>Biography</label>'
						+'		  <textarea ng-model="user.biography" md-maxlength="150" rows="5" md-select-on-focus></textarea>'
						+'		</md-input-container>'
						+'	  </form>'
						+'	</div> </md-content> '
						+'</div>	'
						+' <div align="right"> '
						+' <md-button class="md-raised md-primary" ng-click="add($event)" >Save & Close</md-button>'
						+' <md-button class="md-raised md-primary" ng-click="closeDialog()" >Cancel</md-button> </div>'
						+ '</md-dialog-content></md-dialog>',
                    clickOutsideToClose: true,
                    locals: {
                       //shareDetails: thresholdData.dataToShow
                    },
                    scope: scope,						
                    controller: DialogController
                };
                $mdDialog.show($scope.modalConfig);

                function DialogController($scope, $mdDialog) {	
				    var pa = $scope;   
					$scope.user = {
						  role: '',
						  email: '',
						  firstName: '',
						  lastName: '',
						  company: 'Investco',
						  address: '',
						  city: '',
						  province: '',
						  project: '',
						  Country: 'Canada',
						  biography: '',
						  postalCode: ''
					};
					$scope.provinces = ('Alberta BritishColumbia Manitoba NewBrunswick NewfoundlandAndLabrador NorthwestTerritories* NovaScotia Nunavut* Ontario PrinceEdwardIsland Quebec Saskatchewan YukonTerritory*').split(' ').map(function(province) {
							return {abbrev: province};
					});
					
					$scope.add = (function(param){
						console.log($scope.user.role);
						console.log($scope.user.submissionDate);
						console.log($scope.user.city);
						//test();
						var member= {firstName:$scope.user.firstName,lastName:$scope.user.lastName,role:$scope.user.role,technology:$scope.user.technology,project:$scope.user.project,email:$scope.user.email};
						$rootScope.$broadcast('addTeamMember', {"member" : member});
						$mdDialog.hide();
					});
					
					
                }
        };
		
		
		$scope.addShare = function($event) { 
                var scope = $rootScope.$new();
                scope.closeDialog = $mdDialog.cancel;
                $scope.modalConfig = {
                    template: '<md-dialog flex><md-toolbar><div class="md-toolbar-tools"><h3>Add Share</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar><md-dialog-content>'  																								
						+'<div layout="column" ng-cloak class="md-inline-form">'
						+'  <md-content md-theme="docs-dark" layout-gt-sm="row" layout-padding>'
						+'  	<div> <md-input-container><label>Name</label>'
						+'					<input ng-model="share.name">  </md-input-container>'
						+'				<md-input-container> <label>Price</label>'
						+'					<input ng-model="share.price" >'
						+'				</md-input-container>'
						+'				<md-input-container> <label>Country</label>'
						+'					<input ng-model="share.country">'
						+'				</md-input-container>'
						+'		</div>'
						+' </md-content>'
						+'<md-content md-theme="docs-dark" layout-padding>'
						+'	<div>'
						+'	  <form name="userForm">'
						+'		<div layout-gt-xs="row">'
						+'			<md-input-container> <label>Units</label>'
						+'				<input ng-model="share.units">'
						+'			</md-input-container>'
						+'		  <md-input-container>'
						+'			<label>Amount</label>'
						+'			<input ng-model="share.amount">'
						+'		  </md-input-container>'
						+'		  	<md-datepicker ng-model="share.date" md-placeholder="Enter date"></md-datepicker>'
						+'		</div>'
						+'		<div layout-gt-sm="row">'
						+'		  <md-input-container class="md-block" flex-gt-sm>'
						+'			<label>Details</label>'
						+'			<input ng-model="share.details">'
						+'		  </md-input-container>'
						+'		</div>'
						+'	  </form>'
						+'	</div> '
						+' </md-content> '
						+'</div>	'
						+' <div align="right"> '
						+' <md-button class="md-raised md-primary" ng-click="add($event)" >Save & Close</md-button>'
						+' <md-button class="md-raised md-primary" ng-click="closeDialog()" >Cancel</md-button> </div>'
						+ '</md-dialog-content></md-dialog>',
                    clickOutsideToClose: true,
                    locals: {
                       //shareDetails: thresholdData.dataToShow
                    },
                    scope: scope,						
                    controller: DialogController
                };
                $mdDialog.show($scope.modalConfig);

                function DialogController($scope, $mdDialog) {	
				    var pa = $scope;   
					$scope.share = {
						  name: '',
						  price: '',
						  country: '',
						  status: '',
						  units: '',
						  amount: '',
						  details:'',
						  date:''
					};					
					
					$scope.add = (function(param){
						var share= {name:$scope.share.name,price:$scope.share.price,country:$scope.share.country,status:'Profit',units:$scope.share.units,amount:$scope.share.amount,date:'09/08/2016'};
						$rootScope.$broadcast('addShare', {"share" : share});
						$mdDialog.hide();
					});
					
					
                }
        };
		
		
	
	$scope.openBottomSheet = function() {
		$mdBottomSheet.show({
		  template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
		});
	};

		
		
		
	 $scope.shareDetailsPopUp = function($event) {
                var tpl = $templateCache.get('');
                var thresholdData = getShareDetails();
                var scope = $rootScope.$new();
                scope.closeDialog = $mdDialog.cancel;
                $scope.modalConfig = {
                    template: '<md-dialog flex><md-toolbar><div class="md-toolbar-tools"><h3>Share Details</h3><span flex></span><i class="material-icons" ng-click="closeDialog()">close</i></div></md-toolbar><md-dialog-content>' + 
						'<div id="equity-cross-priorAlerts-grid" ui-grid="priorAlertsGridOptions" ui-grid-move-columns ui-grid-resize-columns class="market-grid"></div> '+
						'</md-dialog-content></md-dialog>',
                    clickOutsideToClose: true,
                    locals: {
                       shareDetails: thresholdData.dataToShow
                    },
                    scope: scope,						
                    controller: DialogController
                };
                $mdDialog.show($scope.modalConfig);

                function DialogController($scope, $mdDialog, shareDetails) {	
				    var pa = $scope;                    
                    var priorAlertsData = []; 		
                    if (Array.isArray(shareDetails)) {
                    	priorAlertsData = shareDetails;
                    } else if (shareDetails!="No Value"){
                    	priorAlertsData.push(shareDetails);
                    }

                   pa.priorAlertsGridOptions = {
                       	minRowsToShow:Math.min(shareDetails!="No Value"?shareDetails:1,20),
                        excessRows: 20,
                        excessColumns: 10,
                        enableFiltering: true,
                        enableSorting: true,
                        enableColumnMenus: false,
                        enableColumnResizing: true,
                        enableHiding: false,
                        enableHorizontalScrollbar: 0,
                        //enableVerticalScrollbar: 1,
                        onRegisterApi: function(gridApi) {
                            $scope.priorAlertsGridGridApi = vm.priorAlertsGridGridApi = gridApi;
                        },
                         columnDefs: getColsPriorAlertsData(),
                         data: priorAlertsData
                    };
					
					pa.displayAlertSummery = (function(param){
						console.log(param);
						$mdDialog.hide();
						$state.go('form.f1race');
					});
				   
                    function getColsPriorAlertsData() {
                        var cols = [{
                            field: 'PurchaseDate',
                            displayName: 'Purchase Date',
                           // headerCellTemplate: headerCellTemplateHtml,
                            displayOrder: 10,
                            headerTooltip: true,
                            cellTooltip: true,
        					headerCellClass: "center",
                            filterCellFiltered: true,
                            minWidth: 150,
                            enableHiding: false
                        },
                        {
                            field: 'Status',
                            displayName: 'Status',
							cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.displayAlertSummery(row)">{{ COL_FIELD }}</a></div>',
                            displayOrder: 20,
                            headerTooltip: true,
                            cellTooltip: true,
        					headerCellClass: "center",
                            filterCellFiltered: true,
                            minWidth: 225,
                            enableHiding: false
                        },{
                            field: 'SharePrice',
                            displayName: 'SharePrice',
                            displayOrder: 30,
                            headerTooltip: true,
                            cellTooltip: true,
        					headerCellClass: "center",
                            filterCellFiltered: true,
                            width: 90,
                            enableHiding: false
                        },
        				{
        					field: 'Volume',
        					displayName: 'Volume',
        				   // width: '*',
        					displayOrder: 40,
        					headerTooltip: true,
        					cellTooltip: true,
        					headerCellClass: "center",
        					filterCellFiltered: true,
                            width: 90,
        					enableHiding: false
        				},
        				{
        					field: 'Amount',
        					displayName: 'Amount',
        					displayOrder: 50,        					
        					headerTooltip: true,
        					cellTooltip: true,
        					headerCellClass: "center",
        					filterCellFiltered: true,
                            minWidth: 100,
        					enableHiding: false
        				}
                        ];
                        cols = sortByDisplayOrder(cols);
                        return cols;
                    }
                    //Market Data End

                    //Utility Start
                    function sortByDisplayOrder(colArr) {
                        colArr.sort(function(a, b) {
                            return a.displayOrder - b.displayOrder;
                        });
                        return colArr;
                    }
                }
        };
})

// Form profile Controller
.controller('profileController', function($scope,$state) {
	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales","Online Sales","abc Sales","xyz Sales","test Sales"];
	$scope.data = [300, 500, 100,600,200,300,400];	
	
	Highcharts.chart('container', {
      title: {text: 'Sales Data'},
      xAxis: {categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']},
      series: [{data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]}]
    });
})

// Temp1 Controller
.controller('temp1Controller', function($scope,$state,$stateParams,shareDataService) {
	$scope.project1 = 'InSync';
	$scope.project2 = 'UNO';
	$scope.project3 = 'PDAO';
	
	$scope.chnageState = function(statename){		
		if(statename =='F1App'){
			shareDataService.data.name='krishna';
			$state.go('form.f1race',{name:'Krishna'});
			console.log('state2 params:', $stateParams);
			console.log('state2 params:', shareDataService.data);
		}else{
			$state.go('login',{name:'Krishna'});
		}
	};		
	
  })
  
// Temp2 Controller
.controller('temp2Controller', function($scope) {
		$scope.province = 'Ontario';
		$scope.city = 'Toronto';
		$scope.country = 'Canada';
  })
  
.config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
})
  
/* Drivers controller */
 .controller('driversController', function($scope, ergastAPIservice,$rootScope,$mdDialog) {
	$scope.nameFilter = null;
	$scope.driversList = [];
	$scope.searchFilter = function (driver) {
		var re = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
	};

	 $scope.gotoDriver = function (driver) {
		var driv =driver;
	};
	
	ergastAPIservice.getDrivers().success(function (response) {
		//Digging into the response to get the relevant data
		$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	});
	
	$scope.sharePopUp1 = function(event) {
				var scopePop = $rootScope.$new();
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: scopePop,        
                  preserveScope: true,           
                  template: '<md-dialog>' +
                              '  <md-dialog-content>' +
                              '        Its Popup    :)' +
                              '  </md-dialog-content>' +
                              '</md-dialog>',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
         };
	
  })  
  /* Driver controller */
  .controller('driverController', function($scope, $stateParams, ergastAPIservice) {
	$scope.id = $stateParams.driverid;
	$scope.races = [];
	$scope.driver = null;

	ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
		$scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
	});

	ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
		$scope.races = response.MRData.RaceTable.Races; 
	}); 
  })  
  /*log in Controller */
 .controller('loginController',
		['$scope', '$rootScope', '$location', 'AuthenticationService',
		function ($scope, $rootScope, $location, AuthenticationService) {
			// reset login status
			AuthenticationService.ClearCredentials();	 
			$scope.login = function () {
				$scope.dataLoading = true;
				AuthenticationService.Login($scope.username, $scope.password, function(response) {
					if(response.success) {
						AuthenticationService.SetCredentials($scope.username, $scope.password);
						$location.path('/');
					} else {
						$scope.error = response.message;
						$scope.dataLoading = false;
					}
				});
			};
	}])	
  /* InstantSearchController controller */
  .controller('InstantSearchController', function($scope) {
	$scope.items = [
	{
		url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
		title: '50 Must-have plugins for extending Twitter Bootstrap',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
		title: 'Making a Super Simple Registration System With PHP and MySQL',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
		title: 'Create a slide-out footer with this neat z-index trick',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/06/digital-clock/',
		title: 'How to Make a Digital Clock with jQuery and CSS3',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
		title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
		title: 'Mini AJAX File Upload Form',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg'
	},
	{
		url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
		title: 'Your First Backbone.js App – Service Chooser',
		image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
	}
];
})
.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';
  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'resources/views/bottomsheet/bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };
  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'resources/views/bottomsheet/bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: false
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .textContent(clickedItem['name'] + ' clicked!')
              .position('top right')
              .hideDelay(1500)
          );
    });
  };
})
.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy2' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
		  
/* GridPagination controller */
.controller('gridPaginationController', function($scope,$http,uiGridConstants) {		
  var paginationOptions = {
	pageNumber: 1,
	pageSize: 25,
	sort: null
  };  
  $scope.gridOptions = {
	paginationPageSizes: [25, 50, 75],
	paginationPageSize: 25,
	useExternalPagination: true,
	useExternalSorting: true,
	columnDefs: [
	  { name: 'name' },
	  { name: 'gender', enableSorting: true },
	  { name: 'company', enableSorting: true }
	],
	onRegisterApi: function(gridApi) {
	  $scope.gridApi = gridApi;
	  $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		if (sortColumns.length == 0) {
		  paginationOptions.sort = null;
		} else {
		  paginationOptions.sort = sortColumns[0].sort.direction;
		}
		getPage();
	  });
	  gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
		paginationOptions.pageNumber = newPage;
		paginationOptions.pageSize = pageSize;
		getPage();
	  });
	}
  };
  var getPage = function() {
	var url;
	switch(paginationOptions.sort) {
	  case uiGridConstants.ASC:
		url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
		break;
	  case uiGridConstants.DESC:
		url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
		break;
	  default:
		url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
		break;
	}

	$http.get(url).success(function (data) {
	  $scope.gridOptions.totalItems = 100;
	  var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
	  $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
	});
};
getPage();		
});