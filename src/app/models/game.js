import Backbone from 'backbone';

const Game = Backbone.Model.extend({
// this model is a wrapper for the API that is formatted like the API is
  initialize: function(options) {
    this.board = options.board;
    this.players = options.players;
    this.outcome = options.outcome;
    this.playet_at = options.played_at;

  }
});

module.exports = Game;

// DO NOT REMOVE THIS
export default Game;
