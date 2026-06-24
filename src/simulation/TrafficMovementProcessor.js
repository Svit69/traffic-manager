export class TrafficMovementProcessor {
  constructor(completedVehicles) {
    this.completedVehicles = completedVehicles;
  }

  processTrafficMovement(activeAxis, flows) {
    flows.forEach((flow) => {
      const completed = flow.processTick(flow.axis === activeAxis);
      if (completed) this.completedVehicles.push(completed);
    });
  }
}
