import axios from 'axios';

export function sendImage(meta, file) {
    const data = new FormData();
    data.append('upload_preset', meta.preset);
    data.append('file', file);
    return axios.post(`https://${meta.endpoint}`, data);
}
