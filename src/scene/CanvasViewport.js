export class CanvasViewport {
  constructor(canvas) {
    this.canvas = canvas;
  }

  resizeCanvasToDisplay() {
    const ratio = window.devicePixelRatio || 1;
    const bounds = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.floor(bounds.width * ratio);
    this.canvas.height = Math.floor(bounds.height * ratio);
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      ratio
    };
  }
}
