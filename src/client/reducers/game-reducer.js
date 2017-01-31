import { BEGIN } from '../actions/game-actions';
import Deck from '../../shared/deck';

const createPlayer = name => ({
  name,
  chips: 1000,
  cards: [],
  currentBet: 0,
  score: 0
});

const setInPlayer = (opts, player) => ({
  chips: opts.chips || player.chips,
  cards: opts.cards || player.cards,
  currentBet: opts.currentBet || player.currentBet,
  score: opts.score || player.score
});

const initialState = {
  game: {
    deck: [],
    table: {
      cards: [],
      chips: 0
    },
    stake: 0
  },
  player: createPlayer('One'),
  opponents: [...Array(8)].map(() => createPlayer(Math.random().toString(36).substr(2, 5))), 
  controlsMode: 'begin'
};

const begin = state => {
  const deck = new Deck();
  deck.shuffle();
  return Object.assign({}, state, {
    game: {
      deck
    },
    player: setInPlayer({ cards: deck.deal(2) }, state.player),
    opponents: state.opponents.map(o => setInPlayer({ cards: deck.deal(2) }, o))
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
