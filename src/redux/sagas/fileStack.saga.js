import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import FormData from "form-data";

function* fileStack(action) {
    console.log('this is action payload file', action.payload);
    try {
        const conditionResponse = yield axios.post('/api/file', action.payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          });
        console.log("This is conditionResponse:", conditionResponse.data)
        yield put({
            type: "SET_PHOTOS",
            payload: conditionResponse.data
        })
    } catch (error) {
        console.log("Error in saga /api/file", error)
    }
}

function* fileStackSaga(){
    yield takeLatest("GET_FILE", fileStack)
}

export default fileStackSaga;