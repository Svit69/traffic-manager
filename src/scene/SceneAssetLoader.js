import carSpriteUrl from "../assets/graphics/auto_1.png";
import crossCarSpriteUrl from "../assets/graphics/auto_2_1.png";
import borderBackUrl from "../assets/graphics/boarder_1_1.png";
import borderFrontUrl from "../assets/graphics/boarder_1_2.png";
import buildingsUrl from "../assets/graphics/buildings.png";
import roadUrl from "../assets/graphics/road_1.png";
import trafficLightGreenUrl from "../assets/graphics/traffic_light_green.png";
import trafficLightOffUrl from "../assets/graphics/traffic_light_0.png";
import trafficLightRedUrl from "../assets/graphics/traffic_light_red.png";
import trafficLightYellowUrl from "../assets/graphics/traffic_light_yellow.png";

export class SceneAssetLoader {
  async loadSceneAssets() {
    const [road, borderBack, buildings, borderFront, trafficLights, car, crossCar] = await Promise.all([
      this.#loadImage(roadUrl),
      this.#loadImage(borderBackUrl),
      this.#loadImage(buildingsUrl),
      this.#loadImage(borderFrontUrl),
      this.#loadTrafficLights(),
      this.#loadImage(carSpriteUrl),
      this.#loadImage(crossCarSpriteUrl)
    ]);
    return { road, borderBack, buildings, borderFront, trafficLights, car, crossCar };
  }

  #loadImage(source) {
    return new Promise((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image), { once: true });
      image.src = source;
    });
  }

  async #loadTrafficLights() {
    const [off, green, red, yellow] = await Promise.all([
      this.#loadImage(trafficLightOffUrl),
      this.#loadImage(trafficLightGreenUrl),
      this.#loadImage(trafficLightRedUrl),
      this.#loadImage(trafficLightYellowUrl)
    ]);
    return { off, green, red, yellow };
  }
}
