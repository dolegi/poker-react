// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';

const playerName = readlineSync.question('Player Name: ');

const player = new Player(playerName, 50);
const opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));

const print = game => {
  const p = game.players.find(pr => pr.name === playerName);
  const chipsCards = obj => 
    `${obj.chips} ${obj.cards.reduce((res, c) => `${res}${c.number}${c.suit} `, '')}`;

  console.log(`[ ${playerName} ${chipsCards(p)}][ Table ${chipsCards(game.table)}]`);
};

const betttingRound = game => {
  print(game);
  const betAmount = parseInt(readlineSync.question('Bet amount: '), 10);
  game.makeBet(playerName, betAmount);
  opponents.forEach(o => game.makeBet(o.name, betAmount));
};

const loop = () => {
  const game = new Game([player].concat(opponents));
  console.log(`${player.name}:${player.chips}`);
  console.log(`Opponents: ${opponents.reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);

  game.dealPlayers();

  betttingRound(game);
  game.flop();
  betttingRound(game);
  game.turn();
  betttingRound(game);
  game.river();
  betttingRound(game);

  const winners = game.getWinners();
  console.log(
    `${winners.reduce((res, winner, i, self) =>
      `${res}| ${winner} ${game.table.chips/self.length} `, '')}|`
  );
  game.payWinners(winners);

  if (player.chips >= 0) {
    loop();
  }
};

loop();

