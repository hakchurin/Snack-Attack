import Backbone from 'backbone';
import gameView from './game';
import loginInfo from './login';
import signUpInfo from './signUp';
import $ from 'jquery';
import footerView from './footer';
import endGameModal from './endGameModal';


  const Router = Backbone.Router.extend({
    routes: {
      login: 'loginfunction',
      signUp: 'signUpFunction',
      game: 'gamefunction',
      '/*': 'redirectFunction'
    },
    loginfunction: function(){
      $('#container').empty(  gameView).append(loginInfo());
    },
    signUpFunction: function(){
      console.log('signup func');

      $('#container').empty().append(signUpInfo());
    },
    gamefunction: function(){
      console.log('hi');
      $('#container').empty().append(footerView().append(endGameModal()));
      gameView();
    },
    redirectFunction: function(){
      window.location.hash= 'game';
    }
  })

let router = new Router();

export default router;
