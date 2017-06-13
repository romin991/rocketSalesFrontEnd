import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function importFile(file, pageLabel) {
    const data = new FormData();
    data.append('file', file);
    return axios.post(`${apiUrl}/${pageLabel}-import/`, data, {headers: {Authorization: cookieAuthToken()}});
}
