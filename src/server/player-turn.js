// @flow

import readlineSync from 'readline-sync';
import Game from '../shared/game';
import Player from '../shared/player';

const playerBet = (game, player) => {
  const betAmount = parseInt(readlineSync.question('Bet amount: '), 10);
  game.makeBet(player.name, betAmount);
};

const playerCheck = (game, player) => {
  const match = game.stake - player.currentBet;
  if (match >= 0)
    game.makeBet(player.name, match);
};

const playerFold = (game, player) => game.removePlayers([player]);

export default (game: Game, player: Player) => {
  if (game.players.find(x => x.name === player.name)) {
    const index = parseInt(
      readlineSync.question(`Stake: ${game.stake}|0: bet| |1: check| |2: fold|`),
      10
    );
    [playerBet, playerCheck, playerFold][index](game, player);
  }
};

