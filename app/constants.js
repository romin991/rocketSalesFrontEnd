import cookie from 'react-cookie';

let tempApiUrl = 'http://localhost:8000';

if(process.env.NODE_ENV === 'production') {
    if(process.env.PIPELINE_ENV === 'development') {
        tempApiUrl = 'http://localhost:8000';
    } else if(process.env.PIPELINE_ENV === 'production') {
        tempApiUrl = 'http://localhost:8000';
    }
}

export const apiUrl = tempApiUrl;
export function cookieAuthToken() {return cookie.load('authToken');}
export function removeCookieAuthToken() {return cookie.remove('authToken');}
export const LEAD = 'LEAD';
export const ACCOUNT = 'ACCOUNT';
export const CONTACT = 'CONTACT';
export const DEAL = 'DEAL';
