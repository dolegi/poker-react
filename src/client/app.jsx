import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import gameReducer from './reducers/game-reducer';
import Controls from './containers/controls';
import Player from './containers/player';
import Table from './containers/table';
import Opponents from './containers/opponents';

const store = createStore(combineReducers({
  game: gameReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <div style={{ textAlign: 'center' }} className="pure-u-1">
      <Opponents />
      <Table />
      <Player />
      <Controls />
    </div>
  </Provider>,
  document.querySelector('.app'),
);
