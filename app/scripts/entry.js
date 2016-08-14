import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';





var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var spawnLineY = 0;
var spawnRate = 1500;
var spawnRateOfDescent = 2;
var lastSpawn = -1;
var objects = [];
var startTime = Date.now();
var gameSize = {
    x: canvas.width,
    y: canvas.height
};


// function spawnRandomObject() {
//     var object = {
//         x: Math.random() * (canvas.width - 5) + 1,
//         y: spawnLineY,
//     }
//     objects.push(object);
// }


// animate();

// function animate() {
//
//     var time = Date.now();
//     if (time > (lastSpawn + spawnRate)) {
//         lastSpawn = time;
//         Invaders();
//     }
//
//
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.moveTo(0, spawnLineY);
//     ctx.stroke();
//
//     for (var i = 0; i < objects.length; i++) {
//         var object = objects[i];
//         object.y += spawnRateOfDescent;
//         ctx.beginPath();
//         ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }
// animate();
// }









function Game() {
    var gameSize = {
        x: canvas.width,
        y: canvas.height
    };
    this.bodies = createInvaders(this).concat(new Player(this, gameSize));




    var self = this;

    var tick = function() {
        self.update();
        self.draw(screen, gameSize);

        requestAnimationFrame(tick);

    };
    tick();
};

Game.prototype = {
    update: function() {
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
    this.size = {
        x: 15,
        y: 15
    };
    this.center = {
        x: gameSize.x / 2,
        y: gameSize.y - this.size.x
    };
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


var Invader = function(game, center) {
    this.game = game;
    this.size = {
        x: 15,
        y: 15
    };
    this.center = center;
    this.speedY = 5;


};


Invader.prototype = {
    update: function() {

        this.center.y += this.speedY;
        this.patrolY += this.speedY;

        // var intervalId= window.setInterval(animate,5);

        function animate() {

            var time = Date.now();
            if (time > (lastSpawn + spawnRate)) {
                lastSpawn = time;
                // createInvaders();
            }


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, spawnLineY);
            ctx.stroke();

            for (var i = 0; i < Invader.length; i++) {
                var object = object[i];
                object.y += spawnRateOfDescent;
                ctx.beginPath();
                ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            animate();
        }
    }
};

var createInvaders = function(game) {
    var invaders = [];
    var object = {
        y: spawnLineY
    };
    for (var i = 0; i < 20; i++) {

        var x = Math.random() * (canvas.width + 30) + 10;
        var y = 10 + (i % 10) * 50;
        invaders.push(new Invader(game, {x: x,y: y}));
    }
    return invaders;
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


window.onload = function() {
    new Game("screen");
};








//
// var canvas = document.getElementById("screen");
// var ctx = canvas.getContext("2d");
//
// var spawnLineY = 0;
// var spawnRate = 1500;
// var spawnRateOfDescent = 2;
// var lastSpawn = -1;
// var objects = [];
// var startTime = Date.now();
// animate();
//
//
//
// function spawnRandomObject() {
//     var object = {
//         x: Math.random() * (c.width - 1) + 1,
//         y: spawnLineY,
//     }
//     objects.push(object);
// }
//
//
//
// function animate() {
//
//     var time = Date.now();
//     if (time > (lastSpawn + spawnRate)) {
//         lastSpawn = time;
//         spawnRandomObject();
//     }
//
//     requestAnimationFrame(animate);
//
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.moveTo(0, spawnLineY);
//     ctx.stroke();
//
//     for (var i = 0; i < objects.length; i++) {
//         var object = objects[i];
//         object.y += spawnRateOfDescent;
//         ctx.beginPath();
//         ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }
//
// }
//




// }) ();






//
//






//
//
//
// Catcher = new function()
// {
//     // [...]
//
//     // By passing a reference of the block object to the function, we can use the current very block to perform our collision detection
//     function checkCollision(block)
//     {
//         // [...]
//
//         // If the block's x-coordinate is in the range of the basket's width, then we've got a collision
//         if (object.x >= object.x &amp;&amp;
//             object.x + object.width <= basket.x + basket.width)
//         {
//             // Whether it's a correctly colored block or not, the current block should disappear and the amount of blocks on the screen should decrease with one
//             if (block.alive == true)
//             {
//                 block.alive = false;
//                 blocksOnScreen--;
//             }
//
//             // If the block's color matches the basket's current color, we've got a correct catch
//             if (block.color ===  basket.color)
//                 // So give the player some points
//                 score += block.strength;
//             else
//                 // Otherwise, inflict damage to the health of the player
//                 health -= block.strength;
//         }
//         // If it's not, the block has missed the basket and will thus, eventually, collide with the ground
//         else
//         {
//         }
// }
// }


// var canvas = document.getElementById("screen");
// var ctx = canvas.getContext("2d");
//
// var spawnLineY = 0;
// var spawnRate = 1500;
// var spawnRateOfDescent = 2;
// var lastSpawn = -1;
// var objects = [];
// var startTime = Date.now();
// var gameSize= {x: canvas.width, y: canvas.height};
//
// animate();
//
//
//
// function spawnRandomObject() {
//     var object = {
//         x: Math.random() * (canvas.width - 1) + 1,
//         y: spawnLineY,
//     }
//     objects.push(object);
// }
//
//
//
//
// function animate() {
//   var time = Date.now();
//     if (time > (lastSpawn + spawnRate)) {
//         lastSpawn = time;
//         spawnRandomObject();
//     }
//
//
//
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.moveTo(0, spawnLineY);
//     ctx.stroke();
//
//     for (var i = 0; i < objects.length; i++) {
//         var object = objects[i];
//         object.y += spawnRateOfDescent;
//         ctx.beginPath();
//         ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }
//
