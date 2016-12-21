import Backbone from 'backbone';

const Player = Backbone.Model.extend({

  initialize: function(options) {
    this.name = options.name;
    this.marker = options.marker;
  }
});

module.exports = Player;

// DO NOT REMOVE THIS
export default Player;
