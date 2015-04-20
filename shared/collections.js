Types = new Mongo.Collection('types');
Attributes = new Mongo.Collection('attributes');
Collections = new Mongo.Collection('collections');

Files = new FS.Collection("files", {
  stores: [
    //new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
    new FS.Store.GridFS("filesStore")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

Files.allow({
  download: function () {
    return true;
  },
  fetch: null
});

Collections.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200,
    optional: false
  },
  class: {
    type: String,
    label: "Class",
    optional: false,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "blue-grey darken-1", value: 'blue-grey darken-1'},
          {label: "red darken-1", value: 'red darken-1'},
          {label: "pink darken-1", value: 'pink darken-1'},
          {label: "purple darken-1", value: 'purple darken-1'},
          {label: "blue darken-2", value: 'blue darken-2'},
          {label: "teal darken-3", value: 'teal darken-3'},
          {label: "deep-orange darken-1", value: 'deep-orange darken-1'}
        ];
      }
    }
  }
}));

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
/*
var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  console.log("here");
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};
*/