import React, { PropTypes } from 'react';

const PlayerCards = ({ player }) => {
	if (player.cards) {
		const displayCards = player.cards.reduce((acc, card) => `${acc} ${card.number}${card.suit}`, '');

		return (<div className='pure-1-12'>
			{player.cards.reduce((acc, card) => `${acc} ${card.number}${card.suit}`, '')}
			<div>{player.chips}</div>
		</div>);
	}
	return <div></div>;
};

PlayerCards.propTypes = {
	player: PropTypes.shape({
		cards: PropTypes.arrayOf(React.PropTypes.shape({
			suit: React.PropTypes.string.isRequired,
			number: React.PropTypes.number.isRequired,
		})),
	}),
};

export default PlayerCards;
