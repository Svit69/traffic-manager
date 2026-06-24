export class StatusPresenter {
  constructor(elements) {
    this.elements = elements;
  }

  presentSimulationStatus(snapshot) {
    const efficiency = Math.round(snapshot.efficiency);
    this.elements.efficiencyValue.textContent = `${efficiency}%`;
    this.elements.phaseText.textContent = this.#buildPhaseLabel(snapshot);
    this.elements.goalText.textContent = this.#buildGoalLabel(efficiency);
    document.body.classList.toggle("level-complete", efficiency >= 80);
  }

  #buildPhaseLabel(snapshot) {
    const active = snapshot.activeAxis === "vertical" ? "Vertical" : "Horizontal";
    return `${active} green · Q ${snapshot.horizontalQueue}/${snapshot.verticalQueue}`;
  }

  #buildGoalLabel(efficiency) {
    return efficiency >= 80 ? "Уровень пройден" : "Цель: Efficiency ≥ 80%";
  }
}
