// @flow

import Game from '../shared/game';

export default (game: Game, playerName: string, force: boolean = true) => {
  const removePlayers = [];
  game.players.filter(x => x.name !== playerName).forEach(opponent => {
    if (force) {
      switch(Math.floor(Math.random()*10)) {
        case 0:
          if (opponent.chips >= game.stake) {
            let betAmount = Math.ceil(Math.random()*(opponent.chips - game.stake));
            if (Math.random() > 0.5)
              Math.floor(betAmount/2);
            game.makeBet(opponent.name, game.stake + betAmount);
          } else {
            removePlayers.push(opponent);
          }
          break;
        case 1:
          if (game.players.length > 1)
            removePlayers.push(opponent);
          break;
        default:
          const match = opponent.chips - game.stake;
          if (match >= 0) {
            game.makeBet(opponent.name, game.stake);
          } else {
            removePlayers.push(opponent);
          }
      }
    } else if (opponent.currentBet !== game.stake) {
      switch(Math.floor(Math.random()*10)) {
        case 0:
          if (game.players.length > 1)
            removePlayers.push(opponent);
          break;
        default:
          const match = game.stake - opponent.currentBet;
          if (match <= opponent.chips) {
            game.makeBet(opponent.name, match);
          } else {
            removePlayers.push(opponent);
          }
      }
    }
  });
  game.removePlayers(removePlayers);
};


