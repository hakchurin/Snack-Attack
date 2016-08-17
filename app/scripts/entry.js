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
  if (session.authtoken) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${session.authtoken}`);
  } else {
    console.log('basic');
    xhrAjax.setRequestHeader('Authorization', `Basic ${settings.basicAuth}`);
  }
});
