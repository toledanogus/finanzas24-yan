import axios from 'axios';

export const registroBanamexApi = axios.create({
    baseURL: './php'
})