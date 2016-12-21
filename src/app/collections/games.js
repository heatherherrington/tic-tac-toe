import Backbone from 'backbone';
import TicTacToe from 'app/models/tictactoe';

var Games = Backbone.Collection.extend({
  model: TicTacToe,
  game: new TicTacToe({}),
    url: 'http://localhost:3000/api/v1/games',
  parse: function(data) {
    return data.game;
  }
});

module.exports = Games;

export default Games;
