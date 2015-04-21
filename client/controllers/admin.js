Template.admin.events({
	'submit .new-user': function (event) {
		event.preventDefault();
		console.log(event.target.email.value);
		console.log(event.target.password.value);
		Meteor.call(
			'createNewUser', 
			event.target.email.value, 
			event.target.password.value, 
			function (error, result) {
				if(error) {
					toastr.error(error.reason);
				}
				else {
					toastr.success(result);
				}
			});
	}
});