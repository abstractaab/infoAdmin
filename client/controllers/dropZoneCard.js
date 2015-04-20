Template.dropZoneCard.events({
  'dropped #dropzone': function(event, temp) {
    var collection = Router.current().params._id;

    FS.Utility.eachFile(event, function(file) {
      var id = Files.insert(file);
      Attributes.insert({
        collection: collection,
        fileId: id._id,
        order: 99
      });
    });
  }
});