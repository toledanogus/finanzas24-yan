import axios from 'axios';

export const banamexApi = axios.create({
    baseURL: './php'
})