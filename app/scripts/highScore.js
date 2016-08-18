

import $ from 'jquery';
import Backbone from 'backbone';







function highScoreView(){
  let highScore = $(`
    <div class="highScore>
    <h1> Leaderboard </h1>
    <h2> Rank </h2>
    <h2> Name </h2>
    <h2> Score </h2>
    <button id="startBtn" value="Start"> Start Game </button>
    </div>
    `);
    return highScore;
}
export default highScoreView;
