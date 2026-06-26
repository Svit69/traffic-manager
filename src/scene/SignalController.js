export class SignalController {
  constructor() {
    this.state = "off";
    this.greenDuration = 0;
    this.redDuration = 0;
  }

  activateGreen({ greenDuration, redDuration }) {
    this.greenDuration = greenDuration;
    this.redDuration = redDuration;
    this.state = greenDuration > 0 ? "green" : "off";
  }

  isGreen() {
    return this.state === "green";
  }

  createSignalSnapshot() {
    return {
      state: this.state,
      isHighlighted: this.state === "off"
    };
  }
}
