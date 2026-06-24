import { GameObject } from "../core/GameObject.js";

export class Vehicle extends GameObject {
  #waitingTicks = 0;
  #progress = 0;
  #isCrossing = false;

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
  get isCrossing() {
    return this.#isCrossing;
  }

  incrementWaitingTime() {
    if (this.#isCrossing) return;
    this.#waitingTicks += 1;
  }

  beginIntersectionCrossing() {
    this.#isCrossing = true;
    this.#progress = 0;
  }

  advanceThroughIntersection() {
    this.#progress += 0.18;
    return this.#progress >= 1;
  }

  renderObject(renderer, index) {
    renderer.renderVehicle(this, index);
  }
}
