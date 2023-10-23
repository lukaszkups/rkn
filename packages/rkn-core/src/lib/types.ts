export interface KeyableInterface {
  [key: string]: any;
}

export interface RgbObject {
  r: String;
  g: String;
  b: String;
}

export interface Sprite {
  id: Number;
  name: String;
  size: Number;
  colors: KeyableInterface;
  frames: any[];
}
