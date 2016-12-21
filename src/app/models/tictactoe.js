import Backbone from 'backbone';

import Board from 'app/models/board';
import Player from 'app/models/player';

const TicTacToe = Backbone.Model.extend({
  defaults: {
    board: new Board(),
    player1: new Player({ name: "Player1", marker: "X" }),
    player2: new Player({ name: "Player2", marker: "O" }),
    players: [],
    turns: 0
  },

  initialize: function(options) {
    var playersHash = [this.get('player1'), this.get('player2')];
    this.set('players', playersHash);
    this.set('board', new Board());
    this.currentPlayer = 0;

    var sample =  function(array = [0,1]) {
      var index = Math.floor ( Math.random() * array.length );
      return array[index];
    };

    this.set('currentPlayer', sample());
  },

  playTurn: function(prompt) {
    // A turn will:
    //   - know who the current player is
    var player = this.get('players')[this.get('currentPlayer')];
    while (true) {
      //   - prompt for placement
      var placement = prompt;
      //   - check that the placement is valid
      //   - will return FALSE or valid placement position
      if (this.isValidPlacement(placement)) {
        //   - update the board with a valid placement and players marker
        this.updateBoard(placement, player.get('marker'));
        break;
      }
    }
    //   - end the move
    this.endMove();

    // if outputResult is FALSE, the game continues. Otherwise, we return a string of the result of the game.
    return this.outputResult(player);
  },

  outputResult: function(player) {
    //   - check if has won or if tie and report information
    var result = "";
    if (this.hasWon() || this.get('turns') == 9) {
      result += "The Game is Over. ";
      if(this.hasWon()) {
        result += player.name + " has won!";
      } else {
        result += "You have tied.";
      }
      return result;
    }
    return false;
  },

  isValidPlacement: function(placement) {
    // To be valid:
    //   - get the placement
    //      format of placement argument: [rowIndex, columnIndex]
    //   - check the board for valid placement
    //     - return FALSE if not valid
    //     - return the placement if valid

    this.placement = placement;
    this.row = this.placement[0];
    this.column = this.placement[1];

    var boardPosition = this.get('board').get('grid')[this.row][this.column];

    if ( boardPosition === null ) {
      return true;
    } else {
      return false;
    }
  },

  updateBoard: function(boardPosition, marker) {
    this.marker = marker;

    this.boardPosition = boardPosition;
    this.row = this.boardPosition[0];
    this.column = this.boardPosition[1];

    this.gridCopy =   this.get('board').get('grid');

    this.gridCopy[this.row][this.column] = this.marker;

    this.get('board').set('grid', this.gridCopy);

    return this.get('board');
  },

  endMove: function() {
    // Ending the move will:
    //   - increment the turns counter by 1
    //   - check if the game has been won
    //   - switch current player
    this.addTurn();
    if (this.get('turns') >= 5 && !this.hasWon()) {
      // only change players if hasWon is false after 5 turns
      this.changePlayers();
    } else if (this.get('turns') < 5) {
      // for the first 4 turns, always changePlayers because there is no chance of victory
      this.changePlayers();
    }
  },

  addTurn: function() {
    var endingValue = this.get('turns') + 1;
    this.set('turns', endingValue);
  },

  hasWon: function() {
    // grid[row][column]
    var grid = this.get('board').get('grid');

    // A horizontal match victory - all columns in same row are equal and none is null
    for (var i = 0; i < 3; i++) {
      if(grid[i][0] == grid[i][1] && grid[i][0] == grid[i][2] && grid[i][0] !== null){
        return true;
      }
    }

    // A vertical match victory - all rows in same column are equal and none is null
    for (var j = 0; j < 3; j++) {
      if(grid[0][j] == grid[1][j] && grid[0][j] == grid[2][j] && grid[0][j] !== null){
        return true;
      }
    }

    // A diagonal match victory - need to validate two cases:
      // - starting in the bottom left
    if(grid[2][0] == grid[1][1] && grid[2][0] == grid[0][2] && grid[2][0] !== null){
      return true;
    }
      // - starting in the top left
    if(grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2] && grid[0][0] !== null){
      return true;
    }
    return false;
  },

  changePlayers: function() {
    this.set('currentPlayer', ((this.get('currentPlayer') === 0) ? 1 : 0));
  }
});

module.exports = TicTacToe;

// DO NOT REMOVE THIS
export default TicTacToe;
