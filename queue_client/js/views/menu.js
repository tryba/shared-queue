(function(root){

  var MenuView = root.MenuView = Backbone.View.extend({
    // Constructor
    initialize: function(options) {
      this.render();
    },

    // Initial view render
    render: function(options) {
      var t = this;
      t.$el.html(Mustache.render(root.templates.Menu, t.model.toJSON(), {
        button: root.templates.controls.Button
      }));
    },

    events: {
      "click .button": "clickButton"
    },

    clickButton: function(event) {

    }
  });

}(this));