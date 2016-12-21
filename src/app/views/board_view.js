import _ from 'underscore';
import Backbone from 'backbone';
import SquareView from 'app/views/square_view';

const BoardView = Backbone.View.extend({
  initialize: function(options){
    // we re-render the board when the model is updated (a square has been filled)
    this.listenTo(this.model, 'change', this.render);
  },

  turn: function() {
  // triggers an event
  },

  selectedSquare: function(marker) {
    this.trigger('squareSelected', marker);

    // Return false to tell jQuery not to run any more event handlers.
    return false;
  },

  render: function() {

    const boardSquares = Backbone.$('#board-squares');
    boardSquares.empty();
    // loop within a loop - we need to have access to the larger this

    const self = this;
    this.grid = this.model.get('grid');

    this.grid.forEach(function(row, index) {

      var length = row.length;
      for (var i = 0; i < length; i++) {
        var column = i;
        const square = new SquareView({
          model: row[i],
          position: [index, column]
        });

        self.listenTo(square, 'select', self.selectedSquare);
        boardSquares.append(square.el).addClass('row small-up-3');
      }
    });
    return this;
  }
});

export default BoardView;
