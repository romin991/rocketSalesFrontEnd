import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getMemberships() {
    return axios.get(`${apiUrl}/memberships/`, {headers: {Authorization: cookieAuthToken()}});
}

export function editMembership(data) {
    return axios.put(`${apiUrl}/memberships/${data.id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function deleteMembership(data) {
    return axios.delete(`${apiUrl}/memberships/${data.id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function createMembership(data) {
    return axios.post(`${apiUrl}/memberships/`, data, {headers: {Authorization: cookieAuthToken()}});
}
