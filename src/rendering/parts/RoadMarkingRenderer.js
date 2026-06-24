export class RoadMarkingRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderLaneMarks() {
    this.context.strokeStyle = "rgba(248,250,252,0.62)";
    this.context.lineWidth = 2;
    [-5, -3.4, 3.4, 5].forEach((x) => this.#strokeIsoLine(x, 0, x + 0.9, 0));
    [-5, -3.4, 3.4, 5].forEach((y) => this.#strokeIsoLine(0, y, 0, y + 0.9));
    this.#renderStopLines();
  }

  #renderStopLines() {
    this.context.strokeStyle = "#f8fafc";
    [-1.65, 1.65].forEach((x) => this.#strokeIsoLine(x, -1.1, x, 1.1));
    [-1.65, 1.65].forEach((y) => this.#strokeIsoLine(-1.1, y, 1.1, y));
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
