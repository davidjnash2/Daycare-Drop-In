const familyDetails = (state = [], action) => {
	switch (action.type) {
		case "SET_FAMILY_DETAILS":
			return action.payload;
		default:
			return state;
	}
};

export default familyDetails;
