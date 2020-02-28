const validateAction = (action: Function) => {
	if (action.name !== '') {
		const types = action()['types'];
		if (types && types[0]) {
			if (hasUniqueTypes(types)) {
				return true;
			} else {
				console.error("[Meta Selector] Warning: the 'types' array may not have unique values");
			}
		} else {
			console.error("[Meta Selector] The action passed is invalid. The action must return an object containing a 'types' key as an array of *_REQUEST, *_SUCCESS, *_FAILURE.");
		}
	} else {
		console.error('[Meta Selector] The action passed is invalid. The action passed in must not be bound to dispatch.');
	}
	return false;
}

const hasUniqueTypes = (types: Array<string>) => {

	let typeCounts: {[key: string]: any} = {};
	let distinctValues = true;

	types.forEach(function (item: string) {
		typeCounts[item] ? typeCounts[item] += 1 : typeCounts[item] = 1;
		if (typeCounts[item] > 1) {
			distinctValues = false;
		}
	})
	return distinctValues;
}

export default validateAction;