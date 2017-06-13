import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getNotes(id, listType) {
    return axios.get(`${apiUrl}/${listType}/${id}/notes/`, {headers: {Authorization: cookieAuthToken()}});
}

export function addNote(data) {
    return axios.post(`${apiUrl}/notes/`, data, {headers: {Authorization: cookieAuthToken()}});
}
