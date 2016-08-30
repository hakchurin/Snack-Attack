
import Backbone from 'backbone';
import router from './router';
import settings from './settings';
import $ from 'jquery';
import session from './session';



function signUpInfo() {
  let signUp = $(`
        <div id="signUp">
        <h1 id= "SignUp"> Sign Up </h1>

          <form class = "signUp">
            <input type="text" name="title" class="name" placeholder="name">
            <input type="text" name="title" class="signUsername" placeholder="username">
            <input type="password" name="title" class="signPassword" placeholder="password">
          </form>

          <div id="signNav">
        <input type="submit" id="signUpSubmit" class="submit" name="submit" value="submit">
        <p id = "backLogin">Back to <a href="#login">Login</a> </p>

        </div>
        </div>
    `);
    signUp.find('input[type="submit"]').on('click', function(evt){
      evt.preventDefault();
      let name = signUp.find('.name').val();
      let username = signUp.find('.signUsername').val();
      let password = signUp.find('.signPassword').val();

      localStorage.removeItem('authtoken');
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
          session.set('username', username);
          session.set('authtoken', response._kmd.authtoken);
          console.log('triggered');
          localStorage.authtoken = response._kmd.authtoken;
          router.navigate('game', {trigger:true});
        },
      });
    });

return signUp;
}
export default signUpInfo;
