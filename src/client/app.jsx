import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import gameReducer from './reducers/game-reducer';
import Controls from './containers/controls';
import PlayerCards from './containers/player-cards';
import OpponentsCards from './containers/opponents-cards';

const store = createStore(combineReducers({
  game: gameReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <div style={{textAlign: 'center'}} className='pure-u-1'>
      <div>
        <OpponentsCards />
      </div>
      <div>
        Player: <br />
        <PlayerCards />
      </div>
      <Controls />
    </div>
  </Provider>,
  document.querySelector('.app'),
);
