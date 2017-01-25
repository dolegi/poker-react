import { connect } from 'react-redux';
import Deck from '../components/deck';

const mapStateToProps = state => ({
  cards: state.getIn(['deck', 'shuffled']) ? 'shuffled' : 'not shuffled',
});

export default connect(mapStateToProps)(Deck);
