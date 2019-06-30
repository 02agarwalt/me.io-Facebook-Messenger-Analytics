import { SET_NAME } from '../actions/actions_auth';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = '', action) {
    switch(action.type) {
        case SET_NAME:
            //console.log('set name action being handled')
            if (action.payload) {
                //console.log(action.payload)
                return action.payload;
            }
            return state;
    }
    return state;
}
