Template.order.onRendered(function() {

	$('select').material_select();
	$('.collapsible').collapsible();

	zoom = function(zoomLevel) {
		canvas.setZoom(zoomLevel);
		canvas.setHeight(1080*zoomLevel);
		canvas.setWidth(1920*zoomLevel);
		canvas.renderAll();
		canvas.calcOffset();
	}

	renderCanvas = function() {
		canvas = new fabric.Canvas('c');
		canvas.setHeight(1080);
		canvas.setWidth(1920);
		zoom(0.4);
		canvas.setBackgroundColor('#444');
		canvas.renderAll();


		var object = new fabric.IText('Senaste ordrarna', { 
			fontFamily: 'BrownRegular',
			fontSize: 150,
			textAlign: 'left',
			fill: '#fff',
			left: 50,
			top: 50
		});
		canvas.add(object);
		var topMargin = 250;
		Orders.find({}, { sort: { date: -1 }, limit: 5 }).fetch().forEach(function (item) {
			var text = item.customer + " har köpt " + item.product + " till ett värde av " + item.sum + " SEK";
			var orderItem = new fabric.IText(text, { 
				fontFamily: 'BrownRegular',
				fontSize: 50,
				textAlign: 'left',
				fill: '#fff',
				left: 50,
				top: topMargin
			});

			canvas.add(orderItem);
			topMargin = topMargin+150;
		});
		canvas.renderAll();
	}

	renderCanvas();
	Meteor.setTimeout(function() {
		// fulhack
		renderCanvas();
	}, 500)
})

Template.order.events({
	'click .rerender': function () {
		renderCanvas();
	},
	'click .delete': function () {
		Orders.remove(this._id);
	},
	'submit .ordersForm': function (e) {
		e.preventDefault();
		if(e.target.collection.value !== "") {
			var collection = e.target.collection.value,
			    zoomOld = canvas.getZoom(),
			    order = Attributes.find({collection: collection}).count();
			canvas.deactivateAll().renderAll();
			zoom(1);
			var img = canvas.toDataURL('png');
			zoom(zoomOld);

			var newFile = new FS.File();
			newFile.attachData(img)
			newFile.name("orderImage.png");
			var id = Files.insert(newFile);
			var old = Attributes.findOne({
				name: 'order'
			});
			if(old) {
				Attributes.remove(
					old._id
				);
			}
			Attributes.insert({
				collection: collection,
				fileId: id._id,
				order: order,
				name: 'order'
			});
			Materialize.toast("File saved", 2000);
		}
		else {
			Materialize.toast("Pick a collection", 2000);
		}
		console.log()
	}
});

Template.order.helpers({
	collections: function () {
		console.log(Collections.find().fetch());
		return Collections.find();
	},
	orderRows: function() {
		return Orders.find({}, { sort: { date: -1 }, limit: 5 }).fetch();
	}
});