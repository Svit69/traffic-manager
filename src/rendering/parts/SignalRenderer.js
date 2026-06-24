export class SignalRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderSignals(activeAxis) {
    [
      [-1.85, -1.85, "vertical", "N"],
      [1.85, 1.85, "vertical", "S"],
      [-1.85, 1.85, "horizontal", "W"],
      [1.85, -1.85, "horizontal", "E"]
    ].forEach(([x, y, axis, label]) => this.#renderSignal(x, y, label, axis === activeAxis));
  }

  #renderSignal(x, y, label, isGreen) {
    const point = this.projector.projectTile(x, y, 0.2);
    this.#renderPole(point);
    this.#renderSignalBox(point, isGreen);
    this.#renderDirectionLabel(point, label);
  }

  #renderPole(point) {
    this.context.fillStyle = "#475569";
    this.context.fillRect(point.x - 3, point.y - 18, 6, 42);
  }

  #renderSignalBox(point, isGreen) {
    this.context.fillStyle = "#0f172a";
    this.context.fillRect(point.x - 10, point.y - 54, 20, 38);
    this.#renderLamp(point.x, point.y - 45, isGreen ? "#5f1e24" : "#ef4444");
    this.#renderLamp(point.x, point.y - 35, "#7c4a03");
    this.#renderLamp(point.x, point.y - 25, isGreen ? "#22c55e" : "#14532d");
  }

  #renderLamp(x, y, color) {
    this.context.beginPath();
    this.context.arc(x, y, 4, 0, Math.PI * 2);
    this.context.fillStyle = color;
    this.context.fill();
  }

  #renderDirectionLabel(point, label) {
    this.context.fillStyle = "#f8fafc";
    this.context.font = "700 10px system-ui";
    this.context.fillText(label, point.x - 3, point.y - 59);
  }
}
