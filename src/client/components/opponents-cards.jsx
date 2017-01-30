import React, { PropTypes } from 'react';

const OpponentsCards = ({ opponents }) => {
  if (opponents) {
    return (<div>
      {opponents.map(opponent => (
        opponent.cards.map((card, i) => <p key={i}>{card.number} {card.suit}</p>)
      ))}
    </div>);
  }
  return <div></div>;
};

//OpponentsCards.propTypes = {
//  cards: PropTypes.arrayOf(React.PropTypes.shape({
//    suit: React.PropTypes.string.isRequired,
//    number: React.PropTypes.number.isRequired,
//  })).isRequired,
//};

export default OpponentsCards;
