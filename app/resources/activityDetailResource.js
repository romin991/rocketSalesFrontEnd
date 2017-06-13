import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';


export function getEventDetail(id) {
    return axios.get(`${apiUrl}/events/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function getEventDetailNotes(id) {
    return axios.get(`${apiUrl}/events/${id}/notes/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateEvent(id, data) {
    return axios.put(`${apiUrl}/events/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getTaskDetail(id) {
    return axios.get(`${apiUrl}/tasks/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function getTaskDetailNotes(id) {
    return axios.get(`${apiUrl}/tasks/${id}/notes/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateTask(id, data) {
    return axios.put(`${apiUrl}/tasks/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function createActivityNote(data) {
    return axios.post(`${apiUrl}/notes/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getLeadDetailNotes(id) {
    return axios.get(`${apiUrl}/leads/${id}/notes/`, {headers: {Authorization: cookieAuthToken()}});
}
