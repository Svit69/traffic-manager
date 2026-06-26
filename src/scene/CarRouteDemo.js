import { CanvasViewport } from "./CanvasViewport.js";
import { RouteSceneRenderer } from "./RouteSceneRenderer.js";
import { SceneAssetLoader } from "./SceneAssetLoader.js";
import { SignalController } from "./SignalController.js";
import { TutorialPanel } from "./TutorialPanel.js";
import { VehicleMotionController } from "./VehicleMotionController.js";
export class CarRouteDemo {
  constructor({ canvas, panel }) {
    this.viewport = new CanvasViewport(canvas);
    this.renderer = new RouteSceneRenderer(canvas);
    this.motion = new VehicleMotionController();
    this.signal = new SignalController();
    this.panel = new TutorialPanel(panel);
    this.assetLoader = new SceneAssetLoader();
    this.assets = null;
    this.lastFrameTime = 0;
    this.animationFrameId = null;
  }
  async start() {
    this.assets = await this.assetLoader.loadSceneAssets();
    this.#bindTutorialHandlers();
    this.#initializeScene();
    window.addEventListener("resize", () => this.#initializeScene());
  }
  #initializeScene() {
    this.viewport.resizeCanvasToDisplay();
    const sceneFrame = this.renderer.resolveSceneFrame();
    this.motion.resetRoute(sceneFrame);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame((time) => this.#renderAnimationFrame(time));
  }
  #renderAnimationFrame(time) {
    const deltaSeconds = Math.min((time - this.lastFrameTime) / 1000 || 0, 0.05);
    const vehicle = this.motion.updatePosition(deltaSeconds);
    if (this.signal.isGreen()) this.motion.releaseVehicle();
    this.renderer.renderScene(this.assets, vehicle, this.signal.createSignalSnapshot());
    this.lastFrameTime = time;
    this.animationFrameId = requestAnimationFrame((nextTime) => this.#renderAnimationFrame(nextTime));
  }
  #bindTutorialHandlers() {
    this.panel.bindOpenRequest(() => this.panel.showSignalControls());
    this.panel.bindEnableGreen(() => {
      this.signal.activateGreen(this.panel.readDurations());
      if (!this.signal.isGreen()) return;
      this.motion.releaseVehicle();
      this.panel.presentGreenEnabled();
    });
    this.renderer.bindTrafficLightTap(() => this.panel.showSignalControls());
  }
}
