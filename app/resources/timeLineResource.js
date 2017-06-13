import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getTimeLine(id, listType) {
    return axios.get(`${apiUrl}/${listType}/${id}/timelines/`, {headers: {Authorization: cookieAuthToken()}});
}
