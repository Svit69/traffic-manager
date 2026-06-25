import { RouteFactory } from "./RouteFactory.js";
import { SmoothSpeedController } from "./SmoothSpeedController.js";

export class VehicleMotionController {
  constructor() {
    this.routeFactory = new RouteFactory();
    this.speedController = new SmoothSpeedController();
    this.state = "approaching";
    this.waitTimer = 0;
    this.speed = 0;
    this.route = null;
  }

  resetRoute(bounds) {
    this.route = this.routeFactory.createVerticalRoute(bounds);
    this.state = "approaching";
    this.waitTimer = 0;
    this.speed = 0;
  }

  updatePosition(deltaSeconds) {
    if (this.state === "waiting") return this.#processWaiting(deltaSeconds);
    const targetY = this.state === "approaching" ? this.route.stopY : this.route.exitY;
    this.speed = this.speedController.calculateNextSpeed(this.route, this.speed, targetY, deltaSeconds);
    this.route.y -= this.speed * deltaSeconds;
    this.#snapToTargetWhenArrived(targetY);
    return this.#createVehicleSnapshot();
  }

  #processWaiting(deltaSeconds) {
    this.waitTimer += deltaSeconds;
    if (this.waitTimer >= 2) this.state = "leaving";
    return this.#createVehicleSnapshot();
  }

  #snapToTargetWhenArrived(targetY) {
    const arrivalTolerance = 2 * this.route.frame.scale;
    if (this.route.y - targetY > arrivalTolerance) return;
    this.route.y = targetY;
    this.speed = 0;
    this.state = this.state === "approaching" ? "waiting" : "done";
  }

  #createVehicleSnapshot() {
    if (this.state === "done") this.resetRoute(this.route.frame);
    return { ...this.route, state: this.state };
  }
}
