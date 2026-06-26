import { RouteFactory } from "./RouteFactory.js";
import { SmoothSpeedController } from "./SmoothSpeedController.js";
export class VehicleMotionController {
  constructor() {
    this.routeFactory = new RouteFactory();
    this.speedController = new SmoothSpeedController();
    this.state = "approaching";
    this.speed = 0;
    this.route = null;
    this.respawnTimer = 0;
  }
  resetRoute(bounds) {
    this.route = this.routeFactory.createVerticalRoute(bounds);
    this.state = "approaching";
    this.speed = 0;
    this.respawnTimer = 0;
  }
  updatePosition(deltaSeconds, isGreen) {
    if (this.state === "cooldown") return this.#processCooldown(deltaSeconds);
    if (this.state === "waiting" && !isGreen) return this.#createVehicleSnapshot(true);
    if (this.state === "waiting" && isGreen) this.state = "leaving";
    const targetY = this.#resolveTargetY(isGreen);
    this.speed = this.speedController.calculateNextSpeed(this.route, this.speed, targetY, deltaSeconds);
    this.route.y -= this.speed * deltaSeconds;
    this.#snapToTargetWhenArrived(targetY);
    return this.#createVehicleSnapshot(this.state !== "cooldown");
  }
  isWaitingAtSignal() { return this.state === "waiting"; }
  #processCooldown(deltaSeconds) {
    this.respawnTimer -= deltaSeconds;
    if (this.respawnTimer > 0) return this.#createVehicleSnapshot(false);
    this.resetRoute(this.route.frame);
    return this.#createVehicleSnapshot(false);
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
    this.state = targetY === this.route.stopY ? "waiting" : "cooldown";
    if (this.state === "cooldown") this.respawnTimer = 1.2;
  }
  #createVehicleSnapshot(isVisible) {
    return { ...this.route, state: this.state, isVisible };
  }
}
