Meteor.methods({
	createNewUser: function (email, password) {
		var userId = Accounts.createUser({
			email: email,
			password: password
		});
		if(userId) {
			return userId;
		}
		else {
			throw new Meteor.Error("failed-user-creation", "Couldn't create user");
		}
	}
});