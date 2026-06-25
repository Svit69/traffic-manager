export class SceneLayerRenderer {
  constructor(context) {
    this.context = context;
  }

  renderLayer(image, frame) {
    this.context.drawImage(image, frame.x, frame.y, frame.width, frame.height);
  }
}
