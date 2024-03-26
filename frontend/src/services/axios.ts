import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : 'http://j10a203.p.ssafy.io:8010/',
    headers : {
        'Content-Type' : 'application/json',
    }
})

