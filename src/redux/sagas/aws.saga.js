import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// aws is hooked up on each router to handle photo uploading associated with each components' post,
// awsCache is a server side variable at /api/${foo}/aws that holds the photo url returned from the S3 bucket.

// NOTE: the route is the same for all registration forms because the actual file upload to S3 happens immediately
// and is not dependent on the registration form being submitted, and we are not presenting simultaneous/REAL TIME user interactions
// with our app.

function* registrationPhoto(action){
    console.log('INSIDE REGISTRATION AWS action.payload:', action.payload);
    try {
        const newFile = action.payload.file;
        console.log('newFile', newFile)
        const data = new FormData(); //declare FormData
        data.append('file', newFile) // this data contains this file and contains this header
        yield console.log('Post new files to /api/user/aws', data);
       const upload = yield axios.put('/api/user/aws', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        yield console.log(upload);

    } catch (error) {
        console.log("PROBLEM WITH REGISTRATION AWS  ", error);
    }
}


// /api/child/aws
function* childPhoto(action){
    console.log('INSIDE CHILD AWS action.payload:', action.payload);
    try {
         const newFile = action.payload.file;
        console.log('newFile', newFile)
        const data = new FormData(); //declare FormData
        data.append('file', newFile) // this data contains this file and contains this header
        yield console.log('Post new files to /api/child/aws', data);
       yield axios.put('/api/child/aws', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

    } catch (error) {
        console.log("PROBLEM WITH CHILD AWS ", error);
    }
}


// /api/caretaker/aws
function* adultPhoto(action){
    console.log('INSIDE ADULT AWS action.payload:', action.payload);
    try {
        const newFile = action.payload.file;
        console.log('newFile', newFile)
        const data = new FormData(); //declare FormData
        data.append('file', newFile) // this data contains this file and contains this header
        yield console.log('Post new files to /api/caretaker/aws', data);
       yield axios.put('/api/caretaker/aws', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

    } catch (error) {
        console.log("PROBLEM WITH ADULT AWS", error);
    }
}


// /api/photo/aws
// function* providerGallery(action) {
// 	console.log("INSIDE PROVIDER AWS action.payload:", action.payload);
// 	try {
//         const newFile = action.payload.file;
//         console.log('newFile', newFile)
//         const data = new FormData(); //declare FormData
//         data.append('file', newFile) // this data contains this file and contains this header
//         yield console.log('Post new files to /api/photo/aws', data);
//        yield axios.put('/api/photo/aws', data, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         });
// 	} catch (error) {
// 		console.log("PROBLEM WITH PROVIDER AWS", error);
// 	}
// }



function* awsSaga() {
	yield takeLatest("AWS_REG_PHOTO", registrationPhoto);
	yield takeLatest("AWS_CHILD_PHOTO", childPhoto);
	yield takeLatest("AWS_ADULT_PHOTO", adultPhoto);
	// yield takeLatest("AWS_PROVIDER_GALLERY", providerGallery);
}

export default awsSaga;