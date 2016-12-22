import $ from 'jquery';

import ApplicationView from 'app/views/application_view';
import Games from 'app/collections/games';

$(document).ready(function() {
  var games = new Games({});

  games.fetch();

  var appView = new ApplicationView({
    el: '#application',
    model: games
  });

  appView.render();
});
