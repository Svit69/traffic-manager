export class SignalDurationPresets {
  constructor(buttons, selectDuration) {
    this.buttons = Array.from(buttons);
    this.selectDuration = selectDuration;
  }

  bindPresetSelection() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => this.#selectPresetDuration(button));
    });
  }

  markActiveDuration(duration) {
    this.buttons.forEach((button) => {
      button.classList.toggle("is-active", Number(button.dataset.greenDuration) === duration);
    });
  }

  #selectPresetDuration(button) {
    this.selectDuration(Number(button.dataset.greenDuration));
  }
}
