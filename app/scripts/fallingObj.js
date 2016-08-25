




import foodImages from './foodArray';


var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

      function FallingObject(ctx, canvas) {
        this.img = new Image();

          this.spawnLineY = 25;
          this.ctx = ctx;
          this.canvas = canvas;
          this.size = {x: 70,y: 70};
          this.x = Math.random() * (this.canvas.width - 30) + 15;
          this.y = 25
          this.img.src = foodImages[Math.floor(Math.random() * foodImages.length)].url;


      }

      FallingObject.prototype = {
          draw: function() {
            console.log('drawing');
              this.y += 1;
              ctx.drawImage(this.img, this.x, this.y, this.size.x, this.size.y);


          }
      }

export default FallingObject;
