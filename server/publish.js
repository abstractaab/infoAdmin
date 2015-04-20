/*Meteor.publish('images', function() {
  return Files.find()
});
*/

Meteor.publish('images', function () {
	if(!this.userId) { return []; }
  	return Files.find();
});


Meteor.publish('Collections', function () {
	if(!this.userId) { return []; }
  	return Collections.find();
});


Meteor.publish('Attributes', function () {
	if(!this.userId) { return []; }
  	return Attributes.find();
});

