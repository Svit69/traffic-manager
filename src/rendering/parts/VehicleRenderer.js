export class VehicleRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
  }

  renderVehicle(vehicle, index) {
    const point = this.#resolveVehiclePoint(vehicle, index);
    this.context.save();
    this.context.translate(point.x, point.y);
    this.context.rotate(vehicle.position.axis === "vertical" ? Math.PI / 4 : -Math.PI / 4);
    this.context.fillStyle = vehicle.color;
    this.context.fillRect(-11, -6, 22, 12);
    this.context.fillStyle = "rgba(255,255,255,0.55)";
    this.context.fillRect(-4, -5, 8, 10);
    this.context.restore();
  }

  #resolveVehiclePoint(vehicle, index) {
    const gap = 0.64;
    const progressOffset = vehicle.progress * 1.9;
    if (vehicle.position.axis === "vertical") {
      return this.projector.projectTile(0.43, -2.2 - index * gap + progressOffset);
    }

    return this.projector.projectTile(-2.2 - index * gap + progressOffset, 0.43);
  }
}
