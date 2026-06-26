export class RouteFactory {
  createVerticalRoute(frame) {
    const carHeight = frame.height * 0.1125;
    return {
      frame,
      x: this.#resolveX(frame, 0.465, 110),
      y: this.#resolveY(frame, 1.12),
      stopY: this.#resolveY(frame, 0.705),
      exitY: this.#resolveY(frame, -0.14),
      carHeight,
      carWidth: carHeight * 0.545,
      maxSpeed: frame.height * 0.38,
      acceleration: frame.height * 0.7
    };
  }

  createHorizontalRoute(frame) {
    const carWidth = frame.width * 0.16;
    return {
      frame,
      x: this.#resolveX(frame, -0.16, 0),
      y: this.#resolveY(frame, 0.595),
      exitX: this.#resolveX(frame, 1.16, 0),
      carHeight: carWidth * 0.58,
      carWidth,
      maxSpeed: frame.width * 0.34,
      acceleration: frame.width * 0.64
    };
  }

  #resolveX(frame, normalizedX, offset) {
    return frame.x + frame.width * normalizedX + offset * frame.scale;
  }

  #resolveY(frame, normalizedY) {
    return frame.y + frame.height * normalizedY;
  }
}
