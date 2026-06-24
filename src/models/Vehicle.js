import { GameObject } from "../core/GameObject.js";

export class Vehicle extends GameObject {
  #waitingTicks = 0;
  #progress = 0;

  constructor(flowAxis, queueIndex) {
    super({ axis: flowAxis, queueIndex });
    this.color = flowAxis === "vertical" ? "#f97316" : "#38bdf8";
  }

  get waitingTicks() {
    return this.#waitingTicks;
  }

  get progress() {
    return this.#progress;
  }

  incrementWaitingTime() {
    this.#waitingTicks += 1;
  }

  advanceThroughIntersection() {
    this.#progress += 0.34;
    return this.#progress >= 1;
  }

  renderObject(renderer, index) {
    renderer.renderVehicle(this, index);
  }
}
