import { RouteFactory } from "./RouteFactory.js";
import { SmoothAxisSpeedController } from "./SmoothAxisSpeedController.js";
export class HorizontalVehicleMotionController {
  constructor() {
    this.routeFactory = new RouteFactory();
    this.speedController = new SmoothAxisSpeedController();
    this.route = null;
    this.speed = 0;
    this.respawnTimer = 0;
  }

  resetRoute(bounds) {
    this.route = this.routeFactory.createHorizontalRoute(bounds);
    this.speed = 0;
    this.respawnTimer = 0;
  }

  updatePosition(deltaSeconds) {
    if (this.respawnTimer > 0) return this.#processCooldown(deltaSeconds);
    this.speed = this.speedController.calculateNextSpeed(this.route, this.speed, this.route.exitX, deltaSeconds);
    this.route.x += this.speed * deltaSeconds;
    if (this.route.exitX - this.route.x <= 2 * this.route.frame.scale) this.#startCooldown();
    return this.#createVehicleSnapshot(this.respawnTimer <= 0);
  }

  #processCooldown(deltaSeconds) {
    this.respawnTimer -= deltaSeconds;
    if (this.respawnTimer <= 0) this.resetRoute(this.route.frame);
    return this.#createVehicleSnapshot(false);
  }

  #startCooldown() {
    this.route.x = this.route.exitX;
    this.speed = 0;
    this.respawnTimer = 1.6;
  }

  #createVehicleSnapshot(isVisible) {
    return { ...this.route, isVisible };
  }
}
