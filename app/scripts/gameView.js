import Backbone from 'backbone';
import $ from 'jquery';
import router from './router';
import endGameModal from './endGameModal';
import footerView from './footer';
import startGameModal from './startGameModal';
import fillCanvas from './player';
import FallingObject from './fallingObj';
import scoreCollection from './scoreCollection';
import session from './session';
import _ from 'underscore'


function Game(canvas) {
    this.gameSize = {
        x: canvas.width,
        y: canvas.height
    };

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.player = new fillCanvas(this.ctx, this.gameSize, this);
    this.objects = []
    var self = this;
    this.input = 60;
    this.score = 0;
    this.lives = 3;
    this.countdown;
    this.paused = false;
    this.lastSpawn = -1;
    this.spawnRate = 1500;
    this.spawnRateOfDescent = 1;
    this.audio = new Audio('assets/sound/snackAttackMusic.mp3');
    this.levelUp = new Audio('assets/sound/levelUp.mp3');
    this.miss = new Audio('assets/sound/miss.mp3');
    scoreCollection.fetch();

    $("#timer").text("Time: " + this.calculateTime(this.input));
    $("#footerScore").text("Current Score: " + this.score);
    $("#lives").text("Lives: " + this.lives);
    $('#restartBtn').on('click', function() {

    $('startGameModal').hide();
    router.gamefunction();
    });

    $('#volUp').on('click', () => {
      this.audio.play();
    });
    $('#volOff').on('click', () => {
      this.audio.pause();
    });

    $('#volOff').show();
    $('#volOff').click(function() {

    var $this = $(this);
    $this.toggleClass('active');
    if ($this.hasClass('active')) {

        $('#volUp').show();
        $('#volOff').hide();
    } else {
        $('#volUp').hide();
    }
  });

  $('#volUp').click(function() {
    var $this = $(this);
    $this.toggleClass('active');

    if ($this.hasClass('active')) {
      $('#volUp').hide();
      $('#volOff').show();
    } else {
      $('#volUp').show();
    }
  });

  $('#pause').on('click', () => {
      this.paused = true;
      this.audio.pause();
      clearInterval(this.countdown);
  });

  $('#play').on('click', () => {
      this.paused = false;
      requestAnimationFrame(self.tick.bind(self));
      this.audio.play();
      self.startInterval();
  });

  this.StartOfGame();
}

Game.prototype = {
  StartOfGame: function() {
    $("#screen").hide();
    $(".StartScreen").show();
    $('#startBtn').on('click', () => {
      $(".StartScreen").hide();
      $("#screen").show();
      this.startInterval();
      this.increaseSpeed();
      this.audio.play();
      requestAnimationFrame(this.tick.bind(this));
    });

  this.player.draw();
},
calculateTime: function(timer) {
  var mins = Math.floor(timer / 60);
  var secs = timer % 60;
  var time = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  return time;
},

startInterval: function() {
  $("#timer").text("Time: " + this.calculateTime(this.input));

  this.countdown = setInterval(() => {
    this.input -= 1;
    var data = this.calculateTime(this.input)
    if (this.input > 0 && this.lives > 0) {
        $("#timer").text("Time: " + data);
    } else if (this.input > 0) {
        $("#timer").text("Time: " + data);
        $("#timer").text("LOST!")

        clearInterval(this.countdown);
    } else {
        $("#timer").text("TIMES UP!")
        clearInterval(this.countdown);
    }
  }, 1000);
},

    tick: function() {
        this.time = Date.now();
        this.ctx.clearRect(0, 0, this.gameSize.x, this.gameSize.y);
        this.player.draw()
        this.objects.forEach(obj => {
            obj.spawnRateOfDescent = this.spawnRateOfDescent;
            obj.draw()
        })

        if (this.time > (this.lastSpawn + this.spawnRate)) {
            this.lastSpawn = this.time;
            this.objects.push(new FallingObject(this.ctx, this.canvas));
        }



        this.player.update()
        if (this.paused) {
            cancelAnimationFrame(this.tick);
        }


        let hitTestPoint = (object) => {
            if (this.player.center.x <= object.x - 100 || this.player.center.x >= object.x + 100) {
                return false;

            } else if (object.y - 50 >= this.player.center.y - 25 && object.y - 50 <= this.player.center.y + 25) {
                this.levelUp.play();
                return true;
            } else {
                return false;
            }
        }
        this.objects = this.objects.filter((object) => {
            if (hitTestPoint(object)) {
                this.score += 100;
                $("#footerScore").text("Current Score: " + this.score);
                return false;
            } else {
                return true;
            }
        })

        let self = this;

        function reachedBottom(object, gameSize) {
            if (object.y >= gameSize.y - 110) {
                self.miss.play();
                return true;
            } else {
                return false;
            }
        }
        this.objects = this.objects.filter((current, i, arr) => {
            if (reachedBottom(current, this.gameSize)) {
                this.lives -= 1;
                $("#lives").text("Lives: " + this.lives);
                return false;
            } else {
                return true;
            }
        });





        let endGame = () => {
            $("#screen").hide();
            $("#score").text("Score: " + this.score);
            console.log($('#high'));

            if (localStorage.getItem('authtoken')) {
                let fixedScore = _.sortBy(scoreCollection.models, function(score) {
                    return score.get('score');
                })

                fixedScore = fixedScore.reverse();
                fixedScore = fixedScore.slice(0, 1);
                let highscore = fixedScore[0].get('score')

                if ((this.score) > highscore) {
                    $('#images').empty().append('<img src="assets/images/topDog.svg" id="topDog"/>')
                }
            }


            $(".FinishScreen").show();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.audio.pause();

            scoreCollection.create({
                score: this.score,
                username: session.get('username')
            });
        }



        if (this.input === 0 || this.lives === 0) {
            cancelAnimationFrame(this.tick.bind(this));
            endGame();
        } else if (this.lives !== 0 && this.input !== 0 && !this.paused) {
            requestAnimationFrame(this.tick.bind(this));
        }

        if (this.lives === 0) {
            $('#images').empty().append('<img src="assets/images/tomato.svg" id="tomato"/>')
        }

    },
    resetView: function() {
        this.score = 0;
        this.lives = 3;
        this.input = 60;
        this.objects = []
        $("#footerScore").text("Current Score: " + this.score);
        $("#lives").text("Lives: " + this.lives);
        $("#timer").text("Time: " + this.calculateTime(this.input));
        $(".FinishScreen").hide();
    },

    increaseSpeed: function() {
        window.setInterval(() => {
            this.spawnRateOfDescent = this.spawnRateOfDescent * 1.2;
            this.spawnRate = this.spawnRate * 0.95;
        }, 5000)
    }
};

export default Game;
