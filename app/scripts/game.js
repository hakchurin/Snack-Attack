import Backbone from 'backbone'; //maybe no
import $ from 'jquery';
import router from './router';
import endGameModal from './endGameModal';
import footerView from './footer';
import startGameModal from './startGameModal';


function gameView() {

    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    var spawnLineY = 25; //what is this
    var spawnRate = 1500;
    var spawnRateOfDescent = 1;
    var lastSpawn = -1;
    // var objects = [];
    // var player = [];

    var startTime = Date.now();
    var gameSize = {
        x: canvas.width,
        y: canvas.height
    };
    var score = 0;
    var lives = 3;
    var input = 60;
    var paused = true;
    var game; //?
    var countdown;
    canvas.width = $(window).width();
    canvas.height = $(window).height() - 100;


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
            if (input > 0 && lives > 0) {
                $("#timer").text(data);
                input--;
            } else {
                $("#timer").text("LOST!")
                clearInterval(countdown);
            }
        }, 1000);
    }

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

    var gameSize = {x: canvas.width, y: canvas.height};
    function Player(game, gameSize) {

        this.game = game;
        this.size = {x: 100, y: 20};
        this.center = {x: gameSize.x, y: gameSize.y - this.size.x};
        this.keyboarder = new Keyboarder();

        this.update = function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                this.center.x = Math.max(25, this.center.x - 15);
                this.draw(gameSize)
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x = Math.min($(window).width() - 25, this.center.x + 15);
                this.draw(gameSize)
            }
        }
        this.drawRect = function() {
          ctx.fillRect(this.center.x - this.size.x / 2,
              this.center.y - this.size.y / 2,
              this.size.x, this.size.y);
      }
      this.draw = function(gameSize) {
          ctx.clearRect(0, 0, gameSize.x, gameSize.y);
          this.drawRect()

      }
    };

  var gameSize = {x: canvas.width, y: canvas.height};
  let player = new Player(ctx,gameSize)

//
//   function SpawnRandomObject() {
//       this.size = {x: 15,y: 0};
//       this.x = Math.random() * (canvas.width - 30) + 15;
//       this.objects = {x: x,y: spawnLineY,
//           center: {x: x + 7.5,y: 50 - size.x},
//           size: {x: 15,y: 0},
//       }
//       objects.push(object);
//   }
//
// this.update = function(object){
//   for (var i = 0; i < this.objects.length; i++) {
//       this.obj = objects[i];
//       var size = {x: 15,y: 0};
//       obj.y += spawnRateOfDescent;
//       ctx.beginPath();
//       ctx.arc(obj.x, obj.y, size.x, size.y, Math.PI * 2);
//       ctx.fill();
//   }
//
//
// }
//
//
//   let spawnRandomObject = new SpawnRandomObject(gameSize);









    function Game() {
      console.log('running game function');
        var gameSize = {x: canvas.width, y: canvas.height};

        // this.bodies = objects.concat(new Player(this, gameSize));
        // this.player= [new Player(this, gameSize)];
        this.player = player
        // this.fallingObj = object

        var self = this;
        function StartOfGame() {
            $("#screen").hide();
            $(".StartScreen").show();
            $('#startBtn').on('click', function() {
                $(".StartScreen").hide();
                $("#screen").show();
                startInterval()
                paused = false;
                requestAnimationFrame(tick);
            })
            self.player.drawRect()
        }
        StartOfGame();


        var tick = function() { //syntax consitant
          // console.log('in tick');
          self.player.update()
            self.update();
            if (paused) {
                cancelAnimationFrame(tick);
            }



            var time = Date.now();
            if (time > (lastSpawn + spawnRate)) {
                lastSpawn = time;
                // spawnRandomObject();
            }

            function endGame() {
                $("#screen").hide();
                $("#score").text("Score: " + score);
                $(".FinishScreen").show();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                self.update();
            }
            if (lives === 0 || input === 0) {
                cancelAnimationFrame(tick);
                endGame();
            }
            if (lives !== 0 && input !== 0 && !paused) {
                requestAnimationFrame(tick);
            }
        };
        tick();

        $('#restartBtn').on('click', function() {
            requestAnimationFrame(tick);
            tick();
            startInterval();
            resetView();
            this.bodies;
        })

        $('#pause').on('click', function() {
            paused = true;
            clearInterval(countdown);
        })

        $('#play').on('click', function() {
            paused = false;
            requestAnimationFrame(tick);
            startInterval();
        })

        function resetView() {
            score = 0;
            lives = 3;
            input = 60;
            self.update();
            $(".FinishScreen").hide();
        }
    };




    Game.prototype = {
        update: function() {
            $("#timer").text("Time: " + calculateTime(input));
            $("#footerScore").text("Current Score: " + score);
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
            //
            // var filteredObjects = objects.filter((current, i, arr) => {
            //     if (hitTestPoint(this.bodies[0], current)) {
            //         score += 100;
            //         return false;
            //     } else if (current.y === $(window).height()) {
            //         lives -= 1;
            //         return false;
            //     } else {
            //         return true
            //     }
            // })
            //
            // objects = filteredObjects;

        //     for (var i = 0; i < this.bodies.length; i++) {
        //         this.bodies[i].update();
        //     }
        },




    };





    // $(document).ready(function() {});
    // window.setInterval(function(){
    //   spawnRateOfDescent += 0.5
    //   spawnRate -= spawnRate / 100 * 20;
    // },5000);
    game = new Game("screen");

}
export default gameView;
