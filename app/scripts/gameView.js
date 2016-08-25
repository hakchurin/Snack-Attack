
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


    function Game(canvas) {
       this.gameSize = {x: canvas.width,y: canvas.height};
        this.ctx= canvas.getContext("2d");
        this.canvas =canvas;
        this.player = new fillCanvas(this.ctx,this.gameSize, this);
        this.objects = []
        var self = this;
        this.input = 60;
        this.score = 0;
        this.lives = 3;
        this.countdown;
        this.paused = false;
        this.lastSpawn = -1;
        this.spawnRate = 1500;


        $("#timer").text("Time: " + this.calculateTime(this.input));
        $("#footerScore").text("Current Score: " + this.score);
        $("#lives").text("Lives: " + this.lives);

        $('#restartBtn').on('click', function() {

            $('startGameModal').hide();
            router.gamefunction();

        })

        $('#pause').on('click', () => {
            this.paused = true;
            clearInterval(this.countdown);
        })

        $('#play').on('click', () => {
            this.paused = false;
            requestAnimationFrame(self.tick.bind(self));
            self.startInterval();
        })
        this.StartOfGame();
    }

    Game.prototype = {
        StartOfGame: function() {
            $("#screen").hide();
            $(".StartScreen").show();
            $('#startBtn').on('click', () => {
                $(".StartScreen").hide();
                $("#screen").show();
                this.startInterval()
                requestAnimationFrame(this.tick.bind(this));
            })
            this.player.draw()
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
                } else if  (this.input > 0) {
                     $("#timer").text("Time: " + data);
                     $("#timer").text("LOST!")

                      clearInterval(this.countdown);
                } else  {
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
                if (this.player.center.x <= object.x - 90 || this.player.center.x >= object.x + 90) {
                    return false;
                } else if (object.y - 10 >= this.player.center.y - 15 && object.y - 10 <= this.player.center.y + 15) {
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

            function reachedBottom(object,gameSize) {
                if (object.y >= gameSize.y) {
                    return true;
                } else {
                    return false;
                }
            }
            this.objects = this.objects.filter((current, i, arr) => {
                if (reachedBottom(current, this.gameSize )) {
                    this.lives -= 1;
                    $("#lives").text("Lives: " + this.lives);

                    return false;
                } else {
                    return true;
                }

            })


            let endGame = () => {
                $("#screen").hide();
                $("#score").text("Score: " + this.score);
                $(".FinishScreen").show();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                scoreCollection.create({
                  score:this.score,
                  username:session.get('username')
                })
            }
            if (this.lives === 0 || this.input === 0) {
                cancelAnimationFrame(this.tick.bind(this));
                endGame();
            } else if (this.lives !== 0 && this.input !== 0 && !this.paused) {
                requestAnimationFrame(this.tick.bind(this));
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
        }
    };

    export default Game;
