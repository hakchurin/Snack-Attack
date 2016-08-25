import $ from 'jquery';
import Backbone from 'backbone';
import highScore from './endGameModal';
import scoreCollection from './scoreCollection';
import _ from 'underscore'
import endGameImages from './data';





function endGameModal(){
  let endModal = $(`
    <div class="FinishScreen" style="display:none">
    <h1> Game Over </h1>
    <p id="images"> </p>
    <p id="score"> Your score was: </p>
    <p id="highScore"> High Score:  </p>
    <button id="restartBtn" value="Play Again"> Play Again </button>
    </div>
    `);







// 
// var images = endGameImages[Math.floor(Math.random() * endGameImages.length)];
//
//     while (images.length !== 0) {
//         // var index = Math.floor(Math.random() * images.length);
//         $('<img src="images"/>').appendTo('#images');
//     }
//






    scoreCollection.fetch({
      success: function(r){
        let fixedScore = _.sortBy(r.models,function(score){
          return score.get('score');
        })
          fixedScore= fixedScore.reverse();
          fixedScore= fixedScore.slice(0,1);
          fixedScore.forEach(function(score){
          let highScore = $(`<p id="high"> ${score.get('score')}</p>`)
          endModal.find('#highScore').append(highScore);
        })

      }
    });

    return endModal;
}
export default endGameModal;
