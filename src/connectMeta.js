import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actions } from './redux';

const mapStateToProps = function(state) {
  return {
    getMeta: selectors.metaSelector(state),
    getLoading: selectors.loadingSelector(state),
    getSuccess: selectors.successSelector(state),
    getFailure: selectors.failureSelector(state)
  };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    resetMeta: actions.resetMeta,
  }, dispatch)
};

export default function connectMeta(connected_component) {
  return connect(mapStateToProps, mapDispatchToProps)(connected_component);
}
