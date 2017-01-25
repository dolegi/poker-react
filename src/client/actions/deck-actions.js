import { createAction } from 'redux-actions';
import Deck from '../../shared/deck';

export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const shuffleDeck = createAction(SHUFFLE_DECK, () => true);

export const NEW_GAME = 'NEW_GAME';
export const newGame = createAction(NEW_GAME, () => {
  const cards = new Deck().cards;
  const getCards = x => cards.splice(0, x);
  return {
    player: { cards: getCards(2) },
    opponent: { cards: getCards(2) },
  };
});

