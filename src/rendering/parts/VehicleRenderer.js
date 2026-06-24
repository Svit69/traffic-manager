import { VehiclePositionResolver } from "../VehiclePositionResolver.js";

export class VehicleRenderer {
  constructor(context, projector) {
    this.context = context;
    this.projector = projector;
    this.positionResolver = new VehiclePositionResolver(projector);
  }

  renderVehicle(vehicle, index) {
    const point = this.positionResolver.resolveVehiclePoint(vehicle, index);
    this.context.save();
    this.context.translate(point.x, point.y);
    this.context.rotate(vehicle.position.axis === "vertical" ? Math.PI / 4 : -Math.PI / 4);
    this.#renderCarBody(vehicle);
    this.context.restore();
  }

  #renderCarBody(vehicle) {
    this.context.fillStyle = "rgba(0,0,0,0.3)";
    this.context.fillRect(-13, -4, 26, 11);
    this.context.fillStyle = vehicle.color;
    this.context.fillRect(-14, -7, 28, 14);
    this.context.fillStyle = "#dbeafe";
    this.context.fillRect(-5, -6, 10, 12);
    this.context.fillStyle = "#111827";
    [-8, 8].forEach((x) => this.context.fillRect(x, -9, 4, 3));
    [-8, 8].forEach((x) => this.context.fillRect(x, 6, 4, 3));
  }
}
