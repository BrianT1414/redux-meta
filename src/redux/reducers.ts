import types from './types';
import { Meta } from '../types';

function reducer(state: {[s: string]: Meta} = {}, action: { type: string; payload: any; }) {
    if (action.type === types.RESET_META) {
      if (action.payload) {
        return {
          ...state,
          [action.payload]: {loading: false, success: false, failure: false, message: ''}
        }
      } else {
        return {};
      }
    }

    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
    
    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) {
      return state;  
    }
    
    const [, requestName, requestState] = matches;
  
    let message = '';
    // For FAILURE and SUCCESS we want to set the message if there is one
    if (action.payload && typeof action.payload.message === 'string') {
      message = action.payload.message;
    }
  
    return {
      ...state,
      [requestName]: { loading: requestState === 'REQUEST', success: requestState === 'SUCCESS', failure: requestState === 'FAILURE', message },
    };
  };

  export default reducer;