const formatAction = (action) => {
	return action()['types'][0].slice(0, -8);
}

export default formatAction;