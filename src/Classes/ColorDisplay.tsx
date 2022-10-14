const delta = 0.02; // change in alpha per animation step
const animation_speed = 50; // time between animation calls in ms

export class color_canvas {
  c: any;
  ctx: CanvasRenderingContext2D | null;
  name: string;
  color: string;
  x: number;
  y: number;
  size: number;
  alpha: number;
  fade_sem: number;

  constructor(name: string) {
    const style =
      "position: absolute; " +
      "left: 0px; " +
      "top: 0px; "

    this.name = name

    this.c = document.createElement("canvas");
    this.ctx = this.c.getContext('2d');

    this.c.setAttribute('id', name)
    this.c.setAttribute('style', style)
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight - 95;
    this.c.style.webkitFilter = "blur(3px)";

    this.color = "#000000";
    this.x = Math.random() * this.c.width;
    this.y = Math.random() * this.c.height;
    this.size = Math.random() * (100 - 10) + 10;
    this.alpha = 0;
    this.fade_sem = 0; // fade semaphore (0 : idle | 1 : fade in | 2 fade out)

    const ele = document.getElementById('canvas_space')
    if (ele != null) {
      ele.append(this.c)

    }
  }

  create_new(color: string) {
    this.color = color;
    this.x = Math.random() * this.c.width;
    this.y = Math.random() * this.c.height;
    this.size = Math.random() * (100 - 10) + 10;
  }

  draw() {
    if (this.ctx != null) {
      this.clear()
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.closePath()
      this.ctx.fill();
    }

    if (this.fade_sem === 1) {
      setTimeout(this.fade_in.bind(this), animation_speed)
    }
    else if (this.fade_sem === 2) {
      setTimeout(this.fade_out.bind(this), animation_speed)
    }
  }

  clear() {
    if (this.ctx != null) {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height)
    }
  }

  fade_in() {
    this.fade_sem = 1;
    this.alpha = this.alpha + delta;
    if (this.alpha > 1) {
      this.alpha = 1
      this.fade_sem = 0
    }
    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }

  fade_out() {
    this.fade_sem = 2;
    this.alpha = this.alpha - delta;
    if (this.alpha < 0) {
      this.alpha = 0
      this.fade_sem = 0
    }
    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }
}