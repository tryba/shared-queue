(function(root){

  if(!root.templates) root.templates = {};

  root.templates.NowPlaying =
    '{{^isLoading}}' +
      '{{#currentSong}}' +
        '<div>{{title}}</div>' +
        '<audio autoplay="autoplay" src="{{stream_url}}" controls="controls" class="playing"></audio>' +
        '{{>next}}' +
      '{{/currentSong}}{{^currentSong}}' +
        '<div id="audio" class="nosong">No song selected.</div>' +
      '{{/currentSong}}' +
    '{{/isLoading}}{{#isLoading}}' +
      '<div id="audio" class="loading">Loading next song...</div>' +
    '{{/isLoading}}'
})(this);