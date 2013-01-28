
var queueClient = new QueueClient(queueHost, queuePort);

var Queue = Backbone.Model.extend({
  initialize: function(attributes, options) {
    var t = this;
    t.on('change:id', function(model, id) {
      t.update();
    });
    t.set(attributes);
    t.update();
    setInterval(function(){
      t.update();
    }, 30000);
  },

  update: function() {
    var t = this;
    queueClient.getQueue(t.get('user_id'), t.get('id'), function(error, response) {
      if(error) {
        console.error("Cannot get queue with user id = " + t.get('user_id') + ", queue id = " + t.get('id'), error);
        return;
      }
      t.set(response);
    });
  },

  pop: function(callback) {
    var t = this;
    var response = queueClient.popSongFromQueue(t.get('user_id'), t.get('id'), function(error, response){
      if(error) {
        callback(error);
        return;
      }

      var song = response.popped_song;
      t.set(response.queue);
      callback(null, new Song(song));
    });

  },

  push: function(song, callback) {
    var t = this;
    var response = queueClient.pushSongToQueue(t.get('user_id'), t.get('id'), song.get('id'), function(error, response){
      if(error) {
        callback(error);
        return;
      }
      t.set(response);
      callback(null, t);
    });
  },

  remove: function(song, callback) {
    var t = this;
    var response = queueClient.removeSongFromQueue(t.get('user_id'), t.get('id'), song.get('id'), song.get('membership_id'), function(error, response){
      if(error) {
        callback(error);
        return;
      }
      t.set(response);
      callback(null, t);
    });
  }

});
