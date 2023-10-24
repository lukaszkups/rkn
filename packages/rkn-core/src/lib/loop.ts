import Rkn from "./rkn";

export default class Loop {
  rkn: Rkn;
  counter: number;
  lastRender: number;
  loop: any;

  constructor(rkn: Rkn) {
    this.rkn = rkn;
    this.counter = 0;
    this.lastRender = 0;
    this.loop;
  }

  update(progress: number) {
    // Update the state of the world for the elapsed time since last render
    const p = progress / 30;
    // console.log(progress, p);
    // this.engine.events.handleEvents(p);
    // this.engine.activeScene.update(p);
    // this.engine.camera.updatePosition();
  }

  start() {
    // we need to wait a bit for canvas to mount in Document's HTML DOM
    setTimeout(() => {
      this.lastRender = 0;
      this.loop = window.requestAnimationFrame((_timestamp) => this.loop(_timestamp));
    }, 0);
  }

  stop() {
    window.cancelAnimationFrame(this.loop);
  }
}
