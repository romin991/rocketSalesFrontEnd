import axios from 'axios';
import { apiUrl } from '../constants';

export function signUp(data) {
    return axios.post(`${apiUrl}/register/`, data);
}

export function signIn(data) {
    return axios.post(`${apiUrl}/login/`, data);
}

export function passwordReset(data) {
    return axios.post(`${apiUrl}/register/reset/`, data);
}

export function sync(data) {
    return axios.get(`${apiUrl}/sync/`, {headers: {Authorization: data}});
}
