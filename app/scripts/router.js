import Backbone from 'backbone';
import gameView from './game';
import loginInfo from './login';
import signUpInfo from './signUp';
import $ from 'jquery';
import footerView from './footer';
import endGameModal from './endGameModal';
import startGameModal from './startGameModal';
import logoutInfo from './logout';
import resetCanvas from './game';
import Game from './gameView';
import highScoreView from './leaderboard';



  const Router = Backbone.Router.extend({
    routes: {
      login: 'loginfunction',
      signUp: 'signUpFunction',
      game: 'gamefunction',
      leaderboard: 'leaderboardFunction',
      '/*': 'redirectFunction'
    },
    loginfunction: function(){
      $('#container').empty().append(loginInfo());
      resetCanvas();
    },
    signUpFunction: function(){
      $('#container').empty().append(signUpInfo());
    },

    leaderboardFunction: function(){
      $('#container').empty().append(highScoreView());

    },
    gamefunction: function(){
      $('#container').empty().append(footerView());
      $('#container').append(startGameModal());
      $('#container').append(endGameModal());
    var canvas= resetCanvas();
    var game = new Game(canvas);

    },
    redirectFunction: function(){
      window.location.hash= 'game';
    }
  })

let router = new Router();

export default router;
