Orders = new Mongo.Collection('orders');

Orders.attachSchema(new SimpleSchema({
  customer: {
    type: String,
    label: "Customer",
    max: 200,
    optional: false
  },
  product: {
    type: String,
    label: "Product",
    max: 200,
    optional: false
  },
  sum: {
    type: String,
    label: "Sum",
    max: 200,
    optional: false
  },
  date: {
    type: Date,
    autoValue: function() {
      return new Date;
    }
  }
}));
