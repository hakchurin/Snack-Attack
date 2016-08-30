

import $ from 'jquery';
import Backbone from 'backbone';







function startGameModal(){
  let startModal = $(`
    <div class="StartScreen" style="display:none">
    <h1 id="snackAttack"> Snack Attack </h1>
    <p id="instructions">Use the arrow keys to move left and right to catch the falling food  </p>

    <img src="../assets/images/SAbanner.svg" id="banner" alt="banner">



    <button> <i class="fa fa-arrow-left" id="leftArrow" aria-hidden="true"></i></button>
    <button>  <i class="fa fa-arrow-right" id="rightArrow" aria-hidden="true"></i></button>
    <button id="startBtn" value="Start"> Start Game </button>
    </div>
    `);
    return startModal;
}
export default startGameModal;
