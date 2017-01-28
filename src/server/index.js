// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';
import playerTurn from './player-turn';
import opponentsTurn from './opponent-turn';

const player = new Player(readlineSync.question('Player Name: '), 50);
let opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));

const print = game => {
  const chipsCards = obj => 
    `${obj.chips} ${obj.cards.reduce((res, c) => `${res}${c.number}${c.suit} `, '')}`;

  console.log(`Opponents: ${game.players.filter(x => x.name !== player.name).reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);
  console.log(`[ ${player.name} ${chipsCards(player)}][ Table ${chipsCards(game.table)}]`);
};

const turn = game => {
  game.stake = 0;
  game.players.forEach(p => p.currentBet = 0);
  
  print(game);
  playerTurn(game, player);
  opponentsTurn(game, player.name);
  print(game);
  if (player.currentBet !== game.stake)
    playerTurn(game, player);
  opponentsTurn(game, player.name, false);
  print(game);
};

const loop = () => {
  const game = new Game([player].concat(opponents));

  game.dealPlayers();

  turn(game);
  game.flop();
  turn(game);
  game.turn();
  turn(game);
  game.river();
  turn(game);

  const winners = game.getWinners();
  console.log(
    `WINNERS: ${winners.reduce((res, winner, i, self) =>
      `${res}| ${winner} ${game.table.chips/self.length} `, '')}|`
  );
  game.payWinners(winners);

  opponents = opponents.filter(o => o.chips > 0);

  if (player.chips >= 0) {
    loop();
  }
};

console.log(`${player.name}:${player.chips}`);
loop();

