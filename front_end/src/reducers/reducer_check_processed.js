import { CHECK_PROCESSED } from '../actions/actions_user_data';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = false, action) {
    switch(action.type) {
        case CHECK_PROCESSED:
            //console.log('check processed action being handled')
            //console.log(action.payload)
            if (action.payload.status == 200) {
                //console.log('data already processed')
                return true;
            } else if (action.payload.status == 201) {
                //console.log('data processed successfully')
                return true;
            }
            //console.log('data not yet processed successfully');
            return false;
    }
    return state;
}
