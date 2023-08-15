import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// // worker Saga: will be fired on "REGISTER" actions
// function* registerUser(action) {
//   try {
//     // clear any existing error on the registration page
//     yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

//     // passes the username and password from the payload to the server
//     yield axios.post('/api/user/register', action.payload);

//     // automatically log a user in after registration
//     yield put({ type: 'LOGIN', payload: action.payload });

//     // set to 'login' mode so they see the login screen
//     // after registration or after they log out
//     yield put({ type: 'SET_TO_LOGIN_MODE' });
//   } catch (error) {
//     console.log('Error with user registration:', error);
//     yield put({ type: 'REGISTRATION_FAILED' });
//   }
// }

function* registerFamilyUser(action) {
  console.log('ARRIVED AT REGISTER FAMILY SAGA');
  const credentials = {username: action.payload.username , password: action.payload.password }
	try {
		yield put({ type: "CLEAR_REGISTRATION_ERROR" });

		yield axios.post("/api/user/register/family", action.payload);

		yield put({ type: "LOGIN", payload: credentials });
		yield put({ type: "SET_TO_LOGIN_MODE" });
	} catch (error) {
		console.log("Error with user registration:", error);
		yield put({ type: "REGISTRATION_FAILED" });
	}
}

function* registerJoinFamilyUser(action) {
  const credentials = {
		username: action.payload.username,
		password: action.payload.password,
  };
	try {
		yield put({ type: "CLEAR_REGISTRATION_ERROR" });

		yield axios.post("/api/user/register/new_family_user", action.payload);

		yield put({ type: "LOGIN", payload: credentials });
		yield put({ type: "SET_TO_LOGIN_MODE" });
	} catch (error) {
		console.log("Error with user registration:", error);
		yield put({ type: "REGISTRATION_FAILED" });
	}
}

function* registerProviderUser(action) {
  const credentials = {
		username: action.payload.username,
		password: action.payload.password,
  };
	try {
		yield put({ type: "CLEAR_REGISTRATION_ERROR" });

		yield axios.post("/api/user/register/provider", action.payload);

		yield put({ type: "LOGIN", payload: credentials });
		yield put({ type: "SET_TO_LOGIN_MODE" });
	} catch (error) {
		console.log("Error with user registration:", error);
		yield put({ type: "REGISTRATION_FAILED" });
	}
}

function* registrationSaga() {
  // yield takeLatest('REGISTER', registerUser);
  yield takeLatest('REGISTER_FAMILY', registerFamilyUser);
  yield takeLatest('REGISTER_PROVIDER', registerProviderUser);
  yield takeLatest('REGISTER_JOIN_FAMILY', registerJoinFamilyUser);

}

export default registrationSaga;
