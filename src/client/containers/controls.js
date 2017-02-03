import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin, newTurn, bet } from '../actions/game-actions';

const mapDispatchToProps = dispatch => ({
  begin: (name) => {
    dispatch(begin(name));
    dispatch(newTurn());
  },
  bet: amount => dispatch(bet(amount)),
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
