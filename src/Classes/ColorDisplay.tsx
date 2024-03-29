import React from "react";
const animation_speed = 50; // time between animation calls in ms

function hsl_math(r,g,b){
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  var h = (max + min) / 2;
  var s = (max + min) / 2;
  var l = (max + min) / 2;

  if (max === min) {
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

  h = Math.round(360 * h);

  return {h, s, l}
}

function to_hsl(color: string, octave: number, interval_color:string, interval_percentage:number) {
  // Parse result for <color>
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  var r = parseInt(result[1], 16)/255;
  var g = parseInt(result[2], 16)/255;
  var b = parseInt(result[3], 16)/255;

  // Parse result for <interval_color>
  var iresult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(interval_color);
  var ir = parseInt(iresult[1], 16)/255;
  var ig = parseInt(iresult[2], 16)/255;
  var ib = parseInt(iresult[3], 16)/255;

  let values = hsl_math(r,g,b)
  let intervalValues = hsl_math(ir,ig,ib)

  let range = Math.abs(values.h - intervalValues.h)
  if(range > 180) {
    range -= 360 // flip range to go other direction around circle
  }
  let offset = Math.round(range * (interval_percentage / 100))
  values.h = (values.h - offset) % 360

  values.s = (values.s * 100);
  values.s = Math.round(values.s);
  values.l = (values.l * 100) + (5 * octave);
  values.l = Math.round(values.l);

  return 'hsl(' + values.h + ', ' + values.s + '%, ' + values.l + '%)';
}

export class ColorCanvas extends React.Component{
  c: any;
  ctx: CanvasRenderingContext2D | null;
  name: string;
  color: string;
  dis_color: string;
  x: number;
  y: number;
  size: number;
  alpha: number;
  fade_sem: number; // 0 : idle | 1 : fade in | 2 fade out
  fade_delta: number; // rate of change for the fade
  display_status: boolean; //false : not displayed | true : displayed
  style:any

  constructor(props) {
    super(props)

    this.style =
      {dislpay:'block',
      left: "0px" ,
      bottom: "0px" ,
      background : "#000000",
      width: '100%',
      height: '100%',
      WebkitFilter: "blur(3px)"}

    this.alpha = 0;
    this.fade_sem = 0; 
    this.fade_delta = Math.random() * (0.50 - 0.25) + 0.25 
    this.display_status = false
  }

  set_ctx(){
    this.c = document.getElementById('ColorCanvas');
    this.ctx = this.c.getContext('2d');
  }

  draw_new(color: string, octave: number, interval_color:string, interval_percentage:number ) {
    if(this.c == undefined) {
      this.set_ctx()
    }
    
    this.clear()
    this.dis_color = to_hsl(color, octave, interval_color, interval_percentage);

    this.size = Math.random() * (75 - 25) + 25;
    this.x = Math.round(Math.random() * ((this.c.width - this.size) - this.size) + this.size);
    this.y = Math.round(Math.random() * ((this.c.height - this.size) - this.size) + this.size);
    this.fade_delta = Math.random() * (0.25 - 0.15) + 0.15  // rate of change for the fade

    this.fade_in()
  }

  check_inactive() {
    return (!this.display_status && this.fade_sem == 0)
  }

  check_active() {
    return (this.display_status && this.fade_sem == 0)
  }

  draw() {

    if (this.ctx != null) {
      let backgroundHeight = document.getElementById('background').clientHeight
      this.c.width = window.innerWidth
      this.c.height = window.innerHeight - backgroundHeight;

      this.clear()
      this.ctx.fillStyle = this.dis_color;
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.closePath()
      this.ctx.fill();
    }

    if (this.fade_sem == 1) {
      setTimeout(this.fade_in.bind(this), animation_speed)
    }
    else if (this.fade_sem == 2) {
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
    this.alpha += this.fade_delta;

    if (this.alpha > 1) {
      this.alpha = 1
      this.fade_sem = 0
      this.display_status = true
    }

    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }

  fade_out() {
    this.fade_sem = 2;
    this.alpha -= this.fade_delta;

    if (this.alpha < 0) {
      this.alpha = 0
      this.fade_sem = 0
      this.display_status = false
    }

    this.ctx.globalAlpha = this.alpha;
    this.draw();
  }

  render() {
    return(<canvas id="ColorCanvas" style={this.style}></canvas>)
  }
}
