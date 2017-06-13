import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getAccountsList(listType, userId, page) {
    let params;
    switch (listType) {
        case 'my':
            params = {employee: userId};
            break;
        default:
            params = {};
            break;
    }

    params.page = page || 1;

    return axios.get(`${apiUrl}/companies/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function createNewAccount(data) {
    return axios.post(`${apiUrl}/companies/`, data, {headers: {Authorization: cookieAuthToken()}});
}
