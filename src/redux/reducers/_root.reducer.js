import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import family from "./family.reducer";
import provider from "./providers.reducer";
import bookings from "./bookings.reducer";
import bookingProcess from "./bookingProcess.reducer";
import children from "./children.reducer";
import responsibleAdults from "./responsible_adults.reducer";
import availability from "./availability.reducer";
import photo from "./photo.reducer";
import filter from "./filtered_results.reducer";
import filteredAvail from "./newResults.reducer";
import accessCodeReducer from "./codeReducer";
import singleAvail from "./singleBookingAvailability.reducer";
import providerUser from "./providerUser.reducer";
import familyDetails from "./familyDetails.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  family,
  provider,
  bookings,
  bookingProcess,
  children,
  responsibleAdults,
  availability,
  photo,
  filter,
  filteredAvail,
  accessCodeReducer,
  singleAvail,
  providerUser,
  familyDetails,

  // will have an id and username if someone is logged in
});

export default rootReducer;
