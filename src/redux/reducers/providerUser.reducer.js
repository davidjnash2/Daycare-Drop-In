const providerUser = (state = {}, action) => {
	switch (action.type) {
		case "SET_PROVIDER_USER":
			return action.payload;
		default:
			return state;
	}
};

export default providerUser;
