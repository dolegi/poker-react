import React, { PropTypes } from 'react';

const Player = ({ player }) =>
  <div className="pure-1-12">
    {`${player.name ? player.name : 'Player'}:`} <br />
    {player.cards.reduce((acc, card) => `${acc} ${card.number}${card.suit}`, '')}
    <div>{player.chips}</div>
  </div>;

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
    chips: PropTypes.number.isRequired,
    currentBet: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    folded: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Player;
