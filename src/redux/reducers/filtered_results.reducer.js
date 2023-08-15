const filter = (state = false, action) => {
	switch (action.type) {
		case "SET_FILTER":
			return true;
        case "CLEAR_FILTER":
            return false;
		default:
			return state;
	}
};

export default filter;
