import { GET_CHAT_FREQ_STATS } from '../actions/actions_stats';

// This reducer is to handle everything regarding authentication

// the `state` param is initial state
export default function (state = [], action) {
    switch(action.type) {
        case GET_CHAT_FREQ_STATS:
            //console.log('GET_CHAT_FREQ_STATS action being handled')
            //console.log(action.payload)
            if (action.payload.status == 200) {
                //console.log('returning messagesPerHour')
                return action.payload.data.messagesPerHour;
            }
            //console.log('data not yet processed successfully');
            return state;
    }
    return state;
}
