(function(root){

  if(!root.templates) root.templates = {};

  root.templates.Menu =
  '<ul class="buttons">' +
    '{{#buttons}}' +
      '{{>button}}' +
    '{{/buttons}}' +
  '</ul>'
})(this);