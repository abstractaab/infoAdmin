Collections = new Mongo.Collection('collections');

Collections.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200,
    optional: false
  },
  locked: {
    type: Boolean,
    optional: true
  }
}));
