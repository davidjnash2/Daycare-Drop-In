
const availability = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABILITY":
      return action.payload;
    case "SET_FILTERED_AVAILABILITY":
      return action.payload;
    default:
      return state;
  }
};

export default availability;

