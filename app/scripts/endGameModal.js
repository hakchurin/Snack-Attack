import $ from 'jquery';
import Backbone from 'backbone';






function endGameModal(){
  let endModal = $(`
    <div class="FinishScreen" style="display:none">
    <h1> Game Over </h1>
    <p> Your score was: </p>
    <button id="restartBtn" value="Start"> start </button>
    </div>
    `);
    return endModal;
}
export default endGameModal;
