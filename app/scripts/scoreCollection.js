import Backbone from 'backbone';
import scoreModel from './scoreModel';
import settings from './settings';



const ScoreCollection = Backbone.Collection.extend({
defaults: {
  score: 0
},
  model: scoreModel,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/snackAttck`
});

let scoreCollection = new ScoreCollection();

export default scoreCollection;
