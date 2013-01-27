(function(root){

  if(!root.templates) root.templates = {};

  root.templates.Queue =
    '<ul>' +
      '{{#songs}}' +
        '{{>song}}' +
      '{{/songs}}' +
    '</ul>'
})(this);