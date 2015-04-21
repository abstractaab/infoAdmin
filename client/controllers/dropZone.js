Template.dropZone.events({
  'dropped #dropzone': function(event, temp) {
    var collection = Router.current().params._id;

    FS.Utility.eachFile(event, function(file) {
      var id = Files.insert(file);
      var order = Attributes.find({collection: collection}).count();
      Attributes.insert({
        collection: collection,
        fileId: id._id,
        order: order
      });
    });
  },
  'dragover #dropzone': function() {
    Session.set('dropHover', 'hover');
  },
  'dragleave #dropzone': function() {
    Session.set('dropHover', null);
  }
});

Template.dropZone.helpers({
  dropHover: function () {
    return Session.get('dropHover');
  }
});

Template.dropZone.onRendered(function() {
  console.log('hej');
})