export class SliderPresenter {
  constructor(elements) {
    this.elements = elements;
  }

  presentSliderValues(horizontal, vertical) {
    this.elements.horizontalOutput.value = `${horizontal}s`;
    this.elements.verticalOutput.value = `${vertical}s`;
  }
}
