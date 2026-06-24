import { Vehicle } from "./Vehicle.js";
export class TrafficFlow {
  #queue = [];
  #crossingVehicle = null;
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
  get crossingVehicles() {
    return this.#crossingVehicle ? [this.#crossingVehicle] : [];
  }
  spawnVehiclesForCycle() {
    const total = this.#calculateSpawnCount();
    Array.from({ length: total }).forEach(() => {
      this.#queue.push(new Vehicle(this.axis, this.#queue.length));
    });
  }
  processTick(hasGreenLight) {
    this.#queue.forEach((vehicle) => vehicle.incrementWaitingTime());
    if (this.#crossingVehicle) return this.#advanceCrossingVehicle();
    if (!hasGreenLight || this.#queue.length === 0) return null;
    this.#crossingVehicle = this.#queue.shift();
    this.#crossingVehicle.beginIntersectionCrossing();
    return null;
  }
  #calculateSpawnCount() {
    const spread = this.maximumSpawn - this.minimumSpawn + 1;
    return this.minimumSpawn + Math.floor(Math.random() * spread);
  }
  #advanceCrossingVehicle() {
    if (!this.#crossingVehicle.advanceThroughIntersection()) return null;
    const completed = this.#crossingVehicle;
    this.#crossingVehicle = null;
    return completed;
  }
}
