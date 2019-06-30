import { CHECK_UPLOADED } from '../actions/actions_user_data';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = false, action) {
    switch(action.type) {
        case CHECK_UPLOADED:
            //console.log('check uploaded action being handled')
            //console.log(action.payload)
            if (action.payload.status == 200) {
                //console.log('data already uploaded')
                return true;
            } else if (action.payload.status == 201) {
                //console.log('data uploaded successfully')
                return true;
            }
            //console.log('data not yet uploaded successfully');
            return false;
    }
    return state;
}
