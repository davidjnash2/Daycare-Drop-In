const family = (state = [], action) => {
  switch (action.type) {
    case "SET_FAMILY":
      return action.payload;
    case "SET_FAMILIES":
      return action.payload;
    default:
      return state;
  }
};

export default family;
