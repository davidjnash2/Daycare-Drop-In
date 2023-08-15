import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


//Get info for all adults of a particular family
function* getAdults(id) {
  console.log("Inside getAdults saga for family of id:", id.payload);
  try {
    const adults = yield axios.get(`/api/caretaker/details/${id.payload}`);
    yield put({ type: "SET_ADULTS", payload: adults.data });
  } catch (error) {
    console.log("Error in getAdults saga", error);
  }
}


//add a new responsible adult to a family
function* postAdult(action) {
  console.log("Inside postAdults saga:", action.payload);
  try {
    yield axios.post("/api/caretaker", action.payload);
    yield put({ type: "GET_ADULTS", payload: action.payload.family_id });
  } catch (error) {
    console.log("error with postAdults saga:", error);
  }
}

//update info for a particular adult
function* updateAdult() {
  console.log("Inside updateAdult saga:", action.payload);
  try {
    yield axios.put(
      `/api/caretaker/${action.payload.id}`,
      action.payload
    );
    yield put({ type: "GET_ADULTS", payload: action.payload.id });
  } catch (error) {
    console.log("error with updateAdult saga:", error);
  }
}

//Delete the adult of this ID
function* deleteResAdult(id) {
  console.log("Inside deleteAdult saga for adult of id:", id.payload);
  try {
    yield axios.delete(`/api/caretaker/delete/${id.payload.id}`);
    yield put({type: "GET_ADULTS", payload: id.payload.familyId})
  } catch (error) {
    console.log("Error in deleteAdult saga:", error);
  }
}


function* responsibleAdultSaga() {
  yield takeLatest("GET_ADULTS", getAdults);
  yield takeLatest("POST_ADULT", postAdult);
  yield takeLatest("UPDATE_ADULT", updateAdult);
  yield takeLatest("DELETE_ADULT", deleteResAdult);
}

export default responsibleAdultSaga;
