import carSpriteUrl from "../assets/graphics/auto_1.png";
import borderBackUrl from "../assets/graphics/boarder_1_1.png";
import borderFrontUrl from "../assets/graphics/boarder_1_2.png";
import buildingsUrl from "../assets/graphics/buildings.png";
import roadUrl from "../assets/graphics/road_1.png";

export class SceneAssetLoader {
  async loadSceneAssets() {
    const [road, borderBack, buildings, borderFront, car] = await Promise.all([
      this.#loadImage(roadUrl),
      this.#loadImage(borderBackUrl),
      this.#loadImage(buildingsUrl),
      this.#loadImage(borderFrontUrl),
      this.#loadImage(carSpriteUrl)
    ]);
    return { road, borderBack, buildings, borderFront, car };
  }

  #loadImage(source) {
    return new Promise((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image), { once: true });
      image.src = source;
    });
  }
}
