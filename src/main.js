import "./styles/main.css";
import { CarRouteDemo } from "./scene/CarRouteDemo.js";

const demo = new CarRouteDemo(document.querySelector("#sceneCanvas"));
demo.start();
