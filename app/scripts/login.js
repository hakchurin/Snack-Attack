import Backbone from 'backbone';
import entry from './entry';
import router from './router';
import settings from './settings';
import $ from 'jquery';
import session from './session';

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");




function loginInfo() {
  let login = $(`
    <div class="loginPage">
      <form class= "loginForm">
        <h2 id="loginHead"> Login </h2>
        <input type ="text" class="username" placeholder="username" />
        <input type ="password" class="password" placeholder="password" />
        <input type="submit" id="loginSubmit" class="submit" name="Login" value="Login">

        <p id = "noSignUp">If you dont have an account <a href="#signUp">Sign Up</a> or <a href id ="playNow"> Play</a> now</p>

      </form>
    </div>
    `);

    $('#playNow').on('click', function(){
    router.navigate('game', {trigger:true});
  });

  login.find('input[type="submit"]').on('click',function(evt){
    evt.preventDefault();
  let username = login.find('.username').val();
  let password = login.find('.password').val();
  var encrypted = btoa(settings.appId + ':' + settings.appSecret);

  $.ajax({
  type: 'POST',
    url: `https://baas.kinvey.com/user/${settings.appId}/login`,

  data: JSON.stringify({
    username:username,
    password:password
  }),
  headers: {
    Authorization: `Basic ${encrypted}`
  },
  contentType: 'application/json',
  success: function(response){
    session.set('username', response.username);
    session.set('authtoken', response._kmd.authtoken);
    $('.username').val('');
    $('.password').val('');
    localStorage.authtoken = response._kmd.authtoken;
    router.navigate('game', {trigger:true});
  },
  error: function(response){
  }
  });
  });
  return login;
}
export default loginInfo;
