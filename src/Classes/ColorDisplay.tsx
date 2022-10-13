export class color_canvas {
  c: any;
  ctx: CanvasRenderingContext2D | null;
  name: string;

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
    this.c.style.webkitFilter = "blur(1px)"
    const ele = document.getElementById('canvas_space')
    if (ele != null) {
      ele.append(this.c)

    }



  }

  draw(color: string) {
    if (this.ctx != null) {
      let x = Math.random() * this.c.width;
      let y = Math.random() * this.c.height;
      let size = Math.random() * (100 - 10) + 10;
      this.ctx.fillStyle = color;
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, 2 * Math.PI);
      this.ctx.closePath()
      this.ctx.fill();
    }
    setTimeout(this.clear.bind(this), Math.random() * 5000) // delete color after 0-5s
  }

  clear() {
    if (this.ctx != null) {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height)
    }
  }
}