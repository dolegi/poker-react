import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import deckReducer from './reducers/deck-reducer';
import NewGame from './containers/new-game';
import PlayerCards from './containers/player-cards';
import OpponentCards from './containers/opponent-cards';

const store = createStore(combineReducers({
  deck: deckReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <NewGame />
      <div>
        Player: <br />
        <PlayerCards />
      </div>
      <div>
        Opponent: <br />
        <OpponentCards />
      </div>
    </div>
  </Provider>,
  document.querySelector('.app'),
);
