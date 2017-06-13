import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getTasksList(listType, userId, page) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        case 'my':
            params = {employee: userId};
            break;
        case 'my-open':
            params = {employee: userId, status: 'O'};
            break;
        case 'my-closed':
            params = {employee: userId, status: 'C'};
            break;
        default:
            params = {};
            break;
    }

    params.page = page || 1;

    return axios.get(`${apiUrl}/tasks/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}


export function createNewTask(data) {
    return axios.post(`${apiUrl}/tasks/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getTaskContacts(taskId) {
    return axios.get(`${apiUrl}/tasks/${taskId}/contacts/`, {headers: {Authorization: cookieAuthToken()}});
}

export function getTaskAccounts(taskId) {
    return axios.get(`${apiUrl}/tasks/${taskId}/companies/`, {headers: {Authorization: cookieAuthToken()}});
}
