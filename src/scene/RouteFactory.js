export class RouteFactory {
  createVerticalRoute(frame) {
    const carHeight = frame.height * 0.125;
    return {
      frame,
      x: this.#resolveX(frame, 0.465),
      y: this.#resolveY(frame, 1.12),
      stopY: this.#resolveY(frame, 0.705),
      exitY: this.#resolveY(frame, -0.14),
      carHeight,
      carWidth: carHeight * 0.545,
      maxSpeed: frame.height * 0.38,
      acceleration: frame.height * 0.7
    };
  }

  #resolveX(frame, normalizedX) {
    return frame.x + frame.width * normalizedX + 2 * frame.scale;
  }

  #resolveY(frame, normalizedY) {
    return frame.y + frame.height * normalizedY;
  }
}
