// Do not remove
import Board from 'app/models/board';

describe('Board', function() {

  var testBoard = new Board();

  describe('Board', function() {
    it('should be defined', function() {
      expect(testBoard).toBeDefined();
    });

    it('should have a grid', function() {
      expect(testBoard.get('grid')).toBeDefined();
    });
  });

  describe('grid', function() {

    var grid = testBoard.get('grid');

    it('should be an array', function() {
      expect(Array.isArray(grid)).toBe(true);
    });

    it('should be 3 long', function() {
      expect(grid.length).toEqual(3);
    });

    it('should be made of sub-arrays', function() {
      grid.forEach(function(array) {
        expect(Array.isArray(array)).toBe(true);
      });
    });

    it('each sub-arrays should have a length of 3', function() {
      grid.forEach(function(array) {
        expect(array.length).toEqual(3);
      });
    });

    it('each sub-arrays should default values of null', function() {
      grid.forEach(function(array) {
        array.forEach(function(element){
          expect(element).toBeNull();

        });
      });
    });
  });
});
