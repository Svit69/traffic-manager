import { IsometricProjector } from "./IsometricProjector.js";
import { BuildingRenderer } from "./parts/BuildingRenderer.js";
import { RoadRenderer } from "./parts/RoadRenderer.js";
import { SignalRenderer } from "./parts/SignalRenderer.js";
import { VehicleRenderer } from "./parts/VehicleRenderer.js";

export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.projector = new IsometricProjector(canvas);
    this.roadRenderer = new RoadRenderer(this.context, this.projector);
    this.vehicleRenderer = new VehicleRenderer(this.context, this.projector);
    this.signalRenderer = new SignalRenderer(this.context, this.projector);
    this.buildingRenderer = new BuildingRenderer(this.context, this.projector);
  }

  resizeCanvasToDisplay() {
    const ratio = window.devicePixelRatio || 1;
    const bounds = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.floor(bounds.width * ratio);
    this.canvas.height = Math.floor(bounds.height * ratio);
  }

  renderScene(simulation, snapshot) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.roadRenderer.renderGround();
    this.buildingRenderer.renderCornerBlocks();
    this.roadRenderer.renderIntersection(snapshot);
    this.#renderQueuedVehicles(simulation);
    this.#renderCrossingVehicles(simulation);
    this.signalRenderer.renderSignals(snapshot.activeAxis);
  }

  renderVehicle(vehicle, index) {
    this.vehicleRenderer.renderVehicle(vehicle, index);
  }

  #renderQueuedVehicles(simulation) {
    simulation.horizontalFlow.vehicles.forEach((vehicle, index) => vehicle.renderObject(this, index));
    simulation.verticalFlow.vehicles.forEach((vehicle, index) => vehicle.renderObject(this, index));
  }

  #renderCrossingVehicles(simulation) {
    simulation.horizontalFlow.crossingVehicles.forEach((vehicle) => vehicle.renderObject(this, 0));
    simulation.verticalFlow.crossingVehicles.forEach((vehicle) => vehicle.renderObject(this, 0));
  }
}
