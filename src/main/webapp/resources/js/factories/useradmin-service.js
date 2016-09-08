
(function () {
    angular.module('inSync.factories').factory('useradminService', function ($q, $http) {

        function onError(error, state) {
            notification.error('An error occurred retrieving your ' + state + ' alerts. Please contact your system administrator.');
        }     
        
        function getAdminUsers() {
             return $http.post(envService.read('alertsApiEndpoint') + 'AdminUsersList', null, {
                resultPath: 'responseData.data.adminUsersList'
            }).then(function (response) {
                return response.data;
            }).catch(function onError(error) {
                notification.error('An error occurred retrieving users list. Please contact your system administrator.');
            });
        }
		
		 function getAllGroups() {
             return $http.post(envService.read('alertsApiEndpoint') + 'AdminAllGroups', null, {
                resultPath: 'responseData.data'
            }).then(function (response) {
                return response.data;
            }).catch(function onError(error) {
                notification.error('An error occurred retrieving users list. Please contact your system administrator.');
            });
        }
		 
		  function getDownloadUsers(userIds) {
	            var formData = new FormData();
	            formData.append('user_ids', userIds);
	            return $http.post(envService.read('alertsApiEndpoint') + 'get/' + 'adminUsersexport',formData, {
	                responseType: "arraybuffer",
	                params: {user_ids: userIds}
	            });
	        }
		
		function removeAdminUser(soeId) {
            var params = {
            		user_id: soeId
            };
             return $http.post(envService.read('alertsApiEndpoint') + 'AdminDeleteUser', null, {
                params: params, resultPath: 'responseData.data'
            }).then(function (response) {
				if(response.data.status ==='success'){
					return response;
				}else{
					notification.error('An error occurred while Removing User. Please contact your system administrator.');
				}
            }).catch(function onError(error) {
                notification.error('An error occurred while Removing User. Please contact your system administrator.');
            });
        }
		
		function updateAdminUser(soeId,fullName,email,fid,geid,fid_description,emer_user,groups,active) {
			var params = {
            		user_id: soeId,
					fullname:fullName,
					email:email,
					fid:fid,
					geid:geid,
					fid_description:fid_description,
					emer_user:emer_user,
					groups:groups,
					active:active
					
            };		
		  return $http.post(envService.read('alertsApiEndpoint') + 'AdminModifyUser', null, {
                params: params,resultPath: 'responseData.data'
            }).then(function (response) {
					return response.data;
            });			
        }
		
		function addAdminUser(soeId,name,emailAddress,fid,geid,fid_description,emer_user,groups,fidUserName) {
			var params = {
            		user_id: soeId,
					fullname:name,
					email:emailAddress,
					fid:fid,
					geid:geid,
					fid_description:fid_description,
					emer_user:emer_user,
					groups:groups,
					fid_userName:fidUserName
            };		
		  return $http.post(envService.read('alertsApiEndpoint') + 'AdminAddUser', null, {
                params: params,resultPath: 'responseData.data'
            }).then(function (response) {
					return response.data;
            });
        }
		
		 function getAuditHistory(userId) {
            var params = {
            		user_id: userId
            };
             return $http.post(envService.read('alertsApiEndpoint') + 'AdminUserAuditHistory', null, {
                params: params, resultPath: 'responseData.data'
            }).then(function (response) {
                return response.data;
            }).catch(function onError(error) {
                notification.error('An error occurred retrieving users list. Please contact your system administrator.');
            });
        }
		
		function getUsersFromXSU(search) {
            var params = {
            		user_name: search
            };
             return $http.post(envService.read('alertsApiEndpoint') + 'AdminUserFromXSU', null, {
                params: params, resultPath: 'responseData.data'
            }).then(function (response) {
                return response.data;
            }).catch(function onError(error) {
                notification.error('An error occurred retrieving users list from XSU. Please contact your system administrator.');
            });
        }

        function getUsers(includeClosed) {
            var allUsers = [];
            var promises = [];

            promises.push(getAllUsers());
            //promises.push(getAlertsInProgress());

            return $q.all(promises).then(function (dataArray) {
                angular.forEach(dataArray, function (data) {
                    if (data) {
                        allUsers = allUsers.concat(data);
                    }
                });
                return allUsers;
            });
        }

        function getAllUsers(searchParams) {
            return getUsersList('users', searchParams);
        }
        
        function getUserListForAGroup(groupId,searchText){
        	return $http.get(envService.read('alertsApiEndpoint') + 'userlist', {
                params: {group_id: groupId,filter_criteria: searchText},
                resultPath:'responseData.data.userDetails'
            });
        } 
		
        return {
            getUsers : getUsers,
            getAllUsers : getAllUsers,
			getAllGroups : getAllGroups,
          //getEntitlementsSummary : getEntitlementsSummary,            
            getUserListForAGroup : getUserListForAGroup,
			getAdminUsers : getAdminUsers,
			getAuditHistory : getAuditHistory,
			getUsersFromXSU : getUsersFromXSU,
			removeAdminUser : removeAdminUser,
			updateAdminUser : updateAdminUser,
			addAdminUser : addAdminUser,
			getDownloadUsers: getDownloadUsers
        };		
		
    }).factory('useradminModel', function ($rootScope, useradminService) {
        var model = {
            users: [], isInitialized: false
        };

        (function init() {
            loadUsers();
        })();

        function loadUsers() {
             /*useradminService.getAdminUsers().then(function (response) {
                    _.forEach(response, function (user) {
                            model.users.push(user);
                        });
                    model.isInitialized = true;
                });
			*/
		model.users=[{	soeId:'VK29544',
						fullName:'Venkat',
						region:'NAM',
						country:'India',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'a@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Business Analyst',groupId:'BusinessAnalyst',roleId:'BA',roleName:'Business Analyst'},
									   {groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'},
									   {groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
									   {groupName:'Level3',groupId:'Level3',roleId:'Level3',roleName:'Level3'},
									   {groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'}]},
					{   soeId:'RK1234',
						fullName:'Krishna',
						region:'APAC',
						country:'Canada',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'N',
						email:'b@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Nam Manager',groupId:'NamManager',roleId:'NM',roleName:'Nam Manager'},
									   {groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'},
										{groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
									   {groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'}]},
					{	soeId:'RB5678',
						fullName:'Robert',
						region:'NAM',
						country:'Canada',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'c@invesco.com',
						emer_user:'N',
						active:'N',
						userGroupList:[{groupName:'Business Analyst',groupId:'BusinessAnalyst',roleId:'BA',roleName:'Business Analyst'},
										{groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
										{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
										{groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'}]},
					{   soeId:'SR3467',
						fullName:'Sheetal',
						region:'Global',
						country:'India',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'Y',
						email:'d@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
										{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
										{groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
									   {groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'}]},
					{	soeId:'SR29556',
						fullName:'Srini',
						region:'NAM',
						country:'USA',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'e@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Nam Manager',groupId:'NamManager',roleId:'NM',roleName:'Nam Manager'},
										{groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
										{groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
										{groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'}]},
					{   soeId:'KV29544',
						fullName:'Vidhir',
						region:'AUS',
						country:'Australia',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'Y',
						email:'f@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
										{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
										{groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
									   {groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'}]},
					{	soeId:'MH29544',
						fullName:'Mahi',
						region:'ASIA',
						country:'India',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'g@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
										{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
										{groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
										{groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'}]},
					{   soeId:'RK29544',
						fullName:'Krishna',
						region:'SAM',
						country:'Canada',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'N',
						email:'h@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Business Analyst',groupId:'BusinessAnalyst',roleId:'BA',roleName:'Business Analyst'},
									   {groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
									   {groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
									   {groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'}]},
					{	soeId:'KN8745',
						fullName:'Ken',
						region:'SAM',
						country:'India',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'i@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:	[{groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'},
										{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
										{groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
										{groupName:'Nam Manager',groupId:'NamManager',roleId:'NM',roleName:'Nam Manager'}]},
					{   soeId:'MH7856',
						fullName:'Mahesh',
						region:'NAM',
						country:'Canada',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'N',
						email:'j@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
										{groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
										{groupName:'Level1',groupId:'Level1',roleId:'Level1',roleName:'Level1'},
									   {groupName:'Nam Analyst',groupId:'NamAnalyst',roleId:'NA',roleName:'Nam Analyst'}]},
					{   soeId:'SR5678',
						fullName:'Srihari',
						region:'NAM',
						country:'India',
						createdts:'2014/08/06',
						fid_description:'Test1',fid:'N',
						email:'k@invesco.com',
						emer_user:'N',
						active:'Y',
						userGroupList:[{groupName:'Nam Manager',groupId:'NamManager',roleId:'NM',roleName:'Nam Manager'},
										{groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'},
										{groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
										{groupName:'BM Owner',groupId:'BMOwner',roleId:'BM',roleName:'BM Owner'}]},
					{   soeId:'HG2346',
						fullName:'Hong',
						region:'APAC',
						country:'China',
						createdts:'2014/08/06',
						fid_description:'Test2',
						fid:'Y',
						email:'l@invesco.com',
						emer_user:'N',
						active:'N',
						userGroupList:[{groupName:'Cluster Owner',groupId:'ClusterOwner',roleId:'CO',roleName:'Cluster Owner'},
									   {groupName:'SSU Group',groupId:'SSUGroup',roleId:'SSU',roleName:'SSU Group'},
									   {groupName:'Level2',groupId:'Level2',roleId:'Level2',roleName:'Level2'},
									   {groupName:'Tech Support',groupId:'TechSupport',roleId:'TechSupport',roleName:'Tech Support'}]}];
			model.isInitialized = true;
        }
        return model;
    });
})();