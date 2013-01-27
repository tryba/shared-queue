(function(root) {
  var QueueClient = root.QueueClient = function(host, port){
    this.baseUrl = "http://" + host + ":" + port + "/";

    this.get = function(url, callback) {
      $.ajax({url: url, dataType:'jsonp'}).done(function(data){
        callback(null, data);
      }).fail(function(error){
        callback(error || new Error("Failed to get url = " + url));
      });
    };

    this.getQueue = function(user_id, queue_id, callback){
      url = this.baseUrl + "accounts/" + user_id + "/queues/" + queue_id + "/";
      this.get(url, callback);
    };

    this.getUserLibrary =  function(id, callback){
      url = this.baseUrl + "accounts/" + id + "/music/";
      this.get(url, callback);
    };

    this.getSong = function(user_id, song_id, callback) {
      url = this.baseUrl + "accounts/" + user_id + "/songs/" + song_id + "/";
      this.get(url, callback);
    }

    this.popSongFromQueue = function(user_id, queue_id, callback) {
      url = this.baseUrl + "accounts/" + user_id + "/queues/" + queue_id + "/pop/";
      this.get(url, callback);
    }

    this.pushSongToQueue = function(user_id, queue_id, song_id, callback) {
      url = this.baseUrl + "accounts/" + user_id + "/queues/" + queue_id + "/push/songs/" + song_id + "/";
      this.get(url, callback);
    }

    this.removeSongFromQueue = function(user_id, queue_id, song_id, membership_id, callback) {
      url = this.baseUrl + "accounts/" + user_id + "/queues/" + queue_id + "/remove/memberships/" + membership_id + "/";
      this.get(url, callback);
    }
  }
})(this);