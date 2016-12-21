import Backbone from 'backbone';

const Board = Backbone.Model.extend({

    defaults: {
        grid : [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
    },

    initialize: function() {
      this.set('grid',  [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]);
    }
});

module.exports = Board;

// DO NOT REMOVE THIS
export default Board;
