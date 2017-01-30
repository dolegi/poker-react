import React, { PropTypes } from 'react';

const opponentCards = cards => 
	cards ? cards.map((card, i) => `${card.number}${card.suit} `) : '';

export default ({ opponents }) => {
	if (opponents) {
		return (<div>
			{opponents.map((opponent, i) => {
				return (<div className='pure-u-1-8' key={i}>
					<div>{opponent.name}</div>
					<div>{opponentCards(opponent.cards)}</div>
					<div>{opponent.chips}</div>
				</div>);
			})}
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

