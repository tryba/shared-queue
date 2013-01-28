(function(root){

  var AppView = root.AppView= Backbone.View.extend({
    initialize: function(options) {
      var t = this;

      function define_func(button, view) {
        return function(){
          if(button.get('isSelected')) {
            t.activateView(view, button.get('name'));
          } else {
            view.hide();
          }
        }
      }

      t.subViews = options.subViews;
      var menu = t.model.get('menu');

      for(var i = 0, length = menu.length; i < length; i++) {
        var button = menu.at(i);
        var key = button.get('name');
        var view = t.subViews[key];
        button.on("change:isSelected", define_func(button, view));
      }

    },

    // Initial view render
    render: function(options) {
      var t = this;
    },

    activateView: function(view, key) {
      view.show();
    }
  });

}(this));