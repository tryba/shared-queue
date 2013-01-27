(function(root){

  var AppView = root.AppView= Backbone.View.extend({
    // Constructor
    initialize: function(options) {
      var t = this;

      function define_func(view, key) {
        t["activateView_" + key] = function(){
          t.activateView(view, key);
        }
      }

      t.subViews = options.subViews
      t.buttons = [];

      var i = 0;
      for(var key in this.subViews) {
        var view = t.subViews[key];
        t.buttons.push({
          name: key
        });

        define_func(view, key);

        if(i == 0) {
          t.activateView(view, key);
        } else {
          view.hide();
        }
        i++;
      }
    },

    // Initial view render
    render: function(options) {
      var t = this;
    },

    events: function(){
      var t = this;
      var events = {};

      for(var i = 0, length = t.buttons.length; i < length; i++) {
        var name = t.buttons[i].name;
        events["click #menu ."+ name] = "activateView_" + name;
      }
      return events;
    },

    activateView: function(view, key) {
      var t = this;
      if(t.activeView) {
        t.activeView.hide();
      }

      t.activeView = view;
      t.activeView.show();
    }
  });

}(this));