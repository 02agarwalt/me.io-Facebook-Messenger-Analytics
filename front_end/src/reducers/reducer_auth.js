import { SIGN_UP, LOG_IN} from '../actions/actions_auth';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = false, action) {
    switch(action.type) {
        case SIGN_UP:
            // return state.push(action.payload.data); // this will mutate state (BAD)
            // return state.concat([action.payload.data]); // alternative
            // return [ action.payload.data, ...state ]; // [ new_city, city, city ]
            //console.log('user sign up action being handled')
            // //console.log(action.payload)
            if (action.payload.status == 201) {
                //console.log('user created')
                return true
            }
            return false;
        case LOG_IN:
            //console.log('user log in action being handled')
            // //console.log(action.payload)
            if (action.payload.status == 201) {
                //console.log('user logged in')
                return true
            }
            return false;
    }
    return state;
}
