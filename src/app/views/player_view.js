import _ from 'underscore';
import Backbone from 'backbone';

const PlayerView = Backbone.View.extend({
  initialize: function(options){
    this.players = options.players;
    this.template = _.template(Backbone.$('#tmpl-player').html());
    this.currentPlayerID = options.currentPlayer;
  },



  render: function() {

    const playerSection = Backbone.$('#players');

    this.currentPlayer = this.players[this.currentPlayerID];
    this.currentPlayerTmpl = this.template(this.currentPlayer);

    playerSection.html(this.currentPlayerTmpl);

    this.currentPlayerID = ((this.currentPlayerID === 0) ? 1 : 0);

    return this;
  }
});

export default PlayerView;
