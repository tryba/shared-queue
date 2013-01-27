(function(root){

  var SubView = root.SubView = Backbone.View.extend({
    show: function(){
      this.$el.show();
    },
    hide: function(){
      this.$el.hide();
    }
  });
})(this);