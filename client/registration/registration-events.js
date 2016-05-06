Template.registration.events({
	'submit .form-signin':function(e){
		e.preventDefault();
		var options = {
		email : $("#email").val(),
		password : $("#password").val()
		};
		Accounts.createUser(options,function(error){
			if(error){
				alert(error.reason)
			}
			else{
				Router.go('/home')
			}
		})
	}
});
			