
import Backbone from 'backbone';
import router from './router';
import settings from './settings';
import $ from 'jquery';
import session from './session';







function signUpInfo() {
  let signUp = $(`
    <form class = "signUp">
    <h1 id= "SignUp"> Sign Up </h1>

    <h3 id= "name">name</h3>
    <input type="text" name="title" class="name" placeholder="name">

    <h3 id="username"> username </h3>
    <input type="text" name="title" class="username" placeholder="username">

    <h3 id="password"> password </h3>
    <input type="password" name="title" class="password" placeholder="password">
    <input type="submit" id="signUpSubmit" class="submit" name="submit" value="submit">
    </form>
    `);
    signUp.find('input[type="submit"]').on('click', function(evt){
      evt.preventDefault();
      let name = signUp.find('.name').val();
      let username = signUp.find('.username').val();
      let password = signUp.find('.password').val();

      $.ajax({
        type:'POST',
        url: `${settings.baseUrl}/user/${settings.appId}`,

        data: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          Authorization: `Basic ${settings.basicAuth}`
        },
        contentType: 'application/json',
        success: function(response){
          session.username = username;
          session.authtoken = response._kmd.authtoken;
          router.navigate('game', {trigger:true});
          localStorage.authtoken = response._kmd.authtoken;

        },
      });
    });

return signUp;
}
export default signUpInfo;
