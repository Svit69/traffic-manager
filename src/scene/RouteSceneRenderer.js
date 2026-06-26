import { SceneFrameResolver } from "./SceneFrameResolver.js";
import { SceneLayerRenderer } from "./SceneLayerRenderer.js";
import { SceneSpriteRenderer } from "./SceneSpriteRenderer.js";

export class RouteSceneRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.frameResolver = new SceneFrameResolver(canvas);
    this.layerRenderer = new SceneLayerRenderer(this.context);
    this.spriteRenderer = new SceneSpriteRenderer(this.context);
  }

  resolveSceneFrame() {
    return this.frameResolver.resolveFrame();
  }

  renderScene(assets, vehicle, signal) {
    const frame = this.resolveSceneFrame();
    this.#clearScene();
    this.layerRenderer.renderLayer(assets.road, frame);
    this.layerRenderer.renderLayer(assets.borderBack, frame);
    this.layerRenderer.renderLayer(assets.buildings, frame);
    this.layerRenderer.renderLayer(assets.borderFront, frame);
    this.#renderCar(assets.car, vehicle);
    this.spriteRenderer.renderTrafficLight(assets.trafficLights[signal.state], frame, signal.isHighlighted);
  }

  bindTrafficLightTap(handler) {
    this.canvas.addEventListener("pointerdown", (event) => {
      if (this.spriteRenderer.includesPoint(this.resolveSceneFrame(), this.#resolvePoint(event))) handler();
    });
  }

  #resolvePoint(event) {
    const bounds = this.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (this.canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (this.canvas.height / bounds.height)
    };
  }

  #clearScene() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  #renderCar(carImage, vehicle) {
    this.context.drawImage(carImage, vehicle.x - vehicle.carWidth / 2, vehicle.y - vehicle.carHeight / 2, vehicle.carWidth, vehicle.carHeight);
  }
}
