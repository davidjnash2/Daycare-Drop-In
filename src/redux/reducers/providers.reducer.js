const provider = (state = {}, action) => {
  switch (action.type) {
    case "SET_PROVIDER":
      return action.payload;
    case "SET_ALL_PROVIDERS":
      return action.payload;
    case "SET_FILTERED_PROVIDERS":
      return action.payload;
    default:
      return state;
  }
};

export default provider;
