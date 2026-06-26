import "./styles/main.css";
import { CarRouteDemo } from "./scene/CarRouteDemo.js";

const demo = new CarRouteDemo({
  canvas: document.querySelector("#sceneCanvas"),
  panel: document.querySelector("#tutorialPanel")
});
demo.start();
