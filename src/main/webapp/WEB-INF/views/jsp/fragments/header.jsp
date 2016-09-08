<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<head>
	<title>Spring MVC Integration with Angular</title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<spring:url value="/resources/core/css/hello.css" var="coreCss" />
	<spring:url value="/resources/core/css/bootstrap.min.css" var="bootstrapCss" />
	<link href="${bootstrapCss}" rel="stylesheet" />
	<link href="${coreCss}" rel="stylesheet" />
</head>

<spring:url value="/" var="urlHome" />
<spring:url value="/users/add" var="urlAddUser"/>
<spring:url value="/users" var="urlUsers"/>
<spring:url value="/inSync" var="urlInsyncApp"/>

<nav class="navbar navbar-inverse ">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="${urlHome}">Invesco Web Application</a>
		</div>
		<div id="navbar">
			<ul class="nav navbar-nav navbar-right">
				<li class="active"><a href="${urlAddUser}">Add User</a></li>&nbsp&nbsp&nbsp
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="active"><a href="${urlUsers}">Users List </a></li>&nbsp&nbsp&nbsp
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="active"><a href="${urlInsyncApp}">In sync </a></li>
			</ul>
		</div>
	</div>
</nav>



