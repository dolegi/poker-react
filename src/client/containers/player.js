import R from 'ramda';
import { connect } from 'react-redux';
import Player from '../components/player';

const mapStateToProps = state => ({ player: R.path(['player'], state.getIn(['game'])) });

export default connect(mapStateToProps)(Player);
