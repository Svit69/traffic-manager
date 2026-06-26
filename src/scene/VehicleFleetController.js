import { HorizontalVehicleMotionController } from "./HorizontalVehicleMotionController.js";
import { VehicleMotionController } from "./VehicleMotionController.js";

export class VehicleFleetController {
  constructor() {
    this.verticalVehicle = new VehicleMotionController();
    this.horizontalVehicle = new HorizontalVehicleMotionController();
  }

  resetRoute(bounds) {
    this.verticalVehicle.resetRoute(bounds);
    this.horizontalVehicle.resetRoute(bounds);
  }

  updatePosition(deltaSeconds, isGreen) {
    return {
      vertical: this.verticalVehicle.updatePosition(deltaSeconds, isGreen),
      horizontal: this.horizontalVehicle.updatePosition(deltaSeconds)
    };
  }

  isWaitingAtSignal() {
    return this.verticalVehicle.isWaitingAtSignal();
  }
}
