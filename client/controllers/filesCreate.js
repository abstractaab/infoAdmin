Template.filesCreate.onRendered(function() {

	$('select').material_select();
	$('.modal-trigger').leanModal();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});

	jscolor.install();

	zoom = function(zoomLevel) {
		canvas.setZoom(zoomLevel);
		canvas.setHeight(1080*zoomLevel);
		canvas.setWidth(1920*zoomLevel);
		canvas.renderAll();
	}
	fullScreenFunc = function (obj){
		if (obj.requestFullscreen) {
			obj.requestFullscreen();
		} else if (obj.mozRequestFullScreen) {
			obj.mozRequestFullScreen();
		} else if (obj.webkitRequestFullScreen) {
			obj.webkitRequestFullScreen();
		}
	}

	canvas = new fabric.Canvas('c');
	canvas.setHeight(1080);
	canvas.setWidth(1920);
	zoom(0.4);
	canvas.setBackgroundColor('#444');
	canvas.renderAll();

	canvas.on('object:selected', function(e) {
		console.log("selected");
	})
});

Template.filesCreate.helpers({
	image: function () {
		return Session.get('image');
	},
	fonts: function() {
		var fonts = [
			//{name: 'Verdana'},
			//{name: 'Times New Roman'},
			//{name: 'Arial'},
			//{name: 'Open Sans'},
			{name: 'BrownRegular'},
			{name: 'BrownBold'},
			{name: 'BrownLight'}
			//{name: 'Comic Sans MS'}
		]
		return fonts
	}
});

Template.filesCreate.events({
	// Zoom canvas
	'change .zoomCanvas': function(e) {
		zoom(e.target.value);
	},

	// change object
	'change .inputFontSize': function(e) {
		var activeObject = canvas.getActiveObject();
		activeObject.setFontSize(e.target.value);
		canvas.renderAll();
	},
	'change .inputFontWeight': function(e) {
		var activeObject = canvas.getActiveObject();
		activeObject.setFontWeight(e.target.value);
		canvas.renderAll();
	},
	'change .inputFontFamily': function(e) {
		var activeObject = canvas.getActiveObject();
		if(activeObject) {
			activeObject.setFontFamily(e.target.value);
			canvas.renderAll();
		}
	},
	'change .inputTextColor': function(e) {
		console.log(e);
		console.log(e.target.value)
		var activeObject = canvas.getActiveObject();
		activeObject.setColor('#' + e.target.value)
		canvas.renderAll();
	},
	'change .inputBackgroundColor': function(e) {
		canvas.setBackgroundImage('');
		canvas.setBackgroundColor('#' + e.target.value, canvas.renderAll.bind(canvas));
		//text.setColor('#' + e.target.value)
		//canvas.renderAll();
	},

	// generate image
	'click .imageCreate': function() {
		var zoomOld = canvas.getZoom();
		canvas.deactivateAll().renderAll();
		zoom(1);
		var img = canvas.toDataURL('png');
		zoom(zoomOld);
		Session.set('image', img);
	},
	/*
	// generate image
	'click .imageDownload': function() {
		var zoomOld = canvas.getZoom();
		canvas.deactivateAll().renderAll();
		zoom(1);
		var img = canvas.toDataURL('png');
		var data = base64Data.replace('data:image/png;base64,', '');
		zoom(zoomOld);
		Session.set('image', img);
	},*/
	// test functions
	'click .toggle-bg': function () {
		canvas.setBackgroundImage('', canvas.renderAll.bind(canvas));
		if (canvas.backgroundColor instanceof fabric.Pattern) {
			canvas.setBackgroundColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas));
		}
		else {
			canvas.setBackgroundColor({source: '/bg.png'}, canvas.renderAll.bind(canvas));
		}
	},
	'click .bg2': function () {
		canvas.setBackgroundImage('/bg3.jpg', canvas.renderAll.bind(canvas));
	},
	'click .objCenter': function(e) { // center object on canvas
		var activeObject = canvas.getActiveObject();
		var value = e.target.value;
		console.log(value)
		if (activeObject) {
			var zoomOld = canvas.getZoom();
			zoom(1);
			if(value === 'xy') {
				activeObject.center();
			}
			if(value === 'x') {
				activeObject.centerH();	
			}
			if(value === 'y') {
				activeObject.centerV();	
			}
			zoom(zoomOld);
			canvas.renderAll();
		}
	},
	'click .objAdd': function(e) {
		console.log("Add object");
		var add = e.target.value;
		console.log(add)
		if(add === 'logo') {
			fabric.loadSVGFromURL('/logo.svg', function(objects, options) {
				var obj = fabric.util.groupSVGElements(objects, options);
				canvas.add(obj);
			});
		}
		if(add === 'text') {
			var object = new fabric.IText('hello\nabstracta', { 
				fontFamily: 'BrownRegular',
				fontSize: 150,
				textAlign: 'center',
				fill: '#fff'
			});
			canvas.add(object);
			canvas.renderAll();
		}
	},
	'click .objRem': function() {
		var activeObject = canvas.getActiveObject();
		if(activeObject && confirm("really")) {
			canvas.remove(activeObject);
		}	
	},
	'click .textAlign': function(e) {
		var activeObject = canvas.getActiveObject();
		console.log("click")
		if(activeObject) {
			console.log("object")
			console.log(e.target.value)
			activeObject.setTextAlign(e.target.value);
			canvas.renderAll();
		}	
	},
	'click .imageFullscreen': function(e) {
		console.log(e);
		fullScreenFunc(e.currentTarget);
		//fullScreenFunc('<img class="imageFullscreen" src="' + Session.get('image') + '">');
		/*
		console.log(Session.get('image-preview'))
		if(Session.get('image-preview')) {
			Session.set('image-preview', false);
		}
		else {
			Session.set('image-preview', true);
		}*/
	}
});