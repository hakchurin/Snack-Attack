import Backbone from 'backbone';
import entry from './entry';
import router from './router';
import settings from './settings';
import $ from 'jquery';
import session from './session';

function logoutInfo() {
  console.log(session);
  let navBtn;
  if (localStorage.getItem('authtoken')){
  navBtn = $(`
      <div class="logout">
          <input type="submit" id="logoutSubmit" class="submit" name="Logout" value="Logout">
      </div>
      `);

  } else {
    console.log('no authtoken yet');
    navBtn = $(`
        <div class="login">
            <input type="button" id="loginBtn" class="submit" name="Login" value="Login">
        </div>
        `);
  }
  navBtn.find('#loginBtn').on('click', function(){
    router.navigate('login', {trigger:true});
  })
  navBtn.find('input[type="submit"]').on('click',function(evt){
    evt.preventDefault();

    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
      success: function() {
        localStorage.removeItem('authtoken')
        // this.clear()
        router.navigate('login', {trigger:true});
      }
    })
  })
  return navBtn;
}

export default logoutInfo;
