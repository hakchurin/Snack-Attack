import Backbone from 'backbone';
import $ from 'jquery';
import router from './router';
import endGameModal from './endGameModal';
import footerView from './footer';
import startGameModal from './startGameModal';
import Player from './player';
import FallingObject from './fallingObj';




function resetCanvas() {
  var canvas = document.getElementById("screen");
  canvas.width = $(window).width();
  canvas.height = $(window).height() - 100;
var ctx= canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return canvas;
}



export default resetCanvas;





// $(document).ready(function() {});
// window.setInterval(function(){
//   spawnRateOfDescent += 0.5
//   spawnRate -= spawnRate / 100 * 20;
// },5000);
