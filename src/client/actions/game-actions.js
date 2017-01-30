import { createAction } from 'redux-actions';
import Game from '../../shared/game';

export const BEGIN = 'BEGIN';
export const begin = createAction(BEGIN, () => {
//  const game = new Game([player].concat(opponents));
//  game.dealPlayers();
  return { game: x => new Game(x) };
});

