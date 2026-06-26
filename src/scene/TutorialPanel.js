export class TutorialPanel {
  constructor(panel) {
    this.panel = panel;
    this.controls = panel.querySelector("#signalControls");
    this.text = panel.querySelector("#tutorialText");
    this.greenInput = panel.querySelector("#greenDuration");
    this.redInput = panel.querySelector("#redDuration");
    this.greenOutput = panel.querySelector("#greenOutput");
    this.redOutput = panel.querySelector("#redOutput");
    this.button = panel.querySelector("#enableGreenButton");
    this.#bindOutputUpdates();
  }

  bindEnableGreen(handler) {
    this.button.addEventListener("click", handler);
  }

  presentBrokenSignalHint() {
    this.panel.classList.add("is-visible", "is-hint");
    this.text.textContent = "\u0412\u0430\u0443, \u043a\u0430\u0436\u0435\u0442\u0441\u044f, \u0441\u0432\u0435\u0442\u043e\u0444\u043e\u0440 \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442.";
  }

  showSignalControls() {
    this.panel.classList.add("is-visible", "is-popup");
    this.panel.classList.remove("is-hint");
    this.controls.hidden = false;
    this.text.textContent = "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0438\u043a\u043b \u0438 \u0434\u0430\u0439\u0442\u0435 \u043c\u0430\u0448\u0438\u043d\u0435 \u0437\u0435\u043b\u0451\u043d\u044b\u0439.";
  }

  presentGreenEnabled() {
    this.controls.hidden = true;
    this.panel.classList.remove("is-visible", "is-popup", "is-hint");
  }

  readDurations() {
    return { greenDuration: Number(this.greenInput.value), redDuration: Number(this.redInput.value) };
  }

  #bindOutputUpdates() {
    this.greenInput.addEventListener("input", () => this.greenOutput.value = `${this.greenInput.value} \u0441`);
    this.redInput.addEventListener("input", () => this.redOutput.value = `${this.redInput.value} \u0441`);
  }
}
