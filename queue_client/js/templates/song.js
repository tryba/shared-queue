(function(root){

  if(!root.templates) root.templates = {};

  root.templates.Song =
  '<li class="song">' +
    '<div class="id">{{id}}</div>' +
    '<div class="user_id">{{user_id}}</div>' +
    '<div class="membership_id">{{membership_id}}</div>' +
    '<div class="genre">{{genre}}</div>' +
    '<div class="artist">{{artist}}</div>' +
    '<div class="album">{{album}}</div>' +
    '<div class="title">{{title}}</div>' +
    '{{>controls}}' +
  '</li>';

})(this);