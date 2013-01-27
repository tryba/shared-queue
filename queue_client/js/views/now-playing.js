(function(root){

  var NowPlayingView = root.NowPlayingView = root.SubView.extend({
    // Constructor
    initialize: function(options) {
      var t = this;
      t.queueView = options.queueView;
      t.queue = options.queueView.model;
      t.render();
      t.model.on("change", function() {
        t.render();
      });
      t.nextSong();
    },

    // Initial view render
    render: function(options) {
      var t = this;
      t.$el.html(Mustache.render(root.templates.NowPlaying, t.model.toJSON(), {next: root.templates.controls.Next}));
      t.delegateEvents();
    },

    show: function() {
      var t = this;
      t.constructor.__super__.show.apply(t);
      t.queueView.show();
    },

    delegateEvents: function() {
      var t = this;
      t.constructor.__super__.delegateEvents.apply(t);
      $(".playing").bind("ended", function(){
        t.songEnded();
      });
      $(".playing").bind("pause", function(){
        t.songPaused();
      });
    },

    hide: function() {
      var t = this;
      t.constructor.__super__.hide.apply(t);
      t.queueView.hide();
    },

    events: function() {
        return {
        "click .button.next": "nextSongEvent"
      }
    },

    nextSongEvent: function(){
      var t = this;
      t.nextSong();
    },
    songEnded: function(){
      var t = this;
      t.nextSong();
    },

    songPaused: function(){
      console.log("SONG PAUSED");
    },

    nextSong: function(callback) {
      var t = this;
      t.model.set('isLoading', true);
      var song = t.queue.pop(function(error, song){
        t.model.set('isLoading', false);

        if(error) {
          console.error("Cannot pop song.", error);
          callback && callback(error);
          return;
        }
        if(song.id) {
          t.model.set('currentSong', song.toJSON());
          callback && callback(null, song);
          return;
        } else {
          //There is no song in the queue, so we have to enter a holding pattern
          t.model.set('currentSong', null);
          t.pollForSong(15000);
          callback && callback(null, null);
          return;
        }
      });
    },

    pollForSong: function(period) {
      var t = this;
      if(!t.pollInterval) {
        t.pollInterval = setInterval(function(){
          t.nextSong(function(error, song){
            if(!error && song) {
              clearInterval(t.pollInterval);
            }
          });
        }, period);
      }

    }

  });

}(this));