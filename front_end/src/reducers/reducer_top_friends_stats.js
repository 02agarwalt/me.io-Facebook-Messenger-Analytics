import { GET_TOPFRIENDS_STATS } from '../actions/actions_stats';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = [], action) {
    switch(action.type) {
        case GET_TOPFRIENDS_STATS:
            //console.log('GET_CRUD_STATS action being handled')
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
