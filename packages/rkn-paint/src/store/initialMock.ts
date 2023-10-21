import { FPS_OPTIONS, SPRITE_SIZE_OPTIONS } from "../helpers/enums";

const createInitialData = () => {
  return {
    fps: FPS_OPTIONS[1],
    spriteSize: SPRITE_SIZE_OPTIONS[0],
    colors: {
      0: '#ffffff',
      1: '#000000'
    },
    activeColor: 0,
    sprites: {}
  }
}

export default createInitialData;
