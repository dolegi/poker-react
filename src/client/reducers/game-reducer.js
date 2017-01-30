import { BEGIN } from '../actions/game-actions';

const initialState = {
  player: {},
  opponents: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return Object.assign({}, state, {
        player: action.payload.player,
        opponents: action.payload.opponents,
      });
    default:
      return state;
  }
};
