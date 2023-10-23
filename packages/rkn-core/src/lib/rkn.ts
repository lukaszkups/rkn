import Renderer from './renderer';

export default class Rkn {
  gameCanvasId: string;
  gameCanvas: HTMLCanvasElement | null;
  renderer: Renderer;
  ctx: CanvasRenderingContext2D;

  constructor(gameCanvasId: string) {
    this.gameCanvasId = gameCanvasId;
    this.gameCanvas = document.getElementById(gameCanvasId) as HTMLCanvasElement;
    this.ctx = this.gameCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer = new Renderer(this);
  }
}

