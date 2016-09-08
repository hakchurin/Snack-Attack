import $ from 'jquery';



var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var img = new Image();


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
    this.KEYS = {
        LEFT: 37,
        RIGHT: 39
    };
}

function Player(canvas, gameSize, game) {
    this.ctx = canvas;
    this.game = game;
    this.size = {
        x: 200,
        y: 150
    };
    this.center = {
        x: gameSize.x,
        y: gameSize.y - this.size.x
    };
    this.keyboarder = new Keyboarder();
    img.src = "assets/images/fryingPan.svg";


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
        ctx.drawImage(img, this.center.x - 150, this.center.y, this.size.x, this.size.y);

    }

}

export default Player;
