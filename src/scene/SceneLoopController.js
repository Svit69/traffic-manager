export class SceneLoopController {
  constructor({ viewport, renderer, motion, signal, panel }) {
    this.viewport = viewport;
    this.renderer = renderer;
    this.motion = motion;
    this.signal = signal;
    this.panel = panel;
    this.assets = null;
    this.lastFrameTime = 0;
    this.animationFrameId = null;
    this.didShowStopHint = false;
    this.gameTimeScale = 1.25;
  }

  start(assets) {
    this.assets = assets;
    this.#initializeScene();
    window.addEventListener("resize", () => this.#initializeScene());
  }

  #initializeScene() {
    this.viewport.resizeCanvasToDisplay();
    this.motion.resetRoute(this.renderer.resolveSceneFrame());
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame((time) => this.#renderAnimationFrame(time));
  }

  #renderAnimationFrame(time) {
    const deltaSeconds = this.#calculateGameDeltaSeconds(time);
    this.signal.updateSignalPhase(deltaSeconds);
    const vehicles = this.motion.updatePosition(deltaSeconds, this.signal.isGreen());
    this.#presentStopHintWhenNeeded();
    this.renderer.renderScene(this.assets, vehicles, this.signal.createSignalSnapshot());
    this.lastFrameTime = time;
    this.animationFrameId = requestAnimationFrame((nextTime) => this.#renderAnimationFrame(nextTime));
  }

  #calculateGameDeltaSeconds(time) {
    const realDeltaSeconds = (time - this.lastFrameTime) / 1000 || 0;
    return Math.min(realDeltaSeconds * this.gameTimeScale, 0.05);
  }

  #presentStopHintWhenNeeded() {
    if (this.didShowStopHint || !this.motion.isWaitingAtSignal()) return;
    this.didShowStopHint = true;
    this.panel.presentBrokenSignalHint();
    window.setTimeout(() => this.panel.showSignalControls(), 1200);
  }
}
