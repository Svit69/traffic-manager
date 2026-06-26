export class SignalController {
  constructor() {
    this.state = "off";
    this.greenDuration = 0;
    this.redDuration = 0;
    this.yellowDuration = 1;
    this.yellowTargetState = "red";
    this.elapsedSeconds = 0;
  }
  activateGreen({ greenDuration, redDuration }) {
    this.greenDuration = greenDuration;
    this.redDuration = redDuration;
    this.elapsedSeconds = 0;
    this.state = greenDuration > 0 ? "green" : "off";
  }
  updateSignalPhase(deltaSeconds) {
    if (this.state === "off") return;
    this.elapsedSeconds += deltaSeconds;
    while (this.elapsedSeconds >= this.#getCurrentDuration()) {
      this.elapsedSeconds -= this.#getCurrentDuration();
      this.#advanceSignalPhase();
    }
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

  #getCurrentDuration() {
    if (this.state === "green") return Math.max(this.greenDuration, 0.1);
    if (this.state === "yellow") return this.yellowDuration;
    return Math.max(this.redDuration, 0.1);
  }

  #advanceSignalPhase() {
    if (this.state === "yellow") {
      this.state = this.yellowTargetState === "red" && this.redDuration <= 0 ? "green" : this.yellowTargetState;
      return;
    }
    this.yellowTargetState = this.state === "green" ? "red" : "green";
    this.state = "yellow";
  }
}
