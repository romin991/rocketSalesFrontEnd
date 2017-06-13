import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getContactsList(listType, userId, page) {
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

    return axios.get(`${apiUrl}/customers/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function createNewContact(data) {
    return axios.post(`${apiUrl}/customers/`, data, {headers: {Authorization: cookieAuthToken()}});
}
