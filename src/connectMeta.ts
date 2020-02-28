import { connect } from 'react-redux';
//@ts-ignore
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { selectors, actions } from './redux';

const mapStateToProps = function(state: any) {
  return {
    getMeta: selectors.metaSelector(state),
    getLoading: selectors.loadingSelector(state),
    getSuccess: selectors.successSelector(state),
    getFailure: selectors.failureSelector(state)
  };
}

const mapDispatchToProps = function (dispatch: Dispatch<AnyAction>) {
  return bindActionCreators({
    resetMeta: actions.resetMeta,
  }, dispatch)
};

export default function connectMeta(connected_component: any) {
  return connect(mapStateToProps, mapDispatchToProps)(connected_component);
}
