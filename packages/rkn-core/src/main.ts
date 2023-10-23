import './style.css'
import Rkn from './lib/rkn';
import { playerSprite } from './assets/playerSprite';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="320" height="240"></canvas>
`;

setTimeout(() => {
  const rkn = new Rkn('game-canvas');
  rkn.renderer.loadSprite(playerSprite, 'player');
  rkn.renderer.drawSprite('player', 0, [5, 5]);
}, 0);