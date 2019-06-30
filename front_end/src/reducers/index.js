import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';
import CheckUploadedReducer from './reducer_check_uploaded';
import CheckProcessedReducer from './reducer_check_processed';
import UserIdReducer from './reducer_user_id';
import NameReducer from './reducer_name';
import UserFreqStatsReducer from './reducer_user_freq_stats';
import SentimentStatsReducer from './reducer_sentiment_stats';
import ChatFreqStatsReducer from './reducer_chat_freq_stats';
import CrudStatsReducer from './reducer_crud_stats';
import TopFriendsStatsReducer from './reducer_top_friends_stats';
import WordleStatsReducer from './reducer_wordle_stats';
import DeleteReducer from './reducer_delete';

// two cases after user logs in: either has data or doesn't have data
// so need two redux states: userSignedIn, userDataAnalysisComplete
const rootReducer = combineReducers({
    debug: false,
    userId: UserIdReducer,
    name: NameReducer,
    userLoggedIn: AuthReducer,
    userDataUploaded: CheckUploadedReducer,
    userDataProcessed: CheckProcessedReducer,
    userFreqStats: UserFreqStatsReducer,
    sentimentStats: SentimentStatsReducer,
    chatFreqStats: ChatFreqStatsReducer,
    crudStats: CrudStatsReducer,
	topFriendsStats: TopFriendsStatsReducer,
    wordleStats: WordleStatsReducer,
	deleteUser: DeleteReducer

});

export default rootReducer;
