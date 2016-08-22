



      function FallingObject(ctx, canvas) {
          this.spawnLineY = 25;
          this.ctx=ctx;
          this.canvas = canvas;

          this.size = {x: 15,y: 0};
          this.x = Math.random() * (this.canvas.width - 30) + 15;
          this.y = 25
          this.objects = {
              x: this.x,
              y: this.spawnLineY,
              center: {x: this.x + 7.5, y: 50 - this.size.x},
              size: {x: 15,y: 0},
          }

      }

      FallingObject.prototype = {
          draw: function() {
              this.y += 1;
              this.ctx.beginPath();
              this.ctx.arc(this.x, this.y, this.size.x, this.size.y, Math.PI * 2);
              this.ctx.fill();
          }
      }

export default FallingObject;
