(function(root){

  if(!root.templates) root.templates = {};
  if(!root.templates.controls) root.templates.controls = {};

  root.templates.controls.Button =
    '<li class="button {{name}}">{{name}}</li>'
})(this);