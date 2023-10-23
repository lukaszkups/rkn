import { KeyableInterface } from "./types";

class Renderer {
  sprites: KeyableInterface;

  constructor() {
    this.sprites = {};
  }

  hexToRgb (hexStr) {
    // const hex = hexStr.replace('#', '');
    const hex = hexStr;
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16)
    }
  }

  loadSprite (sprite, spriteEnumName) {
    const newSprite = { ...sprite };
    Object.keys(newSprite.colors).map((colorId) => {
      newSprite.colors[colorId] = this.hexToRgb(newSprite.colors[colorId]);
    })
    this.sprites[spriteEnumName] = newSprite;
    return newSprite;
  }



}

export default new Renderer();
