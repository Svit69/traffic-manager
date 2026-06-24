export class TrafficSignal {
  #greenDuration;

  constructor(axis, greenDuration) {
    this.axis = axis;
    this.#greenDuration = greenDuration;
  }

  get greenDuration() {
    return this.#greenDuration;
  }

  setGreenDuration(duration) {
    this.#greenDuration = Number(duration);
  }

  isGreen(activeAxis) {
    return this.axis === activeAxis;
  }
}
