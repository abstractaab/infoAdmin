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


Meteor.publish('Orders', function () {
	if(!this.userId) { return []; }
  	return Orders.find(
  		{},
  		{
  			sort: { date: -1 },
  			limit: 5
  		}
  	)
});
