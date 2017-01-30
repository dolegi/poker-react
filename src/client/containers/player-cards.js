import R from 'ramda';
import { connect } from 'react-redux';
import PlayerCards from '../components/player-cards';

const mapStateToProps = state => {
  debugger;
	return {
		player: R.path(['player'], state.getIn(['game'])),
	};
};

export default connect(mapStateToProps)(PlayerCards);
