Template.addCollection.onRendered(function() {
	$(document).ready(function() {
		$('select').material_select();
	});
})

Template.addCollection.helpers({
	currentValue: function (fieldName) {
		return AutoForm.getFieldValue(fieldName) || "";
	}
});

Template.listCollections.helpers({
	collections: function () {
		return Collections.find({}).fetch();
	},
	rootUrl: function() {
		return Meteor.absoluteUrl();
	}
});

Template.listCollections.events({
	'click .delete': function () {
		if(confirm("Are you sure? This will have consequences")) {
			Collections.remove(this._id);
			toastr.info(this.title + " removed");
		}
	}
});