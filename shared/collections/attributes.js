Attributes = new Mongo.Collection('attributes');

Attributes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    defaultValue: 'image'
  },
  collection: {
    type: String,
    optional: false,
    autoform: {
      type: "select",
      options: function () {
        var array = [];
        Collections.find({}).fetch().forEach(function (post) {
          array.push({label: post.title, value: post._id});
        });
        return array;
      }
    }
  },
  order: {
    type: Number,
    defaultValue: 99
  },
  fileId: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "files"
      }
    }
  },
  validUntil: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date"
      }
    }    
  }
}));