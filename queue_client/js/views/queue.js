(function(root){

  var QueueView = root.QueueView= root.SubView.extend({
    // Constructor
    initialize: function(options) {
      var t = this;
      t.model.on("change", function(){
        t.render();
      });
    },

    // Initial view render
    render: function(options) {
      var t = this;
      t.$el.html(Mustache.render(root.templates.Queue, t.model.toJSON(), {
        song: root.templates.Song,
        controls: root.templates.controls.Remove
      }));
    },

    events: {
      "click .song .remove": "remove"
    },

    remove: function(event) {
      var t = this;

      var song = $(event.target.parentNode)
      id = song.find(".id").html();
      user_id = song.find(".user_id").html();
      membership_id = song.find(".membership_id").html();
      t.model.remove(new Song({id: id, user_id: user_id, membership_id: membership_id}), function(error, queue){
        if(error) {
          log.error("Failed to remove song.", error)
          return;
        }
      });
    }
  });

}(this));