import {
  BEGIN,
  NEW_TURN,
  BET,
  PASS,
  FOLD,
  OPPONENTS_TURN_ONE,
  ROUND_TWO,
  OPPONENTS_TURN_TWO,
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
  chips: opts.chips || table.chips || 0,
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
    controlsMode: 'roundOne',
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

const opponentsTurnOne = (state) => {
  const opponents = state.opponents.slice(0);
  let tableChips = 0;
  let highStake = state.table.stake;
  opponents.forEach((opponent) => {
    if (opponent.folded) {
      return;
    }
    switch (Math.floor(Math.random() * 10)) {
      case 0: {
        if (opponent.chips >= highStake) {
          const betAmount = highStake + Math.ceil(Math.random() * (opponent.chips - highStake));
          highStake = betAmount;
          opponent.currentBet += betAmount;
          opponent.chips -= betAmount;
          tableChips += betAmount;
        } else {
          opponent.folded = true;
        }
        break;
      }
      case 1: {
        opponent.folded = true;
        break;
      }
      default: {
        const match = opponent.chips - highStake;
        if (match >= 0) {
          opponent.currentBet += highStake;
          opponent.chips -= highStake;
          tableChips += highStake;
        } else {
          opponent.folded = true;
        }
      }
    }
  });

  return Object.assign({}, state, {
    opponents,
    table: setInTable({
      chips: state.table.chips + tableChips,
      stake: highStake,
    }, state.table),
  });
};

const opponentsTurnTwo = (state) => {
  const opponents = state.opponents.slice(0);
  let tableChips = 0;
  const highStake = state.table.stake;
  opponents.forEach((opponent) => {
    if (opponent.folded) {
      return;
    }
    switch (Math.floor(Math.random() * 10)) {
      case 1: {
        opponent.folded = true;
        break;
      }
      default: {
        const match = opponent.chips - highStake;
        if (match >= 0) {
          opponent.currentBet += highStake;
          opponent.chips -= highStake;
          tableChips += highStake;
        } else {
          opponent.folded = true;
        }
      }
    }
  });

  return Object.assign({}, state, {
    opponents,
    table: setInTable({
      chips: state.table.chips + tableChips,
      stake: highStake,
    }, state.table),
  });
};

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
    case OPPONENTS_TURN_ONE:
      return opponentsTurnOne(state);
    case ROUND_TWO:
      return Object.assign({}, state, { controlsMode: 'roundTwo' });
    case OPPONENTS_TURN_TWO:
      return opponentsTurnTwo(state);
    default:
      return state;
  }
};
