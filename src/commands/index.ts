import { play } from './play.js';
import { pause } from './pause.js';
import { resume } from './resume.js';
import { skip } from './skip.js';
import { stop } from './stop.js';
import { queue } from './queue.js';
import { nowplaying } from './nowplaying.js';
import { volume } from './volume.js';

export const commands = [
  play,
  pause,
  resume,
  skip,
  stop,
  queue,
  nowplaying,
  volume,
];
