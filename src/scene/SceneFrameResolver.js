export class SceneFrameResolver {
  constructor(canvas) {
    this.canvas = canvas;
    this.sourceWidth = 1080;
    this.sourceHeight = 1920;
  }

  resolveFrame() {
    const scale = Math.min(
      this.canvas.width / this.sourceWidth,
      this.canvas.height / this.sourceHeight
    );
    const width = this.sourceWidth * scale;
    const height = this.sourceHeight * scale;
    return {
      x: (this.canvas.width - width) / 2,
      y: (this.canvas.height - height) / 2,
      width,
      height,
      scale
    };
  }
}
