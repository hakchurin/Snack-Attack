

import $ from 'jquery';
import Backbone from 'backbone';









function startGameModal(){
  let startModal = $(`
    <h1> Start Game </h1>
    <button id="startBtn" value="Start"> Start Game </button>
    </div>
    `);
    return startModal;
}
export default startGameModal;
