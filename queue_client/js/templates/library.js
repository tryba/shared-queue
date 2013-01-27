(function(root){

  if(!root.templates) root.templates = {};

  root.templates.Library =
    '<ul>' +
      '{{#songs}}' +
        '{{>song}}' +
      '{{/songs}}' +
    '</ul>'
})(this);