import validateAction from '../utils/validateAction';
import formatAction from '../utils/formatAction';

const metaSelector = (state) => (action) => {
	if (validateAction(action)) {
	const index = formatAction(action);
		if (state.meta[index]) {
			return state.meta[index];
		}
	}
	return {loading: false, success: false, failure: false,  message: ''};
};

const loadingSelector = (state) => (actions, initial = false) => {
	// If array of actions
	if (typeof actions === 'object') {
		// returns true only when all actions passed in are not loading
		return actions.reduce((carry, action) => {
			return filter(state)(action, initial, 'loading');
		}, initial);
	}

	// If not array
	return filter(state)(actions, initial, 'loading');
};

const successSelector = (state) => (action, initial = false) => {
	return filter(state)(action, initial, 'success');
};

const failureSelector = (state) => (action, initial = false) => {
	return filter(state)(action, initial, 'failure');
};

const filter = (state) => (action, initial = false, type) => {
	if (validateAction(action)) {
		const index = formatAction(action);
		if (state.meta[index]) {
			if (state.meta[index][type] === true) {
				return true;
			} else if (state.meta[index][type] === false) {
				return false;
			} else {
				return initial;
			}
		} else {
			return initial;
		}
	}
	return initial;
};

export default {
	metaSelector,
	loadingSelector,
	successSelector,
	failureSelector
}