export class SceneSpriteRenderer {
  constructor(context) {
    this.context = context;
  }

  renderTrafficLight(image, frame, shouldHighlight) {
    const bounds = this.#resolveTrafficLightBounds(image, frame);
    if (shouldHighlight) this.#renderHighlight(bounds, frame.scale);
    this.context.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);
  }

  includesPoint(frame, point) {
    const bounds = this.#resolveTrafficLightBounds({ width: 1280, height: 1229 }, frame);
    return point.x >= bounds.x && point.x <= bounds.x + bounds.width
      && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
  }

  #resolveTrafficLightBounds(image, frame) {
    const width = frame.width * 0.24;
    const height = width * (image.height / image.width);
    const centerX = frame.x + frame.width * 0.69 - 30 * frame.scale;
    const centerY = frame.y + frame.height * 0.48 + 110 * frame.scale;
    return { x: centerX - width / 2, y: centerY - height / 2, width, height };
  }

  #renderHighlight(bounds, scale) {
    this.context.save();
    this.context.shadowColor = "#facc15";
    this.context.shadowBlur = 26 * scale;
    this.context.strokeStyle = "#facc15";
    this.context.lineWidth = 4 * scale;
    this.context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    this.context.restore();
  }
}
