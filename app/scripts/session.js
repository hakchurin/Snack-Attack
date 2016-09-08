import settings from './settings';
import Backbone from 'backbone';




const Session = Backbone.Model.extend({
    urlRoot: `https://baas.kinvey.com/user/${settings.appId}/login`,
    defaults: {
        username: '',
        authtoken: ''
    },
    parse: function(response) {
        if (response) {
            return {
                authtoken: response._kmd.authtoken,
                username: response.username,
                userId: response._id
            };
        }
    },

    login: function(username, password) {
        this.save({
            username: username,
            password: password
        }, {
            success: (model, response) => {
                this.unset('password');
                window.localStorage.setItem('authtoken', response._kmd.authtoken);
                router.navigate('entry', {
                    trigger: true
                });
            }
        })
    },
    retrieve: function() {
        this.fetch({
            url: `https://baas.kinvey.com/user/${settings.appId}/_me`
        });
    },

    signup: function(data) {
        $.ajax({
            type: 'POST',
            url: `https:/baas.kinvey.com/user/${settings.appId}`,
            data: JSON.stringify({
                username: data.username,
                password: data.password
            }),
            contentType: 'application/json',
            success: (s) => {
                this.set({
                    username: s.username,
                    authtoken: s._kmd.authtoken,
                    _id: s._id
                })
            },
        })
    },
    logout: function() { 
        $.ajax({   
            type: 'POST',
               url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,

              
        })   localStorage.removeItem('authtoken')   this.clear()   store.settings.history.push('login') 
    },
});

let session = new Session();

export default session;
