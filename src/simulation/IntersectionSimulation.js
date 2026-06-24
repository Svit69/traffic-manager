import { TrafficFlow } from "../models/TrafficFlow.js";
import { TrafficSignal } from "../models/TrafficSignal.js";
import { EfficiencyCalculator } from "./EfficiencyCalculator.js";
import { SnapshotFactory } from "./SnapshotFactory.js";
import { TrafficMovementProcessor } from "./TrafficMovementProcessor.js";
export class IntersectionSimulation {
  #tick = 0;
  #completedVehicles = [];
  constructor() {
    this.horizontalSignal = new TrafficSignal("horizontal", 7);
    this.verticalSignal = new TrafficSignal("vertical", 3);
    this.horizontalFlow = new TrafficFlow("horizontal", 1, 2);
    this.verticalFlow = new TrafficFlow("vertical", 4, 6);
    this.efficiencyCalculator = new EfficiencyCalculator();
    this.snapshotFactory = new SnapshotFactory();
    this.movementProcessor = new TrafficMovementProcessor(this.#completedVehicles);
  }
  updateGreenDurations(horizontalDuration, verticalDuration) {
    this.horizontalSignal.setGreenDuration(horizontalDuration);
    this.verticalSignal.setGreenDuration(verticalDuration);
  }
  processSimulationTick() {
    this.#tick += 1;
    if (this.#tick % 4 === 1) this.#spawnVehiclesForActiveCycle();
    this.movementProcessor.processTrafficMovement(this.#resolveActiveAxis(), [
      this.horizontalFlow,
      this.verticalFlow
    ]);
    return this.createCurrentSnapshot();
  }
  createCurrentSnapshot() {
    const snapshot = this.snapshotFactory.createSnapshot({
      activeAxis: this.#resolveActiveAxis(),
      averageWait: this.efficiencyCalculator.calculateAverageWait(this.#completedVehicles),
      horizontalQueue: this.horizontalFlow.queueLength,
      verticalQueue: this.verticalFlow.queueLength
    });
    snapshot.efficiency = this.efficiencyCalculator.calculateEfficiency(snapshot);
    return snapshot;
  }
  #spawnVehiclesForActiveCycle() {
    this.horizontalFlow.spawnVehiclesForCycle();
    this.verticalFlow.spawnVehiclesForCycle();
  }
  #resolveActiveAxis() {
    const total = this.horizontalSignal.greenDuration + this.verticalSignal.greenDuration;
    return this.#tick % total < this.horizontalSignal.greenDuration ? "horizontal" : "vertical";
  }
}
