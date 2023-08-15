const singleBookingAvailability = (state = [], action) => {
	switch (action.type) {
		case "SET_BOOKING_AVAILABILITY":
			return action.payload;
		default:
			return state;
	}
};

export default singleBookingAvailability;
