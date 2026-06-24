export class RoadRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderGround() {
    const gradient = this.context.createLinearGradient(0, 0, 0, this.projector.canvas.height);
    gradient.addColorStop(0, "#18322f");
    gradient.addColorStop(1, "#0f1d25");
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.projector.canvas.width, this.projector.canvas.height);
  }

  renderIntersection(snapshot) {
    this.#renderRoadAxis("horizontal", snapshot.horizontalQueue > 6);
    this.#renderRoadAxis("vertical", snapshot.verticalQueue > 9);
    this.#renderCenterPlate();
    this.#renderCurbs();
  }

  #renderRoadAxis(axis, overloaded) {
    this.context.fillStyle = overloaded ? "#6f2527" : "#29343a";
    const size = axis === "horizontal" ? [6.8, 1.25] : [1.25, 6.8];
    this.projector.buildDiamondPath(this.context, 0, 0, size[0], size[1]);
    this.context.fill();
  }

  #renderCenterPlate() {
    this.context.fillStyle = "#344149";
    this.projector.buildDiamondPath(this.context, 0, 0, 1.35, 1.35);
    this.context.fill();
  }

  #renderCurbs() {
    this.context.strokeStyle = "#e2e8f0";
    this.context.lineWidth = 3;
    [-1.38, 1.38].forEach((offset) => this.#strokeIsoLine(-6.8, offset, 6.8, offset));
    [-1.38, 1.38].forEach((offset) => this.#strokeIsoLine(offset, -6.8, offset, 6.8));
  }

  #strokeIsoLine(x1, y1, x2, y2) {
    const start = this.projector.projectTile(x1, y1);
    const end = this.projector.projectTile(x2, y2);
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
  }
}
