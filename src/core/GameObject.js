export class GameObject {
  constructor(position) {
    if (new.target === GameObject) {
      throw new Error("GameObject is an abstract class");
    }

    this.position = position;
  }

  updateState() {}

  renderObject() {
    throw new Error("renderObject must be implemented by subclass");
  }
}
