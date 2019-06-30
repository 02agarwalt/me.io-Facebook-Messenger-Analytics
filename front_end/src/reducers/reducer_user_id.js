import { SET_USER_ID } from '../actions/actions_auth';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = null, action) {
    switch(action.type) {
        case SET_USER_ID:
            //console.log('set user id action being handled')
            if (action.payload) {
                //console.log(action.payload)
                return action.payload;
            }
            return state;

    }
    return state;
}
