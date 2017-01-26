// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';

const playerName = readlineSync.question('Player Name: ');

const player = new Player(playerName, 50);
let opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));

const print = game => {
  const p = game.players.find(pr => pr.name === playerName);
  const chipsCards = obj => 
    `${obj.chips} ${obj.cards.reduce((res, c) => `${res}${c.number}${c.suit} `, '')}`;

  console.log('');
  console.log(`Opponents: ${opponents.reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);
  console.log(`[ ${playerName} ${chipsCards(p)}][ Table ${chipsCards(game.table)}]`);
};

const playerBet = game => {
  const betAmount = parseInt(readlineSync.question('Bet amount: '), 10);
  game.makeBet(playerName, betAmount);
}

const pf = game => undefined;

const playerTurn = game => {
  const index = parseInt(readlineSync.question('|0: bet| |1: pass| |2: fold|'), 10);
  [playerBet, pf, pf][index](game);
};

const opponentsTurn = game => {
  opponents.forEach(opponent => {
    switch(Math.floor(Math.random()*3)) {
      case 0:
        const chips = Math.floor(Math.random()*opponent.chips);
        game.makeBet(opponent.name, chips);
      default:
        null;
    }
  });
};

const turn = game => {
  print(game);
  playerTurn(game);
  opponentsTurn(game);
}

const loop = () => {
  const game = new Game([player].concat(opponents));
  console.log(`${player.name}:${player.chips}`);
  console.log(`Opponents: ${opponents.reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);

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
    `${winners.reduce((res, winner, i, self) =>
      `${res}| ${winner} ${game.table.chips/self.length} `, '')}|`
  );
  game.payWinners(winners);


  opponents = opponents.filter(o => o.chips > 0);

  if (player.chips >= 0) {
    loop();
  }
};

loop();

