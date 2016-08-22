// import Backbone from 'backbone';
// import $ from 'jquery';
import router from './router';
import Backbone from 'backbone';
import $ from 'jquery';
import session from './session';
import settings from './settings';

//




Backbone.history.start();


$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (localStorage.getItem('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.getItem('authtoken')}`);
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${settings.basicAuth}`);
  }
});

if(localStorage.getItem('authtoken')){
  session.retrieve();
}
