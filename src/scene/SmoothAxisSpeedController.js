export class SmoothAxisSpeedController {
  calculateNextSpeed(route, currentSpeed, targetX, deltaSeconds) {
    const distance = Math.max(targetX - route.x, 0);
    const safeSpeed = Math.sqrt(2 * route.acceleration * distance);
    const desiredSpeed = Math.min(route.maxSpeed, safeSpeed);
    const direction = desiredSpeed > currentSpeed ? 1 : -1;
    const nextSpeed = currentSpeed + direction * route.acceleration * deltaSeconds;
    if (distance < 1) return 0;
    return this.#clampSpeed(nextSpeed, desiredSpeed, direction);
  }

  #clampSpeed(nextSpeed, desiredSpeed, direction) {
    if (direction > 0) return Math.min(nextSpeed, desiredSpeed);
    return Math.max(nextSpeed, desiredSpeed, 0);
  }
}
