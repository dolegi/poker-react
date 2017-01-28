// @flow
/* eslint-disable no-console */

import readlineSync from 'readline-sync';

import Player from '../shared/player';
import Game from '../shared/game';
import PlayerTurn from './player-turn';

const playerName = readlineSync.question('Player Name: ');

const player = new Player(playerName, 50);
let opponents = [...Array(8)].map(() => new Player(Math.random().toString(36).substr(2, 5), 50));

const print = game => {
  const chipsCards = obj => 
    `${obj.chips} ${obj.cards.reduce((res, c) => `${res}${c.number}${c.suit} `, '')}`;

  console.log(`Opponents: ${game.players.filter(x => x.name !== playerName).reduce((res, o) => `${res} (${o.name}:${o.chips})`, '')}`);
  console.log(`[ ${playerName} ${chipsCards(player)}][ Table ${chipsCards(game.table)}]`);
};

const opponentsTurn = (game, force=true) => {
  const removePlayers = [];
  game.players.filter(x => x.name !== playerName).forEach(opponent => {
    if (force) {
      switch(Math.floor(Math.random()*10)) {
        case 0:
          if (opponent.chips >= game.stake) {
            game.makeBet(opponent.name, game.stake + Math.floor(Math.random()*(opponent.chips - game.stake)));
          } else {
            console.log(111, opponent.name);
            removePlayers.push(opponent.name);
          }
          break;
        case 1:
          console.log(222, opponent.name);
          removePlayers.push(opponent.name);
          break;
        default:
          const match = opponent.chips - game.stake;
          if (match >= 0) {
            game.makeBet(opponent.name, game.stake);
          } else {
            console.log(333, opponent.name);
            removePlayers.push(opponent.name);
          }
      }
    } else if (opponent.currentBet !== game.stake) {
      switch(Math.floor(Math.random()*10)) {
        case 1:
          removePlayers.push(opponent.name);
          break;
        default:
          const match = game.stake - opponent.currentBet;
          if (match <= opponent.chips) {
            console.log(opponent.name, match);
            game.makeBet(opponent.name, match);
          } else {
            console.log(444, opponent.name);
            removePlayers.push(opponent.name);
          }
      }
    }
  });

  game.players = game.players.filter(x => !removePlayers.find(y => y === x.name));
};

const turn = game => {
  game.stake = 0;
  player.currentBet = 0;
  opponents.forEach(o => o.currentBet = 0);
  
  print(game);
  new PlayerTurn(game, player);
  opponentsTurn(game);
  print(game);
  if (player.currentBet !== game.stake)
    new PlayerTurn(game, player);
  opponentsTurn(game, false);
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
    `${winners.reduce((res, winner, i, self) =>
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

