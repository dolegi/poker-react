import React, { PropTypes } from 'react';

const PlayerCards = ({ cards }) => {
  const displayCards = cards.map((card, i) => <p key={i}>{card.number} {card.suit}</p>);

  return <div>{displayCards}</div>;
};

PlayerCards.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.shape({
    suit: React.PropTypes.string.isRequired,
    number: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default PlayerCards;
