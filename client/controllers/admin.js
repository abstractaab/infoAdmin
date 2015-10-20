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
					Materialize.toast(error.reason, 2000);
				}
				else {
					Materialize.toast(result, 2000);
				}
			});
	}
});