import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';
import moment from 'moment';

export function getMeetingsList(listType, userId, page) {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O', start_time_gte: currentDate};
            break;
        case 'closed':
            params = {status: 'C', start_time_lt: currentDate};
            break;
        case 'my-open':
            params = {employee: userId, status: 'O', start_time_gte: currentDate};
            break;
        case 'my-closed':
            params = {employee: userId, status: 'C', start_time_lt: currentDate};
            break;
        default:
            params = {};
            break;
    }

    params.page = page || 1;

    return axios.get(`${apiUrl}/events/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function createNewMeeting(data) {
    return axios.post(`${apiUrl}/events/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getMeetingContacts(meetingId) {
    return axios.get(`${apiUrl}/events/${meetingId}/contacts/`, {headers: {Authorization: cookieAuthToken()}});
}

export function getMeetingAccounts(meetingId) {
    return axios.get(`${apiUrl}/events/${meetingId}/companies/`, {headers: {Authorization: cookieAuthToken()}});
}
