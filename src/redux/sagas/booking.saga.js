import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//Gets all the bookings for the provider of the given ID
function* getProviderBookings(id) {
  console.log("Inside getProviderBookings for provider of id:", id.payload);
  try {
    const bookings = yield axios.get(`/api/booking/provider/${id.payload}`);
    yield put({ type: "SET_BOOKINGS", payload: bookings.data });
  } catch (error) {
    console.log("Error in getProviderBookings saga", error);
  }
}

//Gets all the bookings for the family of the given ID
function* getFamilyBookings(id) {
  console.log("Inside getFamilyBookings for family of id:", id.payload);
  try {
    const bookings = yield axios.get(`/api/booking/details/${id.payload}`);
    yield put({ type: "SET_BOOKINGS", payload: bookings.data });
  } catch (error) {
    console.log("Error in getFamilyBookings saga", error);
  }
}

//Get all booking PROCESS data for family corresponding to this user ID
function* getFamilyBookingProcessData(id) {
  // console.log("Inside getFamilyBookingProcessData for user of id:", id.payload);
  try {
    const responseData = yield axios.get(
      `/api/booking/booking_process/family/${id.payload}`
    );
    console.log('in getFamilyBookingProcessData and responseData.data is:', responseData.data);
    yield put({
      type: "SET_FAMILY_BOOKING_PROCESS_DATA",
      payload: responseData.data[0],
    });
  } catch (error) {
    console.log("Error in getFamilyBookingProcessData saga", error);
  }
}

//Get  booking PROCESS data for PROVIDER corresponding to this ID
function* getProviderBookingProcessData(id) {
  console.log("Inside getProviderBookingProcessData for provider id:", id.payload);
  try {
    const responseData = yield axios.get(
      `/api/booking/booking_process/provider/${id.payload}`
    );
    console.log('in getProviderBookingProcessData and responseData.data is:', responseData.data);

    yield put({
      type: "SET_PROVIDER_BOOKING_PROCESS_DATA",
      payload: responseData.data[0],
    });
  } catch (error) {
    console.log("Error in getProviderBookingProcessData saga", error);
  }
}

//Add a booking
function* postBooking(action) {
  console.log("Inside postBooking saga:", action.payload);
  const newBooking = action.payload;
  try {
    yield axios.post("/api/booking", newBooking);
    yield put({ type: "GET_FAMILY_BOOKINGS", payload:action.payload.family_id });
    yield put({ type: "GET_PROVIDER_BOOKINGS", payload:action.payload.family_id });
  } catch {
    console.log("error with postBooking saga", error);
  }
}

//Delete a booking
function* deleteBooking(id) {
  // console.log("Inside deleteBooking for booking of ID:", id.payload);
  try {
    yield axios.delete(`/api/booking/${id.payload}`);
  } catch (error) {
    console.log("Error in deleteBooking saga", error);
  }
}

function* bookingSaga() {
  yield takeLatest("GET_FAMILY_BOOKINGS", getFamilyBookings);
  yield takeLatest("GET_PROVIDER_BOOKINGS", getProviderBookings);
  yield takeLatest(
    "GET_FAMILY_BOOKING_PROCESS_DATA",
    getFamilyBookingProcessData
  );
  yield takeLatest(
    "GET_PROVIDER_BOOKING_PROCESS_DATA",
    getProviderBookingProcessData
  );
  yield takeLatest("POST_BOOKING", postBooking);
  yield takeLatest("DELETE_BOOKING", deleteBooking);
}

export default bookingSaga;
