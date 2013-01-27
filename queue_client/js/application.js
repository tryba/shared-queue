
var userId = 2;
var queueId = 1;
var isPlayer = false;

var hash = window.location.hash;
if(hash) {
  hash = hash.slice(1, hash.length);
  try {
    hash = JSON.parse(hash);
    if('isPlayer' in hash) {
      isPlayer = hash.isPlayer;
    }

    if('userId' in hash) {
      userId = hash.userId;
    }

    if('queueId' in hash) {
      queueId = hash.queueId;
    }
  } catch(e) {
    console.error("Cannot parse hash = " + hash, e);
  }
}

$(function(){


  /**
   * Models
   **/
  var library = new Library({
    id: userId
  });

  var queue = new Queue({
    user_id: userId,
    id: queueId
  });

  var nowPlaying = new NowPlaying({
    currentSong: null
  });

  /**
   * Views
   **/
  var queueView = new QueueView({
    el: $('#queue'),
    model: queue
  });
  var libraryView = new LibraryView({
    el: $('#library'),
    model: library,
    queue: queue
  });

  var subViews = {
    library: libraryView
  }

  if(isPlayer) {
    var nowPlayingView = new NowPlayingView({
      el: $('#now-playing'),
      model: nowPlaying,
      queueView: queueView
    });
    subViews['player'] = nowPlayingView;
  } else {
    subViews['queue'] = queueView;
  }

  var buttons = [];
  for(var key in subViews) {
    buttons.push({
      name: key
    });
  }

  var menu =  new Menu({buttons: buttons});
  var menuView = new MenuView({
    model: menu,
    el: $('#menu')
  });

  var app = new App({subViews: subViews})
  var appView = new AppView({
    model: app,
    el: $('#app'),
    subViews: subViews
  });

});