import { SceneFrameResolver } from "./SceneFrameResolver.js";
import { SceneLayerRenderer } from "./SceneLayerRenderer.js";

export class RouteSceneRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.frameResolver = new SceneFrameResolver(canvas);
    this.layerRenderer = new SceneLayerRenderer(this.context);
  }

  resolveSceneFrame() {
    return this.frameResolver.resolveFrame();
  }

  renderScene(assets, vehicle) {
    const frame = this.resolveSceneFrame();
    this.#clearScene();
    this.layerRenderer.renderLayer(assets.road, frame);
    this.layerRenderer.renderLayer(assets.borderBack, frame);
    this.layerRenderer.renderLayer(assets.buildings, frame);
    this.layerRenderer.renderLayer(assets.borderFront, frame);
    this.#renderCar(assets.car, vehicle);
  }

  #clearScene() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  #renderCar(carImage, vehicle) {
    this.context.drawImage(
      carImage,
      vehicle.x - vehicle.carWidth / 2,
      vehicle.y - vehicle.carHeight / 2,
      vehicle.carWidth,
      vehicle.carHeight
    );
  }
}
