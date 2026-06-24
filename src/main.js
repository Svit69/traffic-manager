import "./styles/main.css";
import { GameController } from "./ui/GameController.js";

const controller = new GameController({
  canvas: document.querySelector("#gameCanvas"),
  horizontalSlider: document.querySelector("#horizontalSlider"),
  verticalSlider: document.querySelector("#verticalSlider"),
  horizontalOutput: document.querySelector("#horizontalOutput"),
  verticalOutput: document.querySelector("#verticalOutput"),
  efficiencyValue: document.querySelector("#efficiencyValue"),
  phaseText: document.querySelector("#phaseText"),
  goalText: document.querySelector("#goalText")
});

controller.startSimulationLoop();
