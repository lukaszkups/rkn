import './style.css'
import Rkn from './lib/rkn';
import { playerSprite } from './assets/playerSprite';
import { font } from './assets/font';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="320" height="240"></canvas>
`;

setTimeout(() => {
  const rkn = new Rkn('game-canvas');
  rkn.renderer.loadSprite(playerSprite, 'player');
  rkn.font.loadFont(font, 'font');
  rkn.renderer.drawSprite('player', 0, [5, 5]);
  rkn.renderer.drawSprite('player', 1, [16, 6]);
  setTimeout(() => {
    // rkn.ctx.clearRect(0, 0, rkn.gameCanvas?.width as number, rkn.gameCanvas?.height as number);
    rkn.renderer.drawSprite('player', 1, [26, 26]);
    rkn.font.drawText('!!!!!"""####%^&*()#@&*^#@$%@^#^%&@*&($@($^@^#%^$^@%#@#^%@^$^&*@^*&', [30, 100]);
  }, 1000)
}, 0);