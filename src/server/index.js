// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';

const playerName = readlineSync.question('Player Name: ');

const player = new Player(playerName, 50);
let opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));

const print = game => {
  const chipsCards = obj => 
    `${obj.chips} ${obj.cards.reduce((res, c) => `${res}${c.number}${c.suit} `, '')}`;

  console.log('');
  console.log(`Opponents: ${game.players.filter(x => x.name !== playerName).reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);
  console.log(`[ ${playerName} ${chipsCards(player)}][ Table ${chipsCards(game.table)}]`);
};

const playerBet = game => {
  const betAmount = parseInt(readlineSync.question('Bet amount: '), 10);
  game.makeBet(playerName, betAmount);
};

const playerCheck = game =>  game.makeBet(playerName, game.stake);

const playerFold = game => game.players = game.players.filter(x => x.name !== playerName);

const playerTurn = game => {
  if (game.players.find(x => x.name === playerName)) {
    const index = parseInt(readlineSync.question('|0: bet| |1: check| |2: fold|'), 10);
    [playerBet, playerCheck, playerFold][index](game);
  }
};

const opponentsTurn = game => {
  const removePlayers = [];
  game.players.filter(x => x.name !== playerName).forEach(opponent => {
    switch(Math.floor(Math.random()*10)) {
      case 0:
        const remaining = opponent.chips - game.stake;
        if (remaining > 0) {
          game.makeBet(opponent.name, game.stake + Math.floor(Math.random()*(remaining)));
        } else {
          removePlayers.push(opponent.name);
        }
        break;
      case 1:
        removePlayers.push(opponent.name);
        break;
      default:
        game.makeBet(opponent.name, game.stake);
    }
  });

  game.players = game.players.filter(x => !removePlayers.find(y => y === x.name));
};

const turn = game => {
  game.stake = 0;
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

