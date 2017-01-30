import React, { PropTypes } from 'react';

const PlayerCards = ({ player }) => {
  if (player.cards) {
    const displayCards = player.cards.map((card, i) => <p key={i}>{card.number} {card.suit}</p>);

    return <div>{displayCards}</div>;
  }
  return <div></div>;
};

PlayerCards.propTypes = {
  player: PropTypes.shape({
    cards: PropTypes.arrayOf(React.PropTypes.shape({
      suit: React.PropTypes.string.isRequired,
      number: React.PropTypes.number.isRequired,
    })).isRequired,
  }),
};

export default PlayerCards;
