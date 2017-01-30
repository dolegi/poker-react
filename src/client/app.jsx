import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import gameReducer from './reducers/game-reducer';
import Begin from './containers/begin';
import PlayerCards from './containers/player-cards';
import OpponentsCards from './containers/opponents-cards';

const store = createStore(combineReducers({
  game: gameReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Begin />
      <div>
        Player: <br />
        <PlayerCards />
      </div>
      <div>
        <OpponentsCards />
      </div>
    </div>
  </Provider>,
  document.querySelector('.app'),
);
