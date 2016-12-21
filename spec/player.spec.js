// Do not remove
import Player from 'app/models/player';

describe('Player', function() {

  var testPlayerX = new Player({name: "Testy", marker: "X"});
  var testPlayerO = new Player({name: "Crabby", marker: "O"});

  describe('Player', function() {
    it('should be defined', function() {
      expect(testPlayerX).toBeDefined();
    });

    it('should have a name', function() {
      expect(testPlayerX.get('name')).toEqual("Testy");
    });

    it('should be assigned a marker', function() {
      expect(testPlayerX.get('marker')).toEqual("X");
      expect(testPlayerO.get('marker')).toEqual("O");
    });
  });
});
