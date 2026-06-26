import { RouteFactory } from "./RouteFactory.js";
import { SmoothSpeedController } from "./SmoothSpeedController.js";

export class VehicleMotionController {
  constructor() {
    this.routeFactory = new RouteFactory();
    this.speedController = new SmoothSpeedController();
    this.state = "approaching";
    this.speed = 0;
    this.route = null;
  }

  resetRoute(bounds) {
    this.route = this.routeFactory.createVerticalRoute(bounds);
    this.state = "approaching";
    this.speed = 0;
  }

  updatePosition(deltaSeconds, isGreen) {
    if (this.state === "waiting" && !isGreen) return this.#createVehicleSnapshot();
    if (this.state === "waiting" && isGreen) this.state = "leaving";
    const targetY = this.#resolveTargetY(isGreen);
    this.speed = this.speedController.calculateNextSpeed(this.route, this.speed, targetY, deltaSeconds);
    this.route.y -= this.speed * deltaSeconds;
    this.#snapToTargetWhenArrived(targetY);
    return this.#createVehicleSnapshot();
  }

  isWaitingAtSignal() {
    return this.state === "waiting";
  }

  #resolveTargetY(isGreen) {
    if (this.state === "approaching" && !isGreen) return this.route.stopY;
    return this.route.exitY;
  }

  #snapToTargetWhenArrived(targetY) {
    const arrivalTolerance = 2 * this.route.frame.scale;
    if (this.route.y - targetY > arrivalTolerance) return;
    this.route.y = targetY;
    this.speed = 0;
    this.state = targetY === this.route.stopY ? "waiting" : "done";
  }

  #createVehicleSnapshot() {
    if (this.state === "done") this.resetRoute(this.route.frame);
    return { ...this.route, state: this.state };
  }
}
