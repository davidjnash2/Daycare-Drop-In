const responsibleAdults = (state = [], action) => {
  switch (action.type) {
    case "SET_ADULTS":
      return action.payload;
    default:
      return state;
  }
};

export default responsibleAdults;
