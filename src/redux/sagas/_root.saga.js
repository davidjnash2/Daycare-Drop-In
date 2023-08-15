import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import bookingsSaga from "./booking.saga";
import childrenSaga from "./children.saga";
import familySaga from "./family.saga";
import filterListSaga from './list_filtering.saga'
import photosSaga from "./photos.saga";
import providerSaga from "./provider.saga";
import responsibleAdultSaga from "./responsible_adult.saga";
import availabilitySaga from "./availability.saga";
import codeSaga from "./code.saga";
import fileStackSaga from "./fileStack.saga";
import awsSaga from "./aws.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    availabilitySaga(),
    registrationSaga(),
    userSaga(),
    bookingsSaga(),
    childrenSaga(),
    familySaga(),
    filterListSaga(),
    photosSaga(),
    providerSaga(),
    responsibleAdultSaga(),
    codeSaga(),
    fileStackSaga(),
    awsSaga()
  ])}
