import Backbone from 'backbone';
import settings from './settings';




const ScoreModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/snackAttck`,
  defaults: {
    score: 0
  },
});


export default ScoreModel;
