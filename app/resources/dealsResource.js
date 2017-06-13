import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getDealsList(listType, userId, page) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'won':
            params = {status: 'CW'};
            break;
        case 'lost':
            params = {status: 'CL'};
            break;
        case 'my':
            params = {employee: userId};
            break;
        case 'my-open':
            params = {employee: userId, status: 'O'};
            break;
        case 'my-progress':
            params = {employee: userId, status: 'P'};
            break;
        case 'my-won':
            params = {employee: userId, status: 'CW'};
            break;
        case 'my-closed':
            params = {employee: userId, status: 'CL'};
            break;
        default:
            params = {};
            break;
    }
    params.page = page || 1;

    return axios.get(`${apiUrl}/deals/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function createNewDeal(data) {
    return axios.post(`${apiUrl}/deals/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getDealsSummary() {
    return axios.get(`${apiUrl}/deals/summary/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateDeal(id, data) {
    return axios.put(`${apiUrl}/deals/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}
