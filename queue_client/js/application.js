
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
    nowPlayingView.hide();
  } else {
    $('#now-playing').hide();
    subViews['queue'] = queueView;
  }

  var buttons = [];
  for(var key in subViews) {
    buttons.push({
      name: key
    });
  }

  buttons[0].isSelected = true;

  var menu =  new Menu(buttons);
  var menuView = new MenuView({
    model: menu,
    el: $('#menu')
  });

  var app = new App({subViews: subViews, menu: menu})
  var appView = new AppView({
    model: app,
    el: $('#app'),
    subViews: subViews
  });

});