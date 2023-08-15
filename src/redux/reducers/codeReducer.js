const accessCodeReducer = (state = {hide:true, family_id:""}, action) => {
    switch (action.type) {
      case "SET_CODE":
        return action.payload
      default:
        return state;
    }
  };
  
  export default accessCodeReducer;