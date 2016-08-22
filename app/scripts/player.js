
import $ from 'jquery';



      var Keyboarder = function() {
          var keyState = {};
          window.onkeydown = function(e) {
              keyState[e.keyCode] = true;
          };
          window.onkeyup = function(e) {
              keyState[e.keyCode] = false;
          };
          this.isDown = function(keyCode) {
              return keyState[keyCode] === true;
          };
          this.KEYS = {LEFT: 37,RIGHT: 39};
      }

  function Player(canvas, gameSize, game) {
    this.ctx = canvas;
      this.game = game;
      this.size = {x: 100,y: 20};
      this.center = {x: gameSize.x,y: gameSize.y - this.size.x};
      this.keyboarder = new Keyboarder();

      this.update = function() {
          if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
              this.center.x = Math.max(25, this.center.x - 15);
              this.draw(gameSize)
          } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
              this.center.x = Math.min($(window).width() - 25, this.center.x + 15);
              this.draw(game.gameSize)
          }
      }


  };
  Player.prototype = {
      draw: function() {
          this.ctx.fillRect(this.center.x - this.size.x / 2,
              this.center.y - this.size.y / 2,
              this.size.x, this.size.y);
      }
  }
  export default Player;
