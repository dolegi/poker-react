import { BEGIN } from '../actions/game-actions';
import Player from '../../shared/player';

const initialState = {
  player: new Player('One', 1000),
  opponents: [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 1000)),
	mode: 'begin',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      const game = action.payload.game([state.player].concat(state.opponents));
      game.dealPlayers();

      debugger;
      return Object.assign({}, state, {
        player: game.players.find(x => x.name === state.player.name),
      });
    default:
      return state;
  }
};
