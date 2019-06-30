import axios from 'axios';

const ME_API_URL = `http://127.0.0.1:5000/api/`;

export const GET_USER_FREQ_STATS = 'GET_USER_FREQ_STATS';
export const GET_SENTIMENT_STATS = 'GET_SENTIMENT_STATS';
export const GET_CHAT_FREQ_STATS = 'GET_CHAT_FREQ_STATS';
export const GET_CRUD_STATS = 'GET_CRUD_STATS';
export const GET_TOPFRIENDS_STATS = 'GET_TOPFRIENDS_STATS';
export const GET_WORDLE_STATS = 'GET_WORDLE_STATS';

export function getUserFreqStats(userId, friend) {
    const url = `${ME_API_URL}user-freq-stats/${userId}?sender=${friend}&date=2007-01-01`;
    const request = axios.get(url); // returns a promise to be stored in `request`

    return {
        type: GET_USER_FREQ_STATS,
        payload: request
    }
}

export function getSentimentStats(userId, friend) {
    const url = `${ME_API_URL}get-sentiment-stat/${userId}?sender=${friend}&date=2007-01-01`;
    //console.log('getSentimentStats url')
    //console.log(url)
    const request = axios.get(url); // returns a promise to be stored in `request`

    return {
        type: GET_SENTIMENT_STATS,
        payload: request
    }
}

export function getChatFreqStats(userId, friend) {
    const url = `${ME_API_URL}chat-freq-stats/${userId}?sender=${friend}`;
    //console.log('getChatFreqStats url')
    //console.log(url)
    const request = axios.get(url); // returns a promise to be stored in `request`

    return {
        type: GET_CHAT_FREQ_STATS,
        payload: request
    }
}

export function getCrudStats(userId) {
    const url = `${ME_API_URL}get-crud-stats/${userId}`;
    console.log('get crud stats')
    console.log(url)
    const request = axios.get(url); // returns a promise to be stored in `request`
    return {
        type: GET_CRUD_STATS,
        payload: request
    }
}


export function getTopFriendsStats(userId) {
    const url = `${ME_API_URL}get-topfriends-stats/${userId}`;
    //console.log('get crud stats')
    //console.log(url)
    const request = axios.get(url); // returns a promise to be stored in `request`
    return {
        type: GET_TOPFRIENDS_STATS,
		payload: request
    }
}

export function getWordleStats(userId, friend) {
    const url = `${ME_API_URL}wordle/${userId}?sender=${friend}`;
    //console.log('get wordle stats')
    //console.log(url)
    const request = axios.get(url); // returns a promise to be stored in `request`
    return {
        type: GET_WORDLE_STATS,
        payload: request
    }
}
