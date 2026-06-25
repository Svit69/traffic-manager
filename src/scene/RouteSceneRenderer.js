export class RouteSceneRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  renderScene(carImage, vehicle) {
    this.#clearScene();
    this.#renderRoad(vehicle);
    this.#renderStopPoint(vehicle);
    this.#renderCar(carImage, vehicle);
  }

  #clearScene() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  #renderRoad(vehicle) {
    const roadWidth = Math.min(this.canvas.width * 0.42, 260 * vehicle.bounds.ratio);
    const x = this.canvas.width / 2 - roadWidth / 2;
    this.context.fillStyle = "#2f3942";
    this.context.fillRect(x, 0, roadWidth, this.canvas.height);
    this.context.strokeStyle = "#d7dde4";
    this.context.lineWidth = 6;
    this.context.strokeRect(x, -8, roadWidth, this.canvas.height + 16);
  }

  #renderStopPoint(vehicle) {
    this.context.strokeStyle = "#f8fafc";
    this.context.lineWidth = 5 * vehicle.bounds.ratio;
    this.context.beginPath();
    this.context.moveTo(vehicle.x - 95 * vehicle.bounds.ratio, vehicle.stopY);
    this.context.lineTo(vehicle.x + 95 * vehicle.bounds.ratio, vehicle.stopY);
    this.context.stroke();
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
