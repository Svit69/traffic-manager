export class IsometricProjector {
  constructor(canvas) {
    this.canvas = canvas;
  }

  projectTile(x, y, z = 0) {
    const scale = Math.min(this.canvas.width, this.canvas.height) / 18;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height * 0.47;
    return {
      x: centerX + (x - y) * scale,
      y: centerY + (x + y) * scale * 0.5 - z * scale
    };
  }

  buildDiamondPath(context, x, y, width, height) {
    const top = this.projectTile(x, y - height);
    const right = this.projectTile(x + width, y);
    const bottom = this.projectTile(x, y + height);
    const left = this.projectTile(x - width, y);
    context.beginPath();
    context.moveTo(top.x, top.y);
    [right, bottom, left].forEach((point) => context.lineTo(point.x, point.y));
    context.closePath();
  }
}
