import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getEmployeesList() {
    return axios.get(`${apiUrl}/employees/`, {headers: {Authorization: cookieAuthToken()}});
}

export function saveEmployeeChanges(data, id) {
    return axios.put(`${apiUrl}/employees/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}
