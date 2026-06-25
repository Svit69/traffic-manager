export class RouteFactory {
  createVerticalRoute(bounds) {
    const carHeight = Math.min(bounds.height * 0.22, 210 * bounds.ratio);
    return {
      bounds,
      x: bounds.width / 2,
      y: bounds.height + carHeight,
      stopY: bounds.height * 0.56,
      exitY: -carHeight,
      carHeight,
      carWidth: carHeight * 0.545,
      maxSpeed: Math.max(250, bounds.height * 0.42),
      acceleration: Math.max(360, bounds.height * 0.62)
    };
  }
}
