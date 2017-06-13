import axios from 'axios';
import { apiUrl, cookieAuthToken } from '../constants';

export function getLeadDetail(id) {
    return axios.get(`${apiUrl}/leads/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateLead(id, data) {
    return axios.put(`${apiUrl}/leads/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function convertLead(id) {
    return axios.post(`${apiUrl}/leads/${id}/convert/`, {}, {headers: {Authorization: cookieAuthToken()}});
}

export function getLeadDetailTasks(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/leads/${id}/tasks/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getLeadDetailMeetings(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/leads/${id}/events/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getContactDetail(id) {
    return axios.get(`${apiUrl}/customers/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateContact(id, data) {
    return axios.put(`${apiUrl}/customers/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getContactDetailTasks(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/customers/${id}/tasks/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getContactDetailMeetings(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/customers/${id}/events/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getContactDetailDeals(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'won':
            params = {status: 'CW'};
            break;
        case 'lost':
            params = {status: 'CL'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/customers/${id}/deals/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getAccountDetail(id) {
    return axios.get(`${apiUrl}/companies/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function updateAccount(id, data) {
    return axios.put(`${apiUrl}/companies/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getAccountDetailTasks(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/companies/${id}/tasks/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getAccountDetailMeetings(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/companies/${id}/events/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getAccountDetailDeals(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'won':
            params = {status: 'CW'};
            break;
        case 'lost':
            params = {status: 'CL'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/companies/${id}/deals/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function getDealDetail(id) {
    return axios.get(`${apiUrl}/deals/${id}/`, {headers: {Authorization: cookieAuthToken()}});
}

export function getDealDetailTasks(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'progress':
            params = {status: 'P'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/deals/${id}/tasks/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}

export function updateDeal(id, data) {
    return axios.put(`${apiUrl}/deals/${id}/`, data, {headers: {Authorization: cookieAuthToken()}});
}

export function getDealDetailMeetings(id, listType) {
    let params;
    switch (listType) {
        case 'open':
            params = {status: 'O'};
            break;
        case 'closed':
            params = {status: 'C'};
            break;
        default:
            params = {};
            break;
    }
    return axios.get(`${apiUrl}/deals/${id}/events/`, {headers: {Authorization: cookieAuthToken()}, params: params});
}
