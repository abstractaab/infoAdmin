AutoForm.setDefaultTemplate('materialize'); 

AccountsTemplates.configure({
	forbidClientAccountCreation: true,
	enablePasswordChange: true
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    layoutTemplate: 'blank',
});


AccountsTemplates.configureRoute('changePwd');