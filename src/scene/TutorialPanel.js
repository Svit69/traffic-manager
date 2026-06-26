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

  bindOpenRequest(handler) {
    this.text.addEventListener("click", handler);
  }

  bindEnableGreen(handler) {
    this.button.addEventListener("click", handler);
  }

  showSignalControls() {
    this.controls.hidden = false;
    this.text.textContent = "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0437\u0435\u043b\u0451\u043d\u044b\u0439 \u0438 \u043a\u0440\u0430\u0441\u043d\u044b\u0439 \u0446\u0438\u043a\u043b.";
  }

  presentGreenEnabled() {
    this.controls.hidden = true;
    this.text.textContent = "\u0417\u0435\u043b\u0451\u043d\u044b\u0439 \u0432\u043a\u043b\u044e\u0447\u0451\u043d. \u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u0435\u0434\u0435\u0442.";
  }

  readDurations() {
    return { greenDuration: Number(this.greenInput.value), redDuration: Number(this.redInput.value) };
  }

  #bindOutputUpdates() {
    this.greenInput.addEventListener("input", () => this.greenOutput.value = `${this.greenInput.value} \u0441`);
    this.redInput.addEventListener("input", () => this.redOutput.value = `${this.redInput.value} \u0441`);
  }
}
