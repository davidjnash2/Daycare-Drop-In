import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//Get the array of photos for the provider homepage gallery
function* getPhotos(id) {
  console.log("Inside getPhotos saga for provider of id:", id.payload);
  try {
    const photos = yield axios.get(`/api/photo/${id.payload}`);
    yield put({ type: "SET_PHOTOS", payload: photos.data });
  } catch (error) {
    console.log("Error in getPhotos saga", error);
  }
}

//add a new photo to the gallery
function* postPhoto(action) {
  try {
    const newPhoto = action.payload
    console.log('newPhoto object inside postPhoto saga function:', newPhoto)

    // Need to create the FormData object, because in order to send a file
    // to our server, it needs to be encoded as multipart/form-data. (This
    // is where the Multer library name comes from!)
    const data = new FormData(); //declare FormData

    // Now, we need to add key-value pairs to our FormData object. At the
    // end of the day, we need it to look like:
    // {provider_id: 1, description: 'Some text content', file: FILE}
    data.append('provider_id', newPhoto.provider_id)
    data.append('description', newPhoto.description)
    data.append('file', newPhoto.photo_file)

    // Let's send this shit to the server:
    yield axios({
      method: 'POST',
      url: '/api/photo',
      data: data,
      headers: {'content-type': 'multipart/form-data'}
    })

    // Our POST apparently worked, so let's be sure to refresh the photo reducer:
    yield put({ type: "GET_PHOTOS", payload: action.payload.provider_id});
  } catch (error) {
    console.log("error in postPhoto saga", error);
  }
}

//deletes a photo of a given id from the database
function* deletePhoto(action) {
  console.log("Inside deletePhoto saga for photo of ID:", action.payload.id);
  try {
    yield axios.delete(`/api/photo/delete/${action.payload.id}`);
    yield put({ type: "GET_PHOTOS", payload: action.payload.provider_id });
  } catch (error) {
    console.log("Error in deletePhoto saga", error);
  }
}

function* photosSaga() {
  yield takeLatest("GET_PHOTOS", getPhotos);
  yield takeLatest("POST_PHOTO", postPhoto);
  yield takeLatest("DELETE_PHOTO", deletePhoto);
}

export default photosSaga;
