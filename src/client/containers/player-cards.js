import { connect } from 'react-redux';
import PlayerCards from '../components/player-cards';

const mapStateToProps = state => ({
  cards: state.getIn(['deck', 'player', 'cards']),
});

export default connect(mapStateToProps)(PlayerCards);
