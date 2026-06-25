export class SceneSpriteRenderer {
  constructor(context) {
    this.context = context;
  }

  renderTrafficLight(image, frame) {
    const width = frame.width * 0.24;
    const height = width * (image.height / image.width);
    const centerX = frame.x + frame.width * 0.69;
    const centerY = frame.y + frame.height * 0.48;
    this.context.drawImage(
      image,
      centerX - width / 2,
      centerY - height / 2,
      width,
      height
    );
  }
}
