import Rkn from "./rkn";
import { KeyableInterface, RgbObject, Sprite } from "./types";

export default class Renderer {
  sprites: KeyableInterface;
  rkn: Rkn;
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  _imgData: ImageData;

  constructor(rkn: Rkn) {
    this.sprites = {};
    this.rkn = rkn;
    // helper canvas to store sprites
    this._canvas = document.createElement('canvas');
    // TODO - size for CURRENTLY NEEDED sprite atlas - maybe make it customizable in future (?)
    this._canvas.width = 1024;
    this._canvas.height = 1024;
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._imgData = this._ctx.createImageData(this._canvas?.width as number, this._canvas?.height as number);
    document.getElementById('app')?.appendChild(this._canvas);
  }

  hexToRgb (hexStr: String) {
    const hex = hexStr;
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16)
    }
  }

  loadSprite (sprite: Sprite, spriteEnumName: string) {
    const newSprite = { ...sprite };
    Object.keys(newSprite.colors).map((colorId) => {
      newSprite.colors[colorId] = this.hexToRgb(newSprite.colors[colorId]);
    })
    this.sprites[spriteEnumName] = newSprite;
    this._saveSpriteOnAtlas(spriteEnumName);
    return newSprite;
  }

  _saveSpriteOnAtlas (spriteEnumName: string) {
    const sprite = this.sprites[spriteEnumName];
    this.sprites[spriteEnumName].frames.forEach((frame: any[], frameIndex: number) => {
      frame.forEach((frameRow: (number | undefined)[], rowIndex: number) => {
        frameRow.forEach((pixel: number | undefined, pixelIndex: number) => {
          if (pixel !== undefined) {
            const newPos = [
              (frameIndex * sprite.size) + pixelIndex,
              (sprite.id * sprite.size) + rowIndex
            ];
            console.info(newPos)
            const color = this.sprites[spriteEnumName].colors[pixel];
            this._drawPixel(newPos, color);
          }
        });
      });
    });
    this._ctx.putImageData(this._imgData, 0, 0);
  }

  _drawPixel (pos: number[], color: RgbObject, opacity: number = 255) {
    const data = this._imgData.data;
    const coords = (pos[0] + (pos[1] * this._imgData.width)) * 4;
    data[coords] = Number(color.r);
    data[coords + 1] = Number(color.g);
    data[coords + 2] = Number(color.b);
    data[coords + 3] = opacity;
  }

  drawSprite (spriteEnumName: string, frameNumber: number, pos: number[]) {
    const sprite = this.sprites[spriteEnumName];
    const x1 = sprite.id + frameNumber * sprite.size;
    const y1 = sprite.id * sprite.size;
    const x2 = x1 + sprite.size;
    const y2 = y1 + sprite.size;
    const frameFromAtlas = this._ctx.getImageData(x1, y1, x2, y2);
    console.log(frameFromAtlas)
    this.rkn.ctx.putImageData(frameFromAtlas, pos[0], pos[1]);
  }

    // saveSpriteOnAtlas (spriteEnumName: string, frameNumber: number, pos: number[]) {
    //   const frame = this.sprites[spriteEnumName].frames[frameNumber];
    //   frame.forEach((frameRow: (number | undefined)[], rowIndex: number) => {
    //     frameRow.forEach((pixel: number | undefined, pixelIndex: number) => {
    //       if (pixel !== undefined) {
    //         const newPos = [
    //           pos[0] + pixelIndex,
    //           pos[1] + rowIndex
    //         ];
    //         const color = this.sprites[spriteEnumName].colors[pixel];
    //         this.drawPixel(newPos, color);
    //       }
    //     });
    //   });
    //   // this.rkn.ctx.putImageData(this.imgData, 0, 0);
    // }
}
