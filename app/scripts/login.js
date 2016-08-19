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
    <div class="login">
      <form class= "loginForm">
        <h2 id="loginHead"> Login </h2>
        <input type ="text" class="username" placeholder="username" />
        <input type ="password" class="password" placeholder="password" />
        <input type="submit" id="loginSubmit" class="submit" name="Login" value="Login">
      </form>
    </div>
    `);

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
    session.username = username;
    session.authtoken = response._kmd.authtoken;
    router.navigate('game', {trigger:true});
    $('.username').val('');
    $('.password').val('');
    localStorage.authtoken = response._kmd.authtoken;
  },
  error: function(response){
  }
  });
  });
  return login;
}
export default loginInfo;
