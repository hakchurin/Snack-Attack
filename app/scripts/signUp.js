
import Backbone from 'backbone';
import router from './router';
import settings from './settings';
import $ from 'jquery';
import session from './session';



// <h3 id= "name">name</h3>
// <h3 id="signUsername"> username </h3>
// <h3 id="signPassword"> password </h3>


function signUpInfo() {
  let signUp = $(`
    <div id="signUp">
    <form class = "signUp">
    <h1 id= "SignUp"> Sign Up </h1>

    <input type="text" name="title" class="name" placeholder="name">

    <input type="text" name="title" class="signUsername" placeholder="username">

    <input type="password" name="title" class="signPassword" placeholder="password">
    <input type="submit" id="signUpSubmit" class="submit" name="submit" value="submit">
    </form>
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
          // response.unset('password');
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
