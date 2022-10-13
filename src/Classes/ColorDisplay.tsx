
export function initCanvas() {
  var c : any = document.getElementById('my_canvas');
  var ctx : any = c.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight - 75;
}

export class circle{
  ctx: any;
  color: any;
  x: number;
  y: number;
  size: number;
  constructor(color: any){
    var c : any = document.getElementById('my_canvas');
    this.ctx = c.getContext('2d');
    this.color = color;
    this.x = Math.random() * this.ctx.canvas.width;
    this.y = Math.random() * this.ctx.canvas.height;
    this.size = Math.random() * (100 - 10) + 10;
    this.render()
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath()
    this.ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    this.ctx.closePath()
    this.ctx.fill();
  }
}
