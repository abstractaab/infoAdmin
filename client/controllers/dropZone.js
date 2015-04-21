Template.dropZone.events({
  'dropped #dropzone': function(event, temp) {
    Session.set('dropHover', 'grey');
    var collection = Router.current().params._id;

    FS.Utility.eachFile(event, function(file) {
      var id = Files.insert(file);
      var order = Attributes.find({collection: collection}).count();
      toastr.success(file.name + " uploaded");
      Attributes.insert({
        collection: collection,
        fileId: id._id,
        order: order
      });
    });
  },
  'dragover #dropzone': function() {
    Session.set('dropHover', 'teal');
  },
  'dragleave #dropzone': function() {
    Session.set('dropHover', 'grey');
  }
});

Template.dropZone.helpers({
  dropHover: function () {
    return Session.get('dropHover');
  }
});

Template.dropZone.onRendered(function() {
  Session.set('dropHover', 'grey');
})