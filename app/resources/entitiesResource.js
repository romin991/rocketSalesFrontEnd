import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';
import jwtDecode from 'jwt-decode';

export function getEntity() {
    const decode = jwtDecode(cookieAuthToken());
    return axios.get(`${apiUrl}/entities/${decode.entity_id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function editEntity(data) {
    const decode = jwtDecode(cookieAuthToken());
    return axios.put(`${apiUrl}/entities/${decode.entity_id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getEntitiesSummary() {
    const decode = jwtDecode(cookieAuthToken());
    return axios.get(`${apiUrl}/entities/${decode.entity_id}/summary/`, {headers: {Authorization: cookieAuthToken()}});
}
