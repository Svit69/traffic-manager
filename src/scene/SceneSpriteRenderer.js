export class SceneSpriteRenderer {
  constructor(context) {
    this.context = context;
  }

  renderTrafficLight(image, frame) {
    const width = frame.width * 0.24;
    const height = width * (image.height / image.width);
    const centerX = frame.x + frame.width * 0.69 - 30 * frame.scale;
    const centerY = frame.y + frame.height * 0.48 + 110 * frame.scale;
    this.context.drawImage(
      image,
      centerX - width / 2,
      centerY - height / 2,
      width,
      height
    );
  }
}
