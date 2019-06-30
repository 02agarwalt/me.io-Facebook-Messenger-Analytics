import axios from 'axios';
import { getCrudStats } from './actions_stats';
import { GET_USER_FREQ_STATS, GET_SENTIMENT_STATS, GET_CHAT_FREQ_STATS, GET_WORDLE_STATS, GET_TOPFRIENDS_STATS, GET_CRUD_STATS } from './actions_stats'
const ME_API_URL = `http://127.0.0.1:5000/api/`;

export const CHECK_UPLOADED = 'CHECK_UPLOADED';
export const CHECK_PROCESSED = 'CHECK_PROCESSED';
export const PROCESS_DATA = 'PROCESS_DATA';


export function checkUploaded(userId) {
    const url = `${ME_API_URL}whether_uploaded/${userId}`;
    const request = axios.get(url); // returns a promise to be stored in `request`

    return {
        type: CHECK_UPLOADED,
        payload: request
    }
}

export function checkProcessed(userId) {
    const url = `${ME_API_URL}whether_processed/${userId}`;
    const request = axios.get(url); // returns a promise to be stored in `request`
    console.log('checkProcessed')

    return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            console.log('result of processData')
            console.log(result)
            dispatch(getCrudStats(userId));
            dispatch({ type: CHECK_PROCESSED, payload: request }); // for updating the redux state value for uploaded
        }).catch(error => {
            //console.log('error of uploadData')
            //console.log(error)
        });
    }
}

export function uploadData(userId, file) {
    const url = `${ME_API_URL}upload/${userId}`;
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'enctype': 'multipart/form-data'
        }
    }
    const request = axios.post(url, formData, config); // returns a promise to be stored in `request`

    return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            //console.log('result of uploadData')
            //console.log(result)
            dispatch({ type: CHECK_UPLOADED, payload: request }); // for updating the redux state value for uploaded
            dispatch(processData(userId));
        }).catch(error => {
            //console.log('error of uploadData')
            //console.log(error)
        });
    }

    // return (dispatch) => {
    //     dispatch({ type: CHECK_UPLOADED, payload: request }); // for updating the redux state value for uploaded
    //     dispatch(processData(userId));
    // }
}

export function removeData(userId) {
	return (dispatch) => {
		dispatch({ type: CHECK_UPLOADED, payload: {status: 404} });
		dispatch({ type: CHECK_PROCESSED, payload: {status: 404} });
		dispatch({ type: GET_USER_FREQ_STATS, payload: {status: 404} });
		dispatch({ type: GET_SENTIMENT_STATS, payload: {status: 404} });
		dispatch({ type: GET_CHAT_FREQ_STATS, payload: {status: 404} });
		dispatch({ type: GET_WORDLE_STATS, payload: {status: 404} });
		dispatch({ type: GET_TOPFRIENDS_STATS, payload: {status: 404} });
		dispatch({ type: GET_CRUD_STATS, payload: {status: 404} });
	}
}

export function processData(userId) {
    const url = `${ME_API_URL}compute-user-stats/${userId}`;
    //console.log('sending data processing request')
    const request = axios.put(url); // returns a promise to be stored in `request`

    return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            //console.log('result of processData')
            //console.log(result)
            dispatch(getCrudStats(userId));
            dispatch({ type: CHECK_PROCESSED, payload: request }); // for updating the redux state value for uploaded
        }).catch(error => {
            //console.log('error of uploadData')
            //console.log(error)
        });
    }
}
