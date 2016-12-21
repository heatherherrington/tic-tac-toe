import Backbone from 'backbone';
import TicTacToe from 'app/models/tictactoe';
import Game from 'app/models/game';

var Games = Backbone.Collection.extend({
  model: Game,
  game: new TicTacToe({}),
    url: 'https://safe-mesa-21103.herokuapp.com/api/v1/games',
  parse: function(data) {
    return data;
  }
});

module.exports = Games;

export default Games;
