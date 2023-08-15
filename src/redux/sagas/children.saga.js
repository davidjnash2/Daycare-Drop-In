import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/*PSEUDO-CODE NOTES FOR CHILDREN SAGAS:







*/

//Retrieve data for all children of a particular family ID
function* getChildren(id) {
  console.log("Inside getChildren saga for family of id:", id.payload);
  try {
    const children = yield axios.get(`/api/child/details/${id.payload}`);
    yield put({ type: "SET_CHILDREN", payload: children.data });
  } catch (error) {
    console.log("Error in getChildren saga", error);
  }
}

//Add a new child to a family
function* postChild(action) {
  console.log("Inside postChild saga:", action.payload);
  try {
    yield axios.post("/api/child", action.payload);
    yield put({ type: "GET_CHILDREN", payload: action.payload.family_id});
  } catch (error) {
    console.log("Error in postChild saga", error);
  }
}
// Update info for a particular child
function* updateChild(action) {
  console.log("Inside updateChild saga", action.payload);
    try {
    yield axios.put(`/api/child/update/${action.payload.childId}`, action.payload);
    yield put({ type: "GET_CHILDREN", payload: action.payload.family_id });
  } catch (error) {
    console.log("error in updateChild saga", error);
  }
}

// Delete a child's info from the database
function* deleteChild(id) {
	console.log("Inside deleteChild saga for child of ID:", id.payload);
	try {
	  yield axios.delete(`/api/child/delete/${id.payload.id}`);
    yield put({type: "GET_CHILDREN", payload: id.payload.familyId})
	} catch (error) {
	  console.log("Error in deleteChild saga", error);
	}
}




function* childrenSaga() {
  yield takeLatest("GET_CHILDREN", getChildren);
  yield takeLatest("UPDATE_CHILD", updateChild);
  yield takeLatest("POST_CHILD", postChild);
  yield takeLatest("DELETE_CHILD", deleteChild);
}

export default childrenSaga;
