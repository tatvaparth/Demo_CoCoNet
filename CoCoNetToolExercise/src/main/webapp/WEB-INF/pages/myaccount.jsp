<!DOCTYPE html>
<html>
<head>
<title>CoCoNet DEMO</title>
<link href="${pageContext.request.contextPath}/resources/content/bootstrap.min.css"	rel="stylesheet" />	
	<script src="${pageContext.request.contextPath}/resources/app/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/bootstrap.js"></script>	
    <script src="${pageContext.request.contextPath}/resources/app/angular.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/ui-bootstrap-tpls-0.13.4.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/angular-sanitize.js"></script>  
	    
    <script src="${pageContext.request.contextPath}/resources/app/Demo/DemoAPP.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/Demo/Services/AccountService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/Demo/Controller/BaseController.js"></script>
    <script src="${pageContext.request.contextPath}/resources/app/Demo/Controller/AccountController.js"></script>
    <style>
    .ng-touched.ng-invalid.ng-invalid-required{
    border: 1px solid red;
    }
    </style>
</head>
<body ng-app="Demo">
	<div class="container" ng-controller="accountController">
		<section class="header">
			<h1>My Account</h1>
		</section>
		<section class="content">
			<form method="post" name="myaccountForm">

				<div class="form-group">
					<label for="firstName">First name</label> <input type="text"
						class="form-control" id="firstName" placeholder="First name" ng-model="firstName" required="required">
				</div>

				<div class="form-group">
					<label for="lastName">Last name</label> <input type="text"
						class="form-control" id="lastName" placeholder="Last name" ng-model="lastName" required="required">
				</div>

				<div class="form-group">
					<label for="email">Email address</label> <input type="email"
						class="form-control" id="email" aria-describedby="emailHelp"
						placeholder="Enter email" ng-model="email" required="required"> <small id="emailHelp"
						class="form-text text-muted">We'll never share your email
						with anyone else.</small>
				</div>

				<div class="form-group">
					<label for="password">Password</label> <input type="password"
						class="form-control" id="password" placeholder="Password" ng-model="password" required="required"> 
				</div>

				<div class="form-group">
					<label for="designation">Designation</label> <select
						class="form-control" id="designation" ng-model="designation">
						<option value="tr">Trainee</option>
						<option value="ase">Assistant Software Engineer</option>
						<option value="se">Software Engineer</option>
						<option value="sse">Senior Software Engineer</option>
						<option value="tl">Team Leader</option>
						<option value="stl">Senior Team Leader</option>
						<option value="apm">Assistant Project Manager</option>
						<option value="pm">Project Manager</option>
						<option value="dm">Delivery Manager</option>
					</select>
				</div>

				<div class="form-group">
					<label for="aboutyou">About you</label>
					<textarea class="form-control" id="aboutyou" rows="3" ng-model="aboutyou"></textarea>
				</div>
				
				<fieldset class="form-group">

					<legend>Gender</legend>
					<div class="form-check">
						<label class="form-check-label"> <input type="radio"
							class="form-check-input" name="gender" id="male" value="m"
							checked ng-model="gender"> Male
						</label>
					</div>

					<div class="form-check">
						<label class="form-check-label"> <input type="radio"
							class="form-check-input" name="gender" id="female"
							value="f" ng-model="gender"> Female
						</label>
					</div>

				</fieldset>

				<div class="form-check">
					<label class="form-check-label"> <input type="checkbox"
						class="form-check-input" name="termandconditions" id="termandconditions" ng-model="termandconditions"> Accept term and conditions
					</label>
				</div>

				<button type="button" class="btn btn-primary" ng-click="vm.SaveDetails()" ng-disabled="myaccountForm.$invalid">Submit</button>
			</form>
		</section>
	</div>
</body>
</html>