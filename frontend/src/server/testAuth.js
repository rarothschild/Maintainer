import axios from 'axios';
import { createCookieSessionStorage } from "solid-start/session";

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})

const email = 'a@a.com';
const passwrod = 'test'

const tokens = await axiosInstance.post('/token/', {
                                    email: email,
                                    password: passwrod
                                }).then((res) => res.data)

console.log(email)