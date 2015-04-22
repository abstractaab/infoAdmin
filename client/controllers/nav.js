Template.nav.onRendered(function() {
	$('.collapsible').collapsible();
	$(".button-collapse").sideNav();
})

Template.nav.events({
	'click .logout': function () {
		Meteor.logout();
	}
});