import { createAction } from 'redux-actions';
import Game from '../../shared/game';
import Player from '../../shared/player';

export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const shuffleDeck = createAction(SHUFFLE_DECK, () => true);

export const NEW_GAME = 'NEW_GAME';
export const newGame = createAction(NEW_GAME, () => {
  const player = new Player('One');
  const opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));
  const game = new Game([player].concat(opponents));
  game.dealPlayers();
  return { game, player, opponents };
});

