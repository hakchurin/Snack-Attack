import Backbone from 'backbone';
import $ from 'jquery';
import router from './router';
import endGameModal from './endGameModal';
import footerView from './footer';
import startGameModal from './startGameModal';


function gameView() {

    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    var spawnLineY = 25;
    var spawnRate = 1500;
    var spawnRateOfDescent = 1;
    var lastSpawn = -1;
    var objects = [];
    var startTime = Date.now();
    canvas.width = $(window).width();
    canvas.height = $(window).height() - 100;
    var gameSize = {x: canvas.width,y: canvas.height};
    var score = 0;
    var lives = 3;
    var input = 60;
    var paused = true;
    var game;
    var countdown;








    function calculateTime(timer) {
        var timer = timer;
        var mins = Math.floor(timer / 60);
        var secs = timer % 60;
        var time = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
        return time;
    };
    var startInterval = function() {

        $("#timer").text(calculateTime(input));
        input--;
        countdown = setInterval(function() {
            var data = calculateTime(input)
            if (input && lives > 0) {
                $("#timer").text(data);
                input--;
            } else {
                $("#timer").text("LOST!")
                clearInterval(countdown);
            }
        }, 1000);
    }




    function Game() {
        console.log('starting a game');
        var gameSize = {x: canvas.width,y: canvas.height};
        this.bodies = objects.concat(new Player(this, gameSize));



        function StartOfGame() {
            $("#screen").hide();
            $(".StartScreen").show();
        }
        StartOfGame();
        $('#startBtn').on('click', function() {
            $(".StartScreen").hide();
            $("#screen").show();
            startInterval()
            paused = false;
            requestAnimationFrame(tick);
        })





        var self = this;
        var tick = function() {
            self.update();
            self.draw(screen, gameSize);
            if (paused) {
                cancelAnimationFrame(tick);
            }




            function spawnRandomObject() {
                var size = {x: 15,y: 0};
                var x = Math.random() * (canvas.width - 30) + 15;

                var object = {x: x, y: spawnLineY,
                    center: {x: x + 7.5, y: 50 - size.x},
                    size: {x: 15, y: 0},
                }
                objects.push(object);
            }

            var time = Date.now();
            if (time > (lastSpawn + spawnRate)) {
                lastSpawn = time;
                spawnRandomObject();
            }

            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                var size = {x: 15, y: 0};
                object.y += spawnRateOfDescent;
                ctx.beginPath();
                ctx.arc(object.x, object.y, size.x, size.y, Math.PI * 2);
                ctx.fill();

            }

            function endGame() {
                $("#screen").hide();
                $("#score").text(score);
                $(".FinishScreen").show();
                self.update();
            }
              if (lives === 0 || input === 0) {
                cancelAnimationFrame(tick);
                endGame();
            }
            if (lives !== 0 && input !== 0 && !paused) {
                requestAnimationFrame(tick);
            }
            $('#restartBtn').on('click', function() {
                resetView();
            })

        };
        tick();

        $('#pause').on('click', function() {
            paused = true;
            clearInterval(countdown);
        })

        $('#play').on('click', function() {
            paused = false;
            requestAnimationFrame(tick);
            startInterval();
        })
    };

    function resetView() {
        score = 0;
        lives = 3;
        input = 60;
        self.update();
    }


    Game.prototype = {
        update: function() {
            $("#timer").text("time: " + calculateTime(input));
            $("#score").text("Current Score: " + score);
            $("#lives").text("Lives: " + lives);

            function hitTestPoint(b1, b2) {
                if (b2.center.x <= b1.center.x - 50 || b2.center.x >= b1.center.x + 55) {
                    return false;
                } else if (b1.center.y >= b2.y - 15 && b1.center.y <= b2.y + 15) {
                    return true;
                } else {
                    return false;
                }
            }

            var newObject = objects.filter((current, i, arr) => {
                if (hitTestPoint(this.bodies[0], current)) {
                    score += 100;
                    return false;
                } else if (current.y === $(window).height()) {
                    lives -= 1;
                    return false;
                } else {
                    return true
                }
            })

            objects = newObject;
            for (var i = 0; i < this.bodies.length; i++) {
                this.bodies[i].update();
            }
        },
        draw: function(screen, gameSize) {
            ctx.clearRect(0, 0, gameSize.x, gameSize.y);
            for (var i = 0; i < this.bodies.length; i++) {
                drawRect(screen, this.bodies[i]);
            }
        }
    };

    var Player = function(game, gameSize) {
        this.game = game;
        this.size = {x: 100,y: 20};
        this.center = {x: gameSize.x, y: gameSize.y - this.size.x};
        this.keyboarder = new Keyboarder();
    };


    Player.prototype = {
        update: function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                this.center.x = Math.max(25, this.center.x - 15);
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x = Math.min($(window).width() - 25, this.center.x + 15);
            }
        }
    };


    var drawRect = function(screen, body) {
        ctx.fillRect(body.center.x - body.size.x / 2,
            body.center.y - body.size.y / 2,
            body.size.x, body.size.y);
    };


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
            RIGHT: 39,
            SPACE: 32
        };
    }



    var colliding = function(b1, b2) {
        return !(b1 === b2 ||
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
    };



    $(document).ready(function() {});
    // window.setInterval(function(){
    //   spawnRateOfDescent += 0.5
    //   spawnRate -= spawnRate / 100 * 20;
    // },5000);
    game = new Game("screen");

}
// render gameView();
export default gameView;
