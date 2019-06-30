import axios from 'axios';
import { checkUploaded, checkProcessed, CHECK_UPLOADED, CHECK_PROCESSED } from './actions_user_data'
import { GET_USER_FREQ_STATS, GET_SENTIMENT_STATS, GET_CHAT_FREQ_STATS, GET_WORDLE_STATS, GET_TOPFRIENDS_STATS, GET_CRUD_STATS } from './actions_stats'

const ME_API_URL = `http://127.0.0.1:5000/api/`;

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_NAME = 'SET_NAME';
export const DELETE = 'DELETE';

// action creator
export function signUp(userId, name) {
    const url = `${ME_API_URL}signup/${userId}/${name}`;
    const request = axios.post(url); // returns a promise to be stored in `request`
    //console.log('creating and sending signUp action')

    return (dispatch) => {
        dispatch({ type: SIGN_UP, payload: request });
        dispatch({ type: SET_USER_ID, payload: userId });
        dispatch({ type: SET_NAME, payload: name });
    }
}

export function logIn(userId, name) {
    const url = `${ME_API_URL}login/${userId}`;
    const request = axios.put(url); // returns a promise to be stored in `request`

    return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            // Log in successful.
            //console.log('result of log in')
            //console.log(result)
            dispatch({ type: LOG_IN, payload: result });
            dispatch({ type: SET_USER_ID, payload: userId });
            dispatch({ type: SET_NAME, payload: name });
            dispatch(checkUploaded(userId));
            dispatch(checkProcessed(userId));
        }).catch(error => {
            // No user found with that userId, so sign up.
            //console.log('error of log in')
            //console.log(error)
            dispatch(signUp(userId, name))
        });
    }
}

export function logOut(userId, name) {
    //console.log('in log out action creator')
    const url = `${ME_API_URL}logout/${userId}`;
    const request = axios.put(url); // returns a promise to be stored in `request`

    return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            // Log out successful.
            //console.log('result of log out')
            //console.log(result)
            // clearing redux state
            dispatch({ type: LOG_IN, payload: {status: 404} });
            dispatch({ type: SET_USER_ID, payload: null });
            dispatch({ type: SET_NAME, payload: null });
            dispatch({ type: CHECK_UPLOADED, payload: {status: 404} });
            dispatch({ type: CHECK_PROCESSED, payload: {status: 404} });
            dispatch({ type: GET_USER_FREQ_STATS, payload: {status: 404} });
            dispatch({ type: GET_SENTIMENT_STATS, payload: {status: 404} });
            dispatch({ type: GET_CHAT_FREQ_STATS, payload: {status: 404} });
			dispatch({ type: GET_WORDLE_STATS, payload: {status: 404} });
			dispatch({ type: GET_TOPFRIENDS_STATS, payload: {status: 404} });
			dispatch({ type: GET_CRUD_STATS, payload: {status: 404} });



        }).catch(error => {
            // No user found with that userId, so sign up.
            //console.log('error of log in')
            //console.log(error)
        });
    }
}

export function deleteUser(userId) {
    const url = `${ME_API_URL}delete/${userId}`;
    console.log('deleteUser action creator')
    //console.log(url)
    const request = axios.delete(url); // returns a promise to be stored in `request`
	return (dispatch) => {
        request.then(result => { // `result` is the resolved promise
            // Log out successful.
            console.log('result of deleteUser')
            console.log(result)
            // clearing redux state
            dispatch({ type: LOG_IN, payload: {status: 404} });
            dispatch({ type: SET_USER_ID, payload: null });
            dispatch({ type: SET_NAME, payload: null });
            dispatch({ type: CHECK_UPLOADED, payload: {status: 404} });
            dispatch({ type: CHECK_PROCESSED, payload: {status: 404} });
            dispatch({ type: GET_USER_FREQ_STATS, payload: {status: 404} });
            dispatch({ type: GET_SENTIMENT_STATS, payload: {status: 404} });
            dispatch({ type: GET_CHAT_FREQ_STATS, payload: {status: 404} });
			dispatch({ type: GET_WORDLE_STATS, payload: {status: 404} });
			dispatch({ type: GET_TOPFRIENDS_STATS, payload: {status: 404} });
			dispatch({ type: GET_CRUD_STATS, payload: {status: 404} });



        }).catch(error => {
            // No user found with that userId, so sign up.
            console.log('error of delete')
            //console.log(error)
        });
    }
}
