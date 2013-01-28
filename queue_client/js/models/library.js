
var queueClient = new QueueClient(queueHost, queuePort);

var Library = Backbone.Model.extend({
  initialize: function(attributes, options) {
    var t = this;
    t.on('change:id', function(model, id) {
      t.update();
    });
    t.set(attributes);
    t.update();
  },

  update: function() {
    var t = this;
    queueClient.getUserLibrary(t.id, function(error, response) {
      if(error) {
        console.error("Cannot get user library id = " + t.id, error);
        return;
      }
      t.set(response);
    });
  }

});
