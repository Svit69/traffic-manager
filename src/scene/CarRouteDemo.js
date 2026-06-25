import { CanvasViewport } from "./CanvasViewport.js";
import { RouteSceneRenderer } from "./RouteSceneRenderer.js";
import { SceneAssetLoader } from "./SceneAssetLoader.js";
import { VehicleMotionController } from "./VehicleMotionController.js";

export class CarRouteDemo {
  constructor(canvas) {
    this.viewport = new CanvasViewport(canvas);
    this.renderer = new RouteSceneRenderer(canvas);
    this.motion = new VehicleMotionController();
    this.assetLoader = new SceneAssetLoader();
    this.assets = null;
    this.lastFrameTime = 0;
    this.animationFrameId = null;
  }

  async start() {
    this.assets = await this.assetLoader.loadSceneAssets();
    this.#initializeScene();
    window.addEventListener("resize", () => this.#initializeScene());
  }

  #initializeScene() {
    const bounds = this.viewport.resizeCanvasToDisplay();
    const sceneFrame = this.renderer.resolveSceneFrame();
    this.motion.resetRoute(sceneFrame);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame((time) => this.#renderAnimationFrame(time));
  }

  #renderAnimationFrame(time) {
    const deltaSeconds = Math.min((time - this.lastFrameTime) / 1000 || 0, 0.05);
    const vehicle = this.motion.updatePosition(deltaSeconds);
    this.renderer.renderScene(this.assets, vehicle);
    this.lastFrameTime = time;
    this.animationFrameId = requestAnimationFrame((nextTime) => this.#renderAnimationFrame(nextTime));
  }
}
