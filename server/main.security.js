Files.files.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Attributes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Collections.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Accounts.validateNewUser(function (user) {
	// Only admin can add users
	var loggedInUser = Meteor.user();

	if (Roles.userIsInRole(loggedInUser, ['admin'])) {
		return true;
	}

	// or if they log in with azure AD
	if (typeof(user.services.azureAd) === 'object') {
		return true;
	}

	throw new Meteor.Error(403, "Not authorized to create new users");
});