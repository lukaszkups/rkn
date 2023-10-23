import Rkn from "./rkn";
import { KeyableInterface, RgbObject, Sprite } from "./types";

export default class Renderer {
  sprites: KeyableInterface;
  rkn: Rkn;
  imgData: ImageData;

  constructor(rkn: Rkn) {
    this.sprites = {};
    this.rkn = rkn;
    this.imgData = rkn.ctx.createImageData(1, 1);
  }

  hexToRgb (hexStr: String) {
    // const hex = hexStr.replace('#', '');
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
          // newPos.push(pos[0] + pixelIndex);
          // newPos.push(pos[1] + rowIndex);
          const color = this.sprites[spriteEnumName].colors[pixel];
          console.log(newPos, color)
          this.drawPixel(newPos, color);
        }
      });
    });
  }

  drawPixel (pos: number[], color: RgbObject) {
    const data = this.imgData.data;
    data[0] = Number(color.r);
    data[1] = Number(color.g);
    data[2] = Number(color.b);
    this.rkn.ctx.putImageData(this.imgData, pos[0], pos[1]);
  }
}
