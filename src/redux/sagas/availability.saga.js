import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//Gets all the availability data for a provider of the given id
function* getAllAvailability() {
  console.log("Inside getAllAvailability");
  try {
    const availability = yield axios.get(`/api/availability`);
    yield put({ type: "SET_AVAILABILITY", payload: availability.data });
  } catch (error) {
    console.log("Error in getAllAvailability saga:", error);
  }
}

function* getProviderAvailability(id) {
  console.log("Inside getAvailability saga for provider of id:", id.payload);
  try {
    const availability = yield axios.get(`/api/availability/details/${id.payload}`);
    yield put({ type: "SET_AVAILABILITY", payload: availability.data });
  } catch (error) {
    console.log("Error in getProviderAvailability saga:", error);
  }
}

function* getBookingAvailability(id) {
  console.log("Inside getBookingAvailability saga for availability of id:", id.payload);
  try {
    const availability = yield axios.get(`/api/availability/details/specific/${id.payload}`);
    yield put({ type: "SET_BOOKING_AVAILABILITY", payload: availability.data[0] });
    // this is now setting singleBookingAvailability reducer so that we don't overwrite availability reducer with hyper specific data.
  } catch (error) {
    console.log("Error in getBookingAvailability saga:", error);
  }
}

function* addAvailability(action) {
  console.log("Inside addAvailability saga:", action.payload);
  try {
    yield axios.post(`/api/availability`, action.payload);
    yield put({
      type: "GET_PROVIDER_AVAILABILITY",
      payload: action.payload.provider_id,
    });
  } catch (error) {
    console.log("error with update request in post saga:", error);
  }
}

function* deleteAvailability(action) {
  console.log("Inside deleteAvailability for ID:", action.payload.id);
  try {
    yield axios.delete(`/api/availability/delete/${action.payload.id}`);
    yield put({
      type: "GET_PROVIDER_AVAILABILITY",
      payload: action.payload.provider_id,
    });
  } catch (error) {
    console.log("Error in deleteAvailability saga", error);
  }
}

function* updateAvailability(id) {
  console.log("Inside updateAvailability saga and update data via id.payload is:", id.payload);
  try {
    yield axios.put(`/api/availability/update/${id.payload.id}`, id.payload);
  } catch (error) {
    console.log("Error in getBookingAvailability saga:", error);
  }
}

function* availabilitySaga() {
  yield takeLatest("GET_ALL_AVAILABILITY", getAllAvailability);
  yield takeLatest("GET_PROVIDER_AVAILABILITY", getProviderAvailability);
  yield takeLatest("GET_BOOKING_AVAILABILITY", getBookingAvailability);
  yield takeLatest("ADD_AVAILABILITY", addAvailability);
  yield takeLatest("DELETE_AVAILABILITY", deleteAvailability);
  yield takeLatest("UPDATE_AVAILABILITY", updateAvailability);
  // yield takeLatest("GET_FILTERED_AVAIL", getFilteredAvailability);
}

export default availabilitySaga;
