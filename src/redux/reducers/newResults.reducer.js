const filteredAvail = (state = [], action) => {
	switch (action.type) {
		case "SET_NEW_RESULTS":
			return action.payload;
        case "CLEAR_RESULTS":
            return [];
		default:
			return state;
	}
};

export default filteredAvail;
