import { connect } from 'react-redux';
import Button from '../components/button';
import { newGame } from '../actions/deck-actions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(newGame()); },
  actionLabel: 'New Game',
});

export default connect(null, mapDispatchToProps)(Button);
