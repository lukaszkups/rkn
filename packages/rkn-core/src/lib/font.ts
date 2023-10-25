import { KeyableInterface, RgbObject, Sprite } from './types';
import Rkn from './rkn';

export default class RknFont {
  fonts: KeyableInterface;
  rkn: Rkn;
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  _imgData: ImageData;
  currentFont: number;
  defaultLineLength: number;

  constructor (rkn: Rkn) {
    this.fonts = {};
    this.rkn = rkn;
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._imgData = this._ctx.createImageData(this._canvas?.width as number, this._canvas?.height as number);
    // TODO - maybe make it customizable in future (?) - for now supports only ten 8x8 fonts
    // 93 - amount of font chars
    this._canvas.width = 8 * 93;
    this._canvas.height = 80; // 8 * 10 -> for now let's support fixed 10 fonts
    this.currentFont = 0; // first loaded one will be used
    this.defaultLineLength = 30;
  }

  hexToRgb (hexStr: String) {
    const hex = hexStr;
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16)
    }
  }
  loadFont (fontSprite: Sprite, fontEnumName: string) {
    const newFontSprite = { ...fontSprite };
    Object.keys(newFontSprite.colors).map((colorId) => {
      newFontSprite.colors[colorId] = this.hexToRgb(newFontSprite.colors[colorId]);
    })
    this.fonts[fontEnumName] = newFontSprite;
    this._saveSpriteOnAtlas(fontEnumName);
    return newFontSprite;
  }

  _saveSpriteOnAtlas (fontEnumName: string) {
    const font = this.fonts[fontEnumName];
    this.fonts[fontEnumName].frames.forEach((frame: any[], frameIndex: number) => {
      frame.forEach((frameRow: (number | undefined)[], rowIndex: number) => {
        frameRow.forEach((pixel: number | undefined, pixelIndex: number) => {
          if (pixel) {
            const newPos = [
              (frameIndex * 8) + pixelIndex,
              (font.id * 8) + rowIndex
            ];
            const color = this.fonts[fontEnumName].colors[pixel];
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

  drawText (txt: string, pos: number[], lineLength: number = this.defaultLineLength) {
    const txtArr = txt.split('').map((char: string) => char.charCodeAt(0));
    const currentPos = pos;
    txtArr.forEach((letter: number, index: number) => {
      this.drawLetter(letter, currentPos);
      currentPos[0] += 8; // add size of 1 letter
      if (index % lineLength === 0) {
        currentPos[1] += 8;
      }
    });
  }

  drawLetter (letterCode: number, pos: number[]) {
    // const fontSprite = this.fonts[this.currentFont];
    const x1 = this.currentFont + (letterCode - 40) * 8;
    const y1 = this.currentFont * 8;
    const x2 = x1 + 8;
    const y2 = y1 + 8;
    const frameFromAtlas = this._ctx.getImageData(x1, y1, x2, y2);
    console.log(letterCode, x1, x2, pos);
    this.rkn.ctx.putImageData(frameFromAtlas, pos[0], pos[1]);
  }
}