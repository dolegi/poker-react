import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin } from '../actions/game-actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  begin: () => { dispatch(begin()); },
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
