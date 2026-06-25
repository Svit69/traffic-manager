import carSpriteUrl from "../assets/graphics/auto_1.png";
import { CanvasViewport } from "./CanvasViewport.js";
import { RouteSceneRenderer } from "./RouteSceneRenderer.js";
import { VehicleMotionController } from "./VehicleMotionController.js";

export class CarRouteDemo {
  constructor(canvas) {
    this.viewport = new CanvasViewport(canvas);
    this.renderer = new RouteSceneRenderer(canvas);
    this.motion = new VehicleMotionController();
    this.carImage = new Image();
    this.lastFrameTime = 0;
    this.animationFrameId = null;
  }

  start() {
    this.carImage.src = carSpriteUrl;
    this.carImage.addEventListener("load", () => this.#initializeScene());
    window.addEventListener("resize", () => this.#initializeScene());
  }

  #initializeScene() {
    const bounds = this.viewport.resizeCanvasToDisplay();
    this.motion.resetRoute(bounds);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame((time) => this.#renderAnimationFrame(time));
  }

  #renderAnimationFrame(time) {
    const deltaSeconds = Math.min((time - this.lastFrameTime) / 1000 || 0, 0.05);
    const vehicle = this.motion.updatePosition(deltaSeconds);
    this.renderer.renderScene(this.carImage, vehicle);
    this.lastFrameTime = time;
    this.animationFrameId = requestAnimationFrame((nextTime) => this.#renderAnimationFrame(nextTime));
  }
}
