import { connect } from 'react-redux';
import Button from '../components/button';
import { begin } from '../actions/game-actions';

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(begin()); },
  actionLabel: 'Begin',
});

export default connect(null, mapDispatchToProps)(Button);
