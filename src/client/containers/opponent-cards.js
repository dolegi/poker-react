import { connect } from 'react-redux';
import PlayerCards from '../components/player-cards';

const mapStateToProps = state => ({
  cards: state.getIn(['deck', 'opponent', 'cards']),
});

export default connect(mapStateToProps)(PlayerCards);
