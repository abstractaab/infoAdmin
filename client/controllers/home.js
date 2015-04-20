Template.home.helpers({
  images: function () {
    files = Files.findOne(); // Where Images is an FS.Collection instance
    console.log(files);
    return files;
  }
});