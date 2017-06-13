import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getLeadsList(data, page) {
    data.page = page || 1;

    return axios.get(`${apiUrl}/leads/`, {headers: {Authorization: cookieAuthToken()}, params: data});
}

export function createNewLead(data) {
    return axios.post(`${apiUrl}/leads/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getLeadsSummary() {
    return axios.get(`${apiUrl}/leads/summary/`, {headers: {Authorization: cookieAuthToken()}});
}
