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