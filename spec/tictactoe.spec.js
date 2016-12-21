// Do not remove
import TicTacToe from 'app/models/tictactoe';

jasmine.getEnv().topSuite().beforeEach({fn: function() {
   //log in as admin
}});

describe('TicTacToe', function() {

  var testTicTacToe;
    beforeEach(function(){
      testTicTacToe = new TicTacToe();
    });

    afterEach(function(){
      testTicTacToe.destroy();
    });

  describe('TicTacToe', function() {
    it('should be defined', function() {
      expect(testTicTacToe).toBeDefined();
    });

    it('should have a board', function() {
      expect(testTicTacToe.get('board')).toBeDefined();
    });

    it('should have two players', function() {
      expect(testTicTacToe.get('player1')).toBeDefined();
      expect(testTicTacToe.get('player2')).toBeDefined();
    });

    it('should have turns', function() {
      expect(testTicTacToe.get('turns')).toBeDefined();
    });
  });

  describe('playTurn and outputResult', function() {
    var playTicTacToe = new TicTacToe();

    var tieTicTacToe = new TicTacToe();
    var winTicTacToe = new TicTacToe();

    it('should return FALSE when the game has not ended', function() {
      expect(playTicTacToe.playTurn([0,0])).toBeFalsy();
    });

    it('should output the correct message when the game is tied', function() {
      tieTicTacToe.playTurn([0,0]);
      tieTicTacToe.playTurn([0,1]);
      tieTicTacToe.playTurn([0,2]);
      tieTicTacToe.playTurn([1,0]);
      tieTicTacToe.playTurn([1,2]);
      tieTicTacToe.playTurn([1,1]);
      tieTicTacToe.playTurn([2,0]);
      tieTicTacToe.playTurn([2,2]);

      expect(tieTicTacToe.playTurn([2,1])).toEqual("The Game is Over. You have tied.");
    });

    it('should output the correct message when someone wins', function() {
      winTicTacToe.playTurn([0,0]);
      winTicTacToe.playTurn([0,1]);
      winTicTacToe.playTurn([1,1]);
      winTicTacToe.playTurn([2,1]);

      var winnerName = winTicTacToe.get('players')[winTicTacToe.currentPlayer].name;

      expect(winTicTacToe.playTurn([2,2])).toEqual("The Game is Over. " + winnerName + " has won!" );
    });
  });

  describe('isValidPlacement', function() {

    it('should return false if the placement on the board does not exist', function() {
      expect(testTicTacToe.isValidPlacement([0, 1000])).toBeFalsy();
    });

    it('should return false if the placement on the board is already occupied', function() {

      var occupiedGrid = [
        ['X', 'O', null],
        [null, null, null],
        [null, null, null]
      ];

      var occupiedTicTacToe = new TicTacToe();
      occupiedTicTacToe.get('board').set('grid', occupiedGrid);

      expect(occupiedTicTacToe.isValidPlacement([0,0])).toBeFalsy();

      var test = new TicTacToe();
    });

    it('should return true if the placement on the board is not occupied', function() {
      expect(testTicTacToe.isValidPlacement([0, 1])).toBeTruthy();
    });
  });

  describe('updateBoard', function() {

    it('should change the boards current value to the given marker', function() {
      var boardPosition = [0,0];
      var row = boardPosition[0];
      var column = boardPosition[1];

      var boardValue = testTicTacToe.get('board').get('grid')[row][column];

      expect(boardValue).toBeNull();

      testTicTacToe.updateBoard(boardPosition, "X");

      var boardValueUpdate = testTicTacToe.get('board').get('grid')[row][column];

      expect(boardValueUpdate).toEqual("X");
    });
  });

  describe('endMove', function() {

    it('should increment the games turns by 1 AND change the current player when turns are less than 5', function() {
      var gameTurns = testTicTacToe.get('turns');
      var originalPlayer = testTicTacToe.get('currentPlayer');

      testTicTacToe.endMove();

      expect(testTicTacToe.get('turns')).toEqual(gameTurns + 1);
      expect(testTicTacToe.get('currentPlayer')).not.toEqual(originalPlayer);
    });

    it('should increment the games turns by 1 AND change the current player when turns are equal to or more than 5 and no one has won', function() {
      var turnTicTacToe = new TicTacToe();

      turnTicTacToe.set('turns', 5);
      var gameTurns = turnTicTacToe.get('turns');
      var originalPlayer = turnTicTacToe.get('currentPlayer');

      turnTicTacToe.endMove();

      expect(turnTicTacToe.get('turns')).toEqual(gameTurns + 1);
      expect(turnTicTacToe.get('currentPlayer')).not.toEqual(originalPlayer);

      // turns are now greater than 5 because of endMove increment
      var gameTurns2 = turnTicTacToe.get('turns');
      var originalPlayer2 = turnTicTacToe.get('currentPlayer');

      turnTicTacToe.endMove();

      expect(turnTicTacToe.get('turns')).toEqual(gameTurns2 + 1);
      expect(turnTicTacToe.get('currentPlayer')).not.toEqual(originalPlayer2);
    });

    it('should increment the games turns by 1 AND NOT change the current player when turns are equal to or more than 5 AND someone has won', function() {
      var horizontalGrid = [
        ['X', 'X', 'X'],
        ['O', null, 'O'],
        [null, null, null]
      ];
      var wonTicTacToe = new TicTacToe();

      wonTicTacToe.get('board').set('grid', horizontalGrid);
      wonTicTacToe.set('turns', 5);


      var gameTurns = wonTicTacToe.get('turns');
      var originalPlayer = wonTicTacToe.get('currentPlayer');

      wonTicTacToe.endMove();

      expect(wonTicTacToe.get('turns')).toEqual(gameTurns + 1);
      expect(wonTicTacToe.get('currentPlayer')).toEqual(originalPlayer);
    });
  });

  describe('addTurn', function() {

    it('should increment the games turns by 1', function() {
      var gameTurns = testTicTacToe.get('turns');

      testTicTacToe.addTurn();

      expect(testTicTacToe.get('turns')).toEqual(gameTurns + 1);
    });
  });

  describe('hasWon', function() {

    it('should return FALSE if no one has won', function() {
      // incomplete board (contains null)
      expect(testTicTacToe.hasWon()).toBeFalsy();
      // complete board (tie)
      var tieGrid = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['O', 'X', 'O']
      ];
      var tieTicTacToe = new TicTacToe();

      tieTicTacToe.get('board').set('grid', tieGrid);

      expect(tieTicTacToe.hasWon()).toBeFalsy();
    });

    it('should not match nulls when evaluating markers for matches', function() {
      expect(testTicTacToe.hasWon()).toBeFalsy();
    });

    it('should return TRUE if 3 markers match horizontally', function() {
      var horizontalGrid = [
        ['X', 'X', 'X'],
        ['O', null, 'O'],
        [null, null, null]
      ];
      var horizontalTicTacToe = new TicTacToe();

      horizontalTicTacToe.get('board').set('grid', horizontalGrid);

      expect(horizontalTicTacToe.hasWon()).toBeTruthy();
    });

    it('should return TRUE if 3 markers match vertically', function() {
      var verticalGrid = [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['X', null, null]
          ];
      var verticalTicTacToe = new TicTacToe();

      verticalTicTacToe.get('board').set('grid', verticalGrid);

      expect(verticalTicTacToe.hasWon()).toBeTruthy();
    });

    it('should return TRUE if 3 markers match diagonally', function() {
      var diagonalBottomGrid = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['X', null, null]
      ];
      var diagonalBottomTicTacToe = new TicTacToe();

      diagonalBottomTicTacToe.get('board').set('grid', diagonalBottomGrid);
      expect(diagonalBottomTicTacToe.hasWon()).toBeTruthy();

      var diagonalTopGrid = [
        ['X', 'O', 'X'],
        ['O', 'X', null],
        ['O', null, 'X']
      ];
      var diagonalTopTicTacToe = new TicTacToe();

      diagonalTopTicTacToe.get('board').set('grid', diagonalTopGrid);
      expect(diagonalTopTicTacToe.hasWon()).toBeTruthy();
    });
  });

  describe('changePlayers', function() {

    it('change the current player to next player and back again', function() {
      var originalPlayer = testTicTacToe.get('currentPlayer');

      testTicTacToe.changePlayers();
      expect(testTicTacToe.get('currentPlayer')).not.toEqual(originalPlayer);

      testTicTacToe.changePlayers();
      expect(testTicTacToe.get('currentPlayer')).toEqual(originalPlayer);
    });
  });
});
