import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getAccessCode (action) {
    console.log('this is actionpayload', action.payload);
    console.log('in get access code saga', );
    try {
        let code = yield axios.get(`/api/user/join/family`);
        console.log('this is code.data', code.data);
        for(let obj of code.data){
            let family_id = "";

            if( obj.access_code === action.payload.access_code){
                console.log('action.payload', action.payload);
                family_id = obj.family_id

                yield put({type: "SET_CODE", payload: {hide:false, family_id: family_id}})
            }

            
        }
    } catch (error) {
        console.log('failed to get access code', error);
    }

   

}

function* codeSaga () {
    yield takeLatest("SUBMIT_CODE", getAccessCode) 
}

export default codeSaga;