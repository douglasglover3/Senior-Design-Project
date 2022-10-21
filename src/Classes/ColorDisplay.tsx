const animation_speed = 50; // time between animation calls in ms

function to_hsl(color: string, ocitve: number) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  var h = (max + min) / 2;
  var s = (max + min) / 2;
  var l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  }
  else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = (s * 100);
  s = Math.round(s);
  l = (l * 100) + (10 * ocitve);
  l = Math.round(l);
  h = Math.round(360 * h);

  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

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
  fade_delta: number;

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

    this.color = to_hsl("#000000", 0);
    this.x = Math.random() * this.c.width;
    this.y = Math.random() * this.c.height;
    this.size = Math.random() * (100 - 10) + 10;
    this.alpha = 0;
    this.fade_sem = 0; // fade semaphore (0 : idle | 1 : fade in | 2 fade out)
    this.fade_delta = Math.random() * (0.50 - 0.05) + 0.05 // rate of change for the fade

    const ele = document.getElementById('canvas_space')
    if (ele != null) {
      ele.append(this.c)

    }
  }

  draw_new(color: string, ocitve: number) {
    this.color = to_hsl(color, ocitve);
    //this.x = Math.random() * this.c.width;
    //this.y = Math.random() * this.c.height;
    //this.size = Math.random() * (100 - 10) + 10;  
    this.x = 100 * (ocitve + 2) + 50
    this.y = 100
    this.size = 50
    this.fade_delta = Math.random() * (0.50 - 0.05) + 0.05 // rate of change for the fade

    this.fade_in()
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
    this.alpha = this.alpha + this.fade_delta;
    if (this.alpha > 1) {
      this.alpha = 1
      this.fade_sem = 0
    }
    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }

  fade_out() {
    this.fade_sem = 2;
    this.alpha = this.alpha - this.fade_delta;
    if (this.alpha < 0) {
      this.alpha = 0
      this.fade_sem = 0
    }
    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }
}
