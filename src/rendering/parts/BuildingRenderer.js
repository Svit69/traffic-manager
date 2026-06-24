export class BuildingRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderCornerBlocks() {
    [
      [-4.7, -4.2, "#2dd4bf"],
      [4.7, -4.2, "#fb7185"],
      [-4.7, 4.2, "#facc15"],
      [4.7, 4.2, "#818cf8"]
    ].forEach(([x, y, color]) => this.#renderBuilding(x, y, color));
  }

  #renderBuilding(x, y, color) {
    const base = this.projector.projectTile(x, y);
    const roof = this.projector.projectTile(x, y, 1.4);
    this.context.fillStyle = "#263640";
    this.context.fillRect(base.x - 34, roof.y, 68, base.y - roof.y + 18);
    this.context.fillStyle = color;
    this.context.fillRect(base.x - 26, roof.y - 8, 52, 20);
    this.context.fillStyle = "rgba(255,255,255,0.22)";
    this.context.fillRect(base.x - 18, roof.y + 22, 12, 18);
    this.context.fillRect(base.x + 8, roof.y + 22, 12, 18);
  }
}
