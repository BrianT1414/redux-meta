const formatAction = (action: Function) => {
	return action()['types'][0].slice(0, -8);
}

export default formatAction;