import ApplicationView from 'app/views/application_view';
import TicTacToe from 'app/models/tictactoe';

var ticTacToe = new TicTacToe({

});

var appView = new ApplicationView({
  el: '#application',
  model: ticTacToe
});
