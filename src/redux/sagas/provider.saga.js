import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/*
function getFilteredProviders() -- providers to display in the list, filtered for relevance to user
		yield put SET_FILTERED_PROVIDERS
*/

//get all the info for a particular provider to render provider home page
function* getProvider(id) {
  console.log("Inside getProvider saga for provider of id:", id.payload);
  try {
    const provider = yield axios.get(`/api/provider/details/${id.payload}`);
    yield put({ type: "SET_PROVIDER", payload: provider.data[0] });

  } catch (error) {
    console.log("Error in getProvider saga:", error);
  }
}

//get all the info for a particular provider by userID
function* getProviderUser(id) {
  console.log(
    "Inside getProviderUser saga for a provider-user of ID:",
    id.payload
  );
  try {
    const provider = yield axios.get(`/api/provider/user/${id.payload}`);
    yield put({ type: "SET_PROVIDER_USER", payload: provider.data[0] });

    //Additional calls to get data for child components based on newly available provider id
    yield put({
      type: "GET_PROVIDER_AVAILABILITY",
      payload: provider.data[0].id,
    });
    yield put({
      type: "GET_PROVIDER_BOOKINGS",
      payload: provider.data[0].id,
    });
    // yield put({
    //   type: "GET_PROVIDER_AVAILABILITY",
    //   payload: provider.data[0].id,
    // });
    yield put({
      type: "GET_PHOTOS",
      payload: provider.data[0].id,
    });
  } catch (error) {
    console.log("Error in getProvider saga:", error);
  }
}

//update info for a particular provider
function* updateProvider(action) {
  console.log("Inside updateProvider saga:", action.payload);
  try {
    yield axios.put(
      `/api/provider/update/${action.payload.id}`,
      action.payload
    );
    yield put({ type: "GET_PROVIDER", payload: action.payload.id });
  } catch (error) {
    console.log("error with updateProvider saga:", error);
  }
}

// Get all info for all the providers in the database (for admin view, maybe for static list view? )
function* getAllProviders() {
  // console.log("Inside getAllProviders saga");
  try {
    const providers = yield axios.get("/api/provider");
    yield put({ type: "SET_ALL_PROVIDERS", payload: providers.data });
  } catch (error) {
    console.log("Error in getProviders saga", error);
  }
}

// allows admin to remove a provider from the database
function* deleteProvider(id) {
  console.log("Inside deleteProvider saga for provider of ID:", id.payload);
  try {
    yield axios.delete(`/api/provider/delete/${id.payload}`);
  } catch (error) {
    console.log("Error in deleteProvider saga", error);
  }
}

function* providerSaga() {
  yield takeLatest("GET_PROVIDER", getProvider);
  yield takeLatest("GET_PROVIDER_USER", getProviderUser);
  yield takeLatest("UPDATE_PROVIDER", updateProvider);
  yield takeLatest("GET_ALL_PROVIDERS", getAllProviders);
  yield takeLatest("DELETE_PROVIDER", deleteProvider);
  //   yield takeLatest("GET_FILTERED_PROVIDERS", getFilteredProviders);
}

export default providerSaga;
