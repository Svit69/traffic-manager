import { CanvasViewport } from "./CanvasViewport.js";
import { RouteSceneRenderer } from "./RouteSceneRenderer.js";
import { SceneAssetLoader } from "./SceneAssetLoader.js";
import { SceneLoopController } from "./SceneLoopController.js";
import { SignalController } from "./SignalController.js";
import { TutorialPanel } from "./TutorialPanel.js";
import { VehicleFleetController } from "./VehicleFleetController.js";

export class CarRouteDemo {
  constructor({ canvas, panel }) {
    this.renderer = new RouteSceneRenderer(canvas);
    this.signal = new SignalController();
    this.panel = new TutorialPanel(panel);
    this.assetLoader = new SceneAssetLoader();
    this.loop = new SceneLoopController({
      viewport: new CanvasViewport(canvas),
      renderer: this.renderer,
      motion: new VehicleFleetController(),
      signal: this.signal,
      panel: this.panel
    });
  }

  async start() {
    const assets = await this.assetLoader.loadSceneAssets();
    this.#bindTutorialHandlers();
    this.loop.start(assets);
  }

  #bindTutorialHandlers() {
    this.panel.bindEnableGreen(() => {
      this.signal.activateGreen(this.panel.readDurations());
      if (this.signal.isGreen()) this.panel.presentGreenEnabled();
    });
    this.renderer.bindTrafficLightTap(() => this.panel.showSignalControls());
  }
}
