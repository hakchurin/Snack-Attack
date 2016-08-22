

import $ from 'jquery';
import Backbone from 'backbone';
import scoreCollection from './scoreCollection';






function highScoreView(){
  let highScore = $(`
    <div class="highScore">
      <h1> Leaderboard </h1>
      <h2> Rank </h2>
      <ul>  </ul>
      <h2> Name </h2>
      <h2> Score </h2>
      <button id="startBtn" value="Start"> Start Game </button>
    </div>
    `);

scoreCollection.fetch({
  success: function(r){
    console.log(r);
  }
});

    return highScore;
}
export default highScoreView;
