export class VehiclePositionResolver {
  constructor(projector) {
    this.projector = projector;
  }

  resolveVehiclePoint(vehicle, index) {
    if (vehicle.isCrossing) return this.#resolveCrossingPoint(vehicle);
    return this.#resolveQueuedPoint(vehicle, index);
  }

  #resolveQueuedPoint(vehicle, index) {
    const gap = 0.7;
    if (vehicle.position.axis === "vertical") {
      return this.projector.projectTile(0.48, -2.5 - index * gap);
    }
    return this.projector.projectTile(-2.5 - index * gap, 0.48);
  }

  #resolveCrossingPoint(vehicle) {
    const start = -1.85;
    const end = 2.35;
    const lane = start + (end - start) * vehicle.progress;
    if (vehicle.position.axis === "vertical") return this.projector.projectTile(0.48, lane);
    return this.projector.projectTile(lane, 0.48);
  }
}
