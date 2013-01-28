(function(root){

  var MenuView = root.MenuView = Backbone.View.extend({
    // Constructor
    initialize: function(options) {
      var t = this;
      t.render();
      //t.model.on("change", function(){
      //  t.render();
      //})
    },

    // Initial view render
    render: function(options) {
      var t = this;
      t.$el.html(Mustache.render(root.templates.Menu, {buttons: t.model.toJSON()}, {
        button: root.templates.controls.Button
      }));
    },

    events: {
      "click .button": "clickButton"
    },

    clickButton: function(event) {
      var t = this;
      var targetIndex = $(event.target).index();
      var buttons = this.model;
      for(var i = 0, length = buttons.length; i < length; i++) {
        var button = buttons.at(i);
        if(i == targetIndex) {
          button.set('isSelected', true);
        } else {
          button.set('isSelected', false);
        }
      }
      t.render();
    }
  });

}(this));