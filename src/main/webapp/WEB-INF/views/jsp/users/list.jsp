<%@ page session="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<jsp:include page="../fragments/header.jsp" />
<body>


<div class="container">
	
			<h1>Testing.....</h1>
	
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>framework</th>
						<th>Action</th>
					</tr>
				</thead>
	
				
					<tr>
						<td>
							A
						</td>
						<td>B</td>
						<td>C</td>
						<td>D</td>
						<td>
							F
						</td>
					</tr>
				
			</table>
</div>


	<c:if test="${not empty users}">
		<div class="container">
			<c:if test="${not empty msg}">
				<div class="alert alert-${css} alert-dismissible" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<strong>${msg}</strong>
				</div>
			</c:if>
	
			<h1>All Users</h1>
	
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>framework</th>
						<th>Action</th>
					</tr>
				</thead>
	
				<c:forEach var="user" items="${users}">
					<tr>
						<td>
							${user.id}
						</td>
						<td>${user.name}</td>
						<td>${user.email}</td>
						<td><c:forEach var="framework" items="${user.framework}" varStatus="loop">
							${framework}
	    					<c:if test="${not loop.last}">,</c:if>
							</c:forEach></td>
						<td>
							<spring:url value="/users/${user.id}" var="userUrl" />
							<spring:url value="/users/${user.id}/delete" var="deleteUrl" /> 
							<spring:url value="/users/${user.id}/update" var="updateUrl" />
	
							<button class="btn btn-info" onclick="location.href='${userUrl}'">Query</button>
							<button class="btn btn-primary" onclick="location.href='${updateUrl}'">Update</button>
							<button class="btn btn-danger" onclick="this.disabled=true;post('${deleteUrl}')">Delete</button>
						</td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</c:if>
	<c:if test="${empty users}">
		<!-- 
			<div ng-app="app" class="container">
				<div class="home-section">
				    <ul class="menu-list">
				        <li><a href="#/gallery">Photo Gallery</a></li>
				        <li><a href="#/contactus">Contact</a></li>
				    </ul>
				</div>
				<div ng-view></div>
			</div>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-resource.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-resource.min.js"></script>
			<script src="resources/js/app.js"></script>
			<script src="resources/js/controller.js"></script>
			<link rel="stylesheet" href="./webjars/bootstrap/3.3.6/css/bootstrap.css">
		-->
		
				
		 <!-- <div class="container" style="width:1700px;">-->
		<div ng-app="inSync" class="container">
	        <!-- views will be injected here -->
	        <div ui-view class="container"></div>
	    </div>
		
		<!-- CSS -->
		<link rel='stylesheet' href='//fonts.googleapis.com/css?family=Roboto:400,100,400italic,100italic,700,700italic,300,300italic,500,500italic,900italic,900'>
	    <link rel="stylesheet" href="resources/core/css/style.css">
		<link rel="stylesheet" href="resources/core/css/main.css">
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootswatch/3.1.1/darkly/bootstrap.min.css">
		<link rel="stylesheet" href="http://ui-grid.info/release/ui-grid-unstable.css" type="text/css">
		<link rel="stylesheet" href="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0-rc.5/angular-material.css">
		<link rel="stylesheet" href="https://material.angularjs.org/1.1.0-rc.5/docs.css">
		<link rel="stylesheet" href="resources/core/css/user-admin.css"> 
		<link rel="stylesheet" href="resources/core/css/user-details.less"> 
		<link rel="stylesheet" href="resources/core/css/admin-list.less"> 
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="resources/core/css/customStyles.css"> 
		
		<!-- Angular Material Side Navigation-->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
		<script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js"></script>
		<script src="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0-rc.5/angular-material.js"></script>
	    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js"></script>    
		<script src="bower_components/angular-ui-grid/ui-grid.js"></script>
	    
		
		<script src="resources/js/controllers/app.js"></script>
		<script src="resources/js/controllers/controllers.js"></script>
		<script src="resources/js/controllers/user-admin.controller.js"></script>
		<script src="resources/js/controllers/user.controller.js"></script>	
		<script src="resources/js/controllers/user-audithistory.controller.js"></script>
		<script src="resources/js/controllers/user-summary.controller.js"></script>
		<script src="resources/js/controllers/add-user.controller.js"></script>
		
		<!--<script src="controllers/empty-inbox.controller.js"></script>-->
		<script src="resources/js/factories/factories.js"></script>
		<script src="resources/js/factories/useradmin.factory.js"></script>
		<script src="resources/js/factories/useradmin.model.js"></script>
		<script src="resources/js/factories/useradmin-service.js"></script>
		<!-- End -->
		
		<!-- For Grid Display -->
	
	    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-touch.js"></script>
	    <script src="http://ui-grid.info/docs/grunt-scripts/csv.js"></script>
	    <script src="http://ui-grid.info/docs/grunt-scripts/pdfmake.js"></script>
	    <script src="http://ui-grid.info/docs/grunt-scripts/vfs_fonts.js"></script>
	    <script src="http://ui-grid.info/release/ui-grid-unstable.js"></script>
		<!-- End -->
		
		<!-- High Chart -->
		<script src="https://code.highcharts.com/highcharts.js"></script>
	
		
		<!--  <script src="bower_components/Chart.js/Chart.min.js"></script>-->
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script>
		<script src="bower_components/angular-chart.js/dist/angular-chart.min.js"></script>  -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
		<script src="https://cdn.jsdelivr.net/angular.chartjs/1.0.1/angular-chart.min.js"></script>
		<script src="bower_components/jquery/dist/jquery.js"></script>		
		<script src="bower_components/angular-filter/dist/angular-filter.js"></script> 
		<!-- <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script> 
		<script src="bower_components/angular-bootstrap/ui-bootstrap.js"></script> 
		<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.1.3/ui-bootstrap-tpls.min.js"></script>
		<script src="bower_components/Sortable/Sortable.js"></script>
		<script src="bower_components/Sortable/ng-sortable.js"></script>
		<script src="bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
		<script src="bower_components/ng-websocket/ng-websocket.js"></script>
		<script src="bower_components/angular-strap/dist/modules/dimensions.js"></script>
		<script src="bower_components/angular-strap/dist/modules/debounce.js"></script>
		<script src="bower_components/angular-strap/dist/modules/scrollspy.js"></script>
		<!--<script src="bower_components/angular-scroll/angular-scroll.js"></script>-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-scroll/1.0.0/angular-scroll.js"></script>
		<script src="bower_components/angular-slimscroll/angular-slimscroll.js"></script>
		<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.5.8/angular-sanitize.js"></script>
		<script src="bower_components/angular-ui-select/dist/select.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.17.1/select.js"></script>
		<script src="bower_components/angular-file-upload/dist/angular-file-upload.min.js"></script>
		<script src="bower_components/object-path/index.js"></script>
		<script src="bower_components/moment/moment.js"></script>
		<script src="bower_components/numeral/numeral.js"></script>
		<script src="bower_components/lodash/lodash.min.js"></script>
		<script src="bower_components/x2js/xml2json.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts-ng/0.0.12/highcharts-ng.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.6/highcharts-more.js"></script>
		<!-- <script src="bower_components/highcharts/lib/highcharts-more.js"></script>
		<script src="bower_components/highcharts-ng/dist/highcharts-ng.js"></script> -->		
		<script src="bower_components/underscore-query/lib/underscore-query.js"></script>
		<script src="bower_components/angular-environment/dist/angular-environment.js"></script>
		<script src="bower_components/typeahead.js/dist/typeahead.bundle.js"></script>
		<script src="bower_components/typeahead.js/dist/bloodhound.js"></script>
		<script src="bower_components/angular-typeahead/angular-typeahead.js"></script>
		<script src="bower_components/angular-toastr/dist/angular-toastr.js"></script>
		<script src="bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>
		<script src="bower_components/sockjs/sockjs.js"></script>
		<script src="bower_components/ng-stomp/ng-stomp.js"></script>
		<script src="bower_components/annotatorjs/pkg/annotator-full.js"></script>
		</c:if>
	<jsp:include page="../fragments/footer.jsp" />

</body>
</html>








