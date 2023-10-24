import Rkn from "./rkn";
import { KeyableInterface, RgbObject, Sprite } from "./types";

export default class Renderer {
  sprites: KeyableInterface;
  rkn: Rkn;
  imgData: ImageData;
  canvasClampSize: number;

  constructor(rkn: Rkn) {
    this.sprites = {};
    this.rkn = rkn;
    this.imgData = rkn.ctx.createImageData(this.rkn.gameCanvas?.clientWidth as number, this.rkn.gameCanvas?.clientHeight as number);
    this.canvasClampSize = (this.imgData.width || 0) * (this.imgData.height || 0) * 4;
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
    return newSprite;
  }

  drawSprite (spriteEnumName: string, frameNumber: number, pos: number[]) {
    const frame = this.sprites[spriteEnumName].frames[frameNumber];
    frame.forEach((frameRow: (number | undefined)[], rowIndex: number) => {
      frameRow.forEach((pixel: number | undefined, pixelIndex: number) => {
        if (pixel !== undefined) {
          const newPos = [
            pos[0] + pixelIndex,
            pos[1] + rowIndex
          ];
          const color = this.sprites[spriteEnumName].colors[pixel];
          this.drawPixel(newPos, color);
        }
      });
    });
    this.rkn.ctx.putImageData(this.imgData, 0, 0);
  }

  drawPixel (pos: number[], color: RgbObject, opacity: number = 255) {
    const data = this.imgData.data;
    const coords = (pos[0] + (pos[1] * this.imgData.width)) * 4;
    data[coords] = Number(color.r);
    data[coords + 1] = Number(color.g);
    data[coords + 2] = Number(color.b);
    data[coords + 3] = opacity;
  }
}
