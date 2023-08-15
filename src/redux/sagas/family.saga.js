import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//Get family by familyId number (for rendering view-only family page)
function* getFamily(id) {
  console.log("Inside get family saga for family of id:", id.payload);
  try {
    const family = yield axios.get(`api/family/details/${id.payload}`);
    yield console.log("family.data is:", family.data);
    yield put({ type: "SET_FAMILY", payload: family.data });
  } catch (error) {
    console.log("Error in getFamily saga", error);
  }
}
function* getFamilyDetails(id) {
  console.log("Inside get family saga for family of id:", id.payload);
  try {
    const family = yield axios.get(`api/family/details/${id.payload}`);
    yield console.log("family.data is:", family.data);
    yield put({ type: "SET_FAMILY_DETAILS", payload: family.data[0] });
  } catch (error) {
    console.log("Error in getFamily saga", error);
  }
}

//Get family info by userID (for rendering family home page with edit access)
function* getFamilyUser(id) {
  console.log("Inside getFamilyUser saga for a family-user of ID:", id.payload);
  try {
    const family = yield axios.get(`/api/family/user/${id.payload}`);
    yield put({ type: "SET_FAMILY", payload: family.data[0] });
  } catch (error) {
    console.log("Error in getFamilyUser saga:", error);
  }
}

//Updates data for family of a given ID
function* updateFamily(action) {
  console.log("Inside updateFamily saga for family of id:", action.payload.id);
  try {
    yield axios.put(`api/family/update/${action.payload.id}`, action.payload);
    yield put({ type: "GET_FAMILY" });
  } catch {
    console.log("error with update family request");
  }
}

//Returns all families for the Admin family user table
function* getAllFamilies() {
  // console.log("Inside getAllFamiliesSaga");
  try {
    const families = yield axios.get(`api/family`);
    yield put({ type: "SET_FAMILIES", payload: families.data });
  } catch (error) {
    console.log("Error in getAllFamilies saga", error);
  }
}

//Allows admin to delete a family
function* deleteFamily(id) {
  console.log("Inside deleteFamily saga for family of ID:", id.payload);
  try {
    yield axios.delete(`api/family/delete/${id.payload}`);
  } catch (error) {
    console.log("Error in deleteFamily saga:", error);
  }
}

function* familySaga() {
  yield takeLatest("GET_ALL_FAMILIES", getAllFamilies);
  yield takeLatest("GET_FAMILY", getFamily);
  yield takeLatest("GET_FAMILY_DETAILS", getFamilyDetails);
  yield takeLatest("GET_FAMILY_USER", getFamilyUser);
  yield takeLatest("UPDATE_FAMILY", updateFamily);
  yield takeLatest("DELETE_FAMILY", deleteFamily);
}

export default familySaga;
