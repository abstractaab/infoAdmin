Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home');
});

Router.route('/files/create', {
  template: 'filesCreate',
});

Router.route('/files/:_id', {
  template: 'filesList',
});

Router.route('/order', {
  template: 'order',
});

Router.route('/collections/add', {
  template: 'CollectionsAdd',
});
Router.route('/collections/list', {
  template: 'CollectionsList',
});

Router.route('/admin', {
  template: 'admin',
});

Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn');
