import {
  BEGIN,
  NEW_TURN,
  BET,
  PASS,
  FOLD,
  OPPONENTS_TURN,
} from '../actions/game-actions';
import Deck from '../../shared/deck';

const setInPlayer = (opts = {}, player = {}) => ({
  name: opts.name || player.name || '',
  cards: opts.cards || player.cards || [],
  chips: opts.chips || player.chips || 1000,
  currentBet: opts.currentBet || player.currentBet || 0,
  score: opts.score || player.score || 0,
  folded: opts.folded || player.folded || false,
});

const setInTable = (opts = {}, table = {}) => ({
  deck: opts.deck || table.deck || [],
  cards: opts.cards || table.cards || [],
  chips: opts.chips || table.chips || 1000,
  stake: opts.stake || table.stake || 0,
});

const initialState = {
  table: setInTable(),
  player: setInPlayer(),
  opponents: [...Array(8)].map(() =>
    setInPlayer({
      name: Math.random().toString(36).substr(2, 5),
    })),
  controlsMode: 'begin',
};

const begin = (state, name) => {
  const deck = new Deck();
  deck.shuffle();
  return Object.assign({}, state, {
    table: setInTable({
      deck,
      stake: 0,
    }, state.table),
    player: setInPlayer({
      name,
      cards: deck.deal(2),
      currentBet: 0,
    }, state.player),
    opponents: state.opponents.map(o => setInPlayer({
      cards: deck.deal(2),
      currentBet: 0,
    }, o)),
    controlsMode: 'gaming',
  });
};

const firstTurn = state => Object.assign({}, state, {
  player: setInPlayer({
    stake: 0,
    currentBet: 0,
  }, state.player),
  opponents: state.opponents.map(o => setInPlayer({
    stake: 0,
    currentBet: 0,
  }, o)),
});

const bet = (state, amount) => Object.assign({}, state, {
  player: setInPlayer({
    currentBet: state.player.currentBet + amount,
    chips: state.player.chips - amount,
  }, state.player),
  table: setInTable({
    chips: state.table.chips + amount,
    stake: amount > state.table.stake ? amount : state.table.stake,
  }, state.table),
});

const fold = state => Object.assign({}, state, {
  player: setInPlayer({
    folded: true,
  }, state.player),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return begin(state, action.payload.name);
    case NEW_TURN:
      return firstTurn(state);
    case BET:
      return bet(state, action.payload.amount);
    case PASS:
      return bet(state, state.table.stake - state.player.currentBet);
    case FOLD:
      return fold(state);
    case OPPONENTS_TURN:
      return state;
    default:
      return state;
  }
};
