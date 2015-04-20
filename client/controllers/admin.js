Template.admin.events({
	'submit .new-user': function (event) {
		event.preventDefault();
		Session.set('createError', null);
		Session.set('createResult', null);
		console.log(event.target.email.value);
		console.log(event.target.password.value);
		Meteor.call(
				'createNewUser', 
				event.target.email.value, 
				event.target.password.value, 
				function (error, result) {
					if(error) {
						Session.set('createError', error);
					}
					else {
						Session.set('createResult', result);
					}
					console.log(result);
					console.log(error);
				});
	}
});

Template.admin.helpers({
	error: function () {
		return Session.get('createError');
	},
	newUser: function () {
		return Session.get('createResult');
	}
});