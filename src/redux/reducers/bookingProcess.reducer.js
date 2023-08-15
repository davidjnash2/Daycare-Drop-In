const bookingProcess = (state = [], action) => {
  switch (action.type) {
    case "SET_FAMILY_BOOKING_PROCESS_DATA":
      return  action.payload ;
    case "SET_PROVIDER_BOOKING_PROCESS_DATA":
      return action.payload ;
    default:
      return state;
  }
};

/* To call the two separate streams of booking process data, should work something like this:
    const bookingProcessData = useSelector((store) => store.bookingProcess)
    const familyData = bookingProcessData.familyData
    const providerData = bookingProcessData.providerData
  */

export default bookingProcess;
