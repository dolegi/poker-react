import Immutable from 'immutable';
import { NEW_GAME } from '../actions/deck-actions';

const initialState = Immutable.fromJS({
  player: Immutable.Map({ cards: [], chips: 1000 }),
  opponent: Immutable.Map({ cards: [], chips: 1000 }),
  stats: Immutable.Map({ won: 0, lost: 0, draw: 0 }),
  turn: 0,
});

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME:
      return state.setIn(['player', 'cards'], action.payload.player.cards)
        .setIn(['opponent', 'cards'], action.payload.opponents[0].cards);
    default:
      return state;
  }
};

export default deckReducer;
