import $ from 'jquery';
import Backbone from 'backbone';
import highScore from './endGameModal';
import scoreCollection from './scoreCollection';
import _ from 'underscore'
import endGameImages from './endGameArray';





function endGameModal(){
  let endModal = $(`
    <div class="FinishScreen" style="display:none">
    <h1 id="gameOver"> Game Over </h1>
    <div id="images"> </div>
    <div id="scores">

      <p id="score">Your score was: </p>
      <p id="highScore">High Score:  </p>

    </div>
    <button id="restartBtn" value="Play Again"> Play Again </button>
    </div>
    `);








  var image = endGameImages[Math.floor(Math.random() * endGameImages.length)];
  console.log(image);
  console.log(endGameImages);

  endModal.find(`#images`).append(`<img src="${image.url}"/>`);







    scoreCollection.fetch({
      success: function(r){
        let fixedScore = _.sortBy(r.models,function(score){
          return score.get('score');
        })
          fixedScore = fixedScore.reverse();
          fixedScore = fixedScore.slice(0,1);
          fixedScore.forEach(function(score) {
            endModal.find('#highScore').html(`High Score: ${score.get('score')}`)


            // let highScore = $(`<p id="high">${score.get('score')}</p>`)
            // console.log(score.get('score'));
            // endModal.find('#wrapper').append(highScore);
          })

      }
    });

    return endModal;
}
export default endGameModal;
