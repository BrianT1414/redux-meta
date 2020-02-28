import types from './types';
import validateAction from '../utils/validateAction';
import formatAction from '../utils/formatAction';

export function resetMeta(type?: Function) {
  let payload = null;
  if (type) {
    if (validateAction(type)) {
      payload = formatAction(type);
    }
  }
  return {
    type: types.RESET_META,
    payload
  }
}