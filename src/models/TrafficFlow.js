import { Vehicle } from "./Vehicle.js";

export class TrafficFlow {
  #queue = [];

  constructor(axis, minimumSpawn, maximumSpawn) {
    this.axis = axis;
    this.minimumSpawn = minimumSpawn;
    this.maximumSpawn = maximumSpawn;
  }

  get queueLength() {
    return this.#queue.length;
  }

  get vehicles() {
    return [...this.#queue];
  }

  spawnVehiclesForCycle() {
    const total = this.#calculateSpawnCount();
    Array.from({ length: total }).forEach(() => {
      this.#queue.push(new Vehicle(this.axis, this.#queue.length));
    });
  }

  processTick(hasGreenLight) {
    this.#queue.forEach((vehicle) => vehicle.incrementWaitingTime());
    if (!hasGreenLight || this.#queue.length === 0) return null;
    return this.#queue[0].advanceThroughIntersection() ? this.#queue.shift() : null;
  }

  #calculateSpawnCount() {
    const spread = this.maximumSpawn - this.minimumSpawn + 1;
    return this.minimumSpawn + Math.floor(Math.random() * spread);
  }
}
