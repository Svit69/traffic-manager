import { IntersectionSimulation } from "../simulation/IntersectionSimulation.js";
import { CanvasRenderer } from "../rendering/CanvasRenderer.js";
import { StatusPresenter } from "./StatusPresenter.js";
import { SliderPresenter } from "./SliderPresenter.js";

export class GameController {
  #lastTickTime = 0;

  constructor(elements) {
    this.elements = elements;
    this.simulation = new IntersectionSimulation();
    this.renderer = new CanvasRenderer(elements.canvas);
    this.statusPresenter = new StatusPresenter(elements);
    this.sliderPresenter = new SliderPresenter(elements);
    this.#bindInputHandlers();
    window.addEventListener("resize", () => this.renderer.resizeCanvasToDisplay());
  }

  startSimulationLoop() {
    this.renderer.resizeCanvasToDisplay();
    requestAnimationFrame((time) => this.#processAnimationFrame(time));
  }

  #bindInputHandlers() {
    [this.elements.horizontalSlider, this.elements.verticalSlider].forEach((slider) => {
      slider.addEventListener("input", () => this.#applyPlayerSettings());
    });
    this.#applyPlayerSettings();
  }

  #applyPlayerSettings() {
    const horizontal = this.elements.horizontalSlider.value;
    const vertical = this.elements.verticalSlider.value;
    this.simulation.updateGreenDurations(horizontal, vertical);
    this.sliderPresenter.presentSliderValues(horizontal, vertical);
  }

  #processAnimationFrame(time) {
    if (time - this.#lastTickTime > 650) {
      const snapshot = this.simulation.processSimulationTick();
      this.statusPresenter.presentSimulationStatus(snapshot);
      this.renderer.renderScene(this.simulation, snapshot);
      this.#lastTickTime = time;
    }
    requestAnimationFrame((nextTime) => this.#processAnimationFrame(nextTime));
  }
}
