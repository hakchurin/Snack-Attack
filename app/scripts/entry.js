import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';




var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var spawnLineY = 25;
var spawnRate = 1500;
var spawnRateOfDescent = 1;
var lastSpawn = -1;
var objects = [];
var invaders = [];

var startTime = Date.now();
var gameSize = {x: canvas.width,y: canvas.height};

var score = 0;

var blockData = [
    ['width', 10],
    ['height', 10],
    ['ySpeed', 2]

];


// animate();
// x

function spawnRandomObject() {
  var object = {
        x: Math.random() * (canvas.width - 30) + 15,
        y: spawnLineY,
    }
    objects.push(object);

}




// console.log(checkCollision,'hit');




function Game() {
    var gameSize = {x: canvas.width, y: canvas.height};
    // this.bodies =objects().concat(new Player(this, gameSize));
    this.bodies=[new Player(this,gameSize)];



    var self = this;
    var tick = function() {
        self.update();
        self.draw(screen, gameSize);





          var time = Date.now();
         if (time > (lastSpawn + spawnRate)) {
             lastSpawn = time;
             spawnRandomObject();
         }



         for (var i = 0; i < objects.length; i++) {
             var object = objects[i];
             object.y += spawnRateOfDescent;
             ctx.beginPath();
             ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);


             ctx.fill();
         }

        requestAnimationFrame(tick);

    };
    tick();
    // function checkCollision(){
    //   console.log('running');
    //   if(object.x < drawRect + drawRect.width &&
    //       object.x + object.width > drawRect &&
    //       object.y < drawRect + drawRect.height &&
    //       object.height + object.y > drawRect.y);
    // }

};




Game.prototype = {
    update: function() {
      // var bodies = this.bodies;
      // var notCollidingWithAnything = function (b1){
      //   return bodies.filter(function(b2) {return colliding(b1, b2); }).length ===0;
      // };
      //
      // this.bodies= this.bodies.filter(notCollidingWithAnything);


      function hitTestPoint (b1,b2){
        if ((b1.center.x <= b2.center.x && b1.center.x + b1.size.x >= b2.center.x) &&
      (b1.size.x <= b2.size.y && b1.size.y+b1.center.y >= b2.center.y))
      return true;
      else
      return false;
      }
      console.log(true);



// console.log('colliding');
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
    this.size = {x: 50,y: 20};
    this.center = {x: gameSize.x / 2, y: gameSize.y - this.size.x};
    this.keyboarder = new Keyboarder();

};


Player.prototype = {
    update: function() {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
            this.center.x -= 2;
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
            this.center.x += 2;
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

//
window.onload = function() {
    new Game("screen");
};
var colliding= function(b1, b2){
  return !(b1 === b2 ||
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y+  b2.size.y / 2 );
};




//
// //
// // var canvas = document.getElementById("screen");
// // var ctx = canvas.getContext("2d");
// //
// // var spawnLineY = 0;
// // var spawnRate = 1500;
// // var spawnRateOfDescent = 2;
// // var lastSpawn = -1;
// // var objects = [];
// // var startTime = Date.now();
// // animate();
// //
//
//
// // }) ();
//
//
//
//
//
//
// //
// //
//
//
//
//
//
//
// //
// //
// //
// // Catcher = new function()
// // {
// //     // [...]
// //
// //     // By passing a reference of the block object to the function, we can use the current very block to perform our collision detection
// //     function checkCollision(block)
// //     {
// //         // [...]
// //
// //         // If the block's x-coordinate is in the range of the basket's width, then we've got a collision
// //         if (object.x >= object.x &amp;&amp;
// //             object.x + object.width <= basket.x + basket.width)
// //         {
// //             // Whether it's a correctly colored block or not, the current block should disappear and the amount of blocks on the screen should decrease with one
// //             if (block.alive == true)
// //             {
// //                 block.alive = false;
// //                 blocksOnScreen--;
// //             }
// //
// //             // If the block's color matches the basket's current color, we've got a correct catch
// //             if (block.color ===  basket.color)
// //                 // So give the player some points
// //                 score += block.strength;
// //             else
// //                 // Otherwise, inflict damage to the health of the player
// //                 health -= block.strength;
// //         }
// //         // If it's not, the block has missed the basket and will thus, eventually, collide with the ground
// //         else
// //         {
// //         }
// // }
// // }
//
//
// // var canvas = document.getElementById("screen");
// // var ctx = canvas.getContext("2d");
// //
// // var spawnLineY = 0;
// // var spawnRate = 1500;
// // var spawnRateOfDescent = 2;
// // var lastSpawn = -1;
// // var objects = [];
// // var startTime = Date.now();
// // var gameSize= {x: canvas.width, y: canvas.height};
// //
// // animate();
// //
// //
// //
// // function spawnRandomObject() {
// //     var object = {
// //         x: Math.random() * (canvas.width - 1) + 1,
// //         y: spawnLineY,
// //     }
// //     objects.push(object);
// // }
// //
// //
// //
// //
// // function animate() {
// //   var time = Date.now();
// //     if (time > (lastSpawn + spawnRate)) {
// //         lastSpawn = time;
// //         spawnRandomObject();
// //     }
// //
// //
// //
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     ctx.beginPath();
// //     ctx.moveTo(0, spawnLineY);
// //     ctx.stroke();
// //
// //     for (var i = 0; i < objects.length; i++) {
// //         var object = objects[i];
// //         object.y += spawnRateOfDescent;
// //         ctx.beginPath();
// //         ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
// //         ctx.closePath();
// //         ctx.fill();
// //     }
// //
