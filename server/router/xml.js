Router.route('/xml/:collection', function () {
  images = Attributes.find({
    collection: this.params.collection
  }, {
    sort: { order: 1 }
  });
  var req = this.request;
  var res = this.response;
  var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><rss version=\"2.0\">\n";
  xmlData += "<channel>\n";
  xmlData += "\t<title>RSS</title>\n";
  xmlData += "\t<link>http://www.abstracta.se</link>\n";
  xmlData += "\t<description>Images</description>\n";
  images.forEach(function (post) {
    var image = Files.findOne(post.fileId);
    var url = image.url();
    xmlData += "\t<item>\n";
      xmlData += "\t\t<title>" + post.name + "</title>\n";
      xmlData += "\t\t<guid>" + post._id + "</guid>\n";
      xmlData += "\t\t<description>" + Meteor.absoluteUrl().replace(/\/+$/, "") + url + "</description>\n";
    xmlData += "\t</item>\n";
  });
  //xmlData += "<Say voice=\"woman\" language=\"en\">Hello!</Say>";
  xmlData += "</channel>\n";
  xmlData += "</rss>\n";

  this.response.writeHead(200, {'Content-Type': 'application/xml'});
  this.response.end(xmlData);
}, {where: 'server'});
