import reducer from "./redux";
import { selectors } from './redux';
import connectMeta from './connectMeta';

const getLoading = selectors.loadingSelector;
const getSuccess = selectors.successSelector;
const getFailure = selectors.failureSelector;
const getMeta = selectors.metaSelector;

export { ConnectMeta } from './types';

export { getLoading, getSuccess, getFailure, getMeta, connectMeta, reducer };
