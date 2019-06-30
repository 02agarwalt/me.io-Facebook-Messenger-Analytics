import { DELETE } from '../actions/actions_auth';


// the `state` param is initial state
export default function (state = [], action) {
    switch(action.type) {
        case DELETE:
            //console.log(' action being handled')
            //console.log(action.payload)
            if (action.payload.status == 200) {
                //console.log(action.payload.data)
                return action.payload.data;
            }
            //console.log('data not yet processed successfully');
            return state;
    }
    return state;
}
