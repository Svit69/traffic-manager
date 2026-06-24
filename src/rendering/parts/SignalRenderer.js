export class SignalRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderSignals(activeAxis) {
    [
      [-1.8, -1.8, "vertical"],
      [1.8, 1.8, "vertical"],
      [-1.8, 1.8, "horizontal"],
      [1.8, -1.8, "horizontal"]
    ].forEach(([x, y, axis]) => this.#renderSignal(x, y, axis === activeAxis));
  }

  #renderSignal(x, y, isGreen) {
    const point = this.projector.projectTile(x, y, 0.2);
    this.context.fillStyle = "#111827";
    this.context.fillRect(point.x - 5, point.y - 24, 10, 30);
    this.context.beginPath();
    this.context.arc(point.x, point.y - 18, 7, 0, Math.PI * 2);
    this.context.fillStyle = isGreen ? "#22c55e" : "#ef4444";
    this.context.fill();
  }
}
