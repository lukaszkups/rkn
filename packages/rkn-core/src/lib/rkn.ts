import renderer from './renderer';

export default class Rkn {
  gameCanvasId: string;
  gameCanvas: HTMLElement | null;

  constructor(gameCanvasId) {
    this.gameCanvasId = gameCanvasId;
    this.gameCanvas = document.getElementById(gameCanvasId);
    this.renderer = renderer;
  }
}

