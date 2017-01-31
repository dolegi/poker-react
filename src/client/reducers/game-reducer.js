import { BEGIN } from '../actions/game-actions';
import Deck from '../../shared/deck';

const setInPlayer = (opts, player={}) => ({
  name: opts.name|| player.name || 'One',
  cards: opts.cards || player.cards || [],
  chips: opts.chips || player.chips || 1000,
  currentBet: opts.currentBet || player.currentBet || 0,
  score: opts.score || player.score || 0
});

const setInTable = (opts={}, table={}) => ({
  deck: opts.deck || table.deck || [],
  cards: opts.cards || table.cards || [],
  chips: opts.chips || table.chips || 1000,
  stake: opts.stake || table.stake || 0
});

const initialState = {
  table: setInTable(),
  player: setInPlayer({ name: 'One' }),
  opponents: [...Array(8)].map(() =>
    setInPlayer({ name: Math.random().toString(36).substr(2, 5) })), 
  controlsMode: 'begin'
};

const begin = state => {
  const deck = new Deck();
  deck.shuffle();
  return Object.assign({}, state, {
    table: setInTable({ deck, stake: 0, }, state.table),
    player: setInPlayer({ cards: deck.deal(2), currentBet: 0 }, state.player),
    opponents: state.opponents.map(o => setInPlayer({ cards: deck.deal(2), currentBet: 0 }, o)),
    controlsMode: 'gaming'
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return begin(state);
    default:
      return state;
  }
};
