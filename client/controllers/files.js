Template.filesList.helpers({
	collection: function () {
		return Collections.findOne(Router.current().params._id);
	}
});

Template.filesList.events({
	'change .locked': function (e) {
		Collections.update(Router.current().params._id, {
			$set: {
				locked: e.target.checked
			}
		});
	}
});

Template.filesList.onRendered(function() {
	$('.tooltipped').tooltip({delay: 50});
})