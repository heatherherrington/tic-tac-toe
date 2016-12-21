import _ from 'underscore';
import Backbone from 'backbone';

const SquareView = Backbone.View.extend({
  initialize: function(options){

    // clicks to tell the board to update itself
    this.model = options.model;
    this.position = options.position;
    this.template = _.template(Backbone.$('#tmpl-board-square').html());

    this.render();
  },

  events: {
    'click': 'onClick'
  },

  onClick: function(e) {
    this.trigger('select', this);

    // Return false to tell jQuery not to run any more event handlers.
    return false;
  },

  render: function() {
    this.$el.append(this.template({ marker: this.model })).addClass('column');
    return this;
  }
});

export default SquareView;
