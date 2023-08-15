import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* filterResults(action){
    console.log('IN FILTERED RESULTS', action.payload);
    try {
        yield put({type:'SET_NEW_RESULTS', payload: action.payload})
        yield put({type:'SET_FILTER'})

    } catch (error) {
        console.log('Problem with filtered results', error);

    }
}
function* unfilterResults(){
    console.log('IN UNFILTERED RESULTS');
    try {
        yield put({type:'CLEAR_RESULTS'})
        // yield put({type:'CLEAR_FILTER'})

    } catch (error) {
        console.log('problem with clearing filters', error);

    }
}


function* filterListSaga() {
	yield takeLatest("FETCH_FILTERED_RESULTS", filterResults);
	yield takeLatest("CLEAR_FILTERED_RESULTS", unfilterResults);

}

export default filterListSaga;