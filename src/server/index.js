// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';

const playerName = readlineSync.question('Player Name: ');

const player = new Player(playerName, 50);
const jane = new Player('Jane', 50);

const betttingRound = game => {
  console.log(JSON.stringify(player.cards));
  const betAmount = parseInt(readlineSync.question('Bet amount: '), 10);
  game.makeBet(playerName, betAmount);
  game.makeBet('Jane', betAmount);
};

const loop = () => {
  const game = new Game([player, jane]);

  game.dealPlayers();
  betttingRound(game);
  game.flop();
  game.table.print();
  betttingRound(game);
  game.turn();
  game.table.print();
  betttingRound(game);
  game.river();
  game.table.print();
  betttingRound(game);
  game.endGame();

  console.log(`${playerName}: ${player.chips}, Jane: ${jane.chips}`);
  if (player.chips >= 0 && jane.chips >= 0) {
    loop();
  }
};

loop();

