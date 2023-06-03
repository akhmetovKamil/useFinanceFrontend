import axios from "axios";
import {Errors} from "@/types/constants";
import {authApi} from "@/axios/auth";

export const refresh_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3MTI0ZXQyM2p3dEBnbWFpbC5jb20iLCJpYXQiOjE2ODU4MjI5ODcsImV4cCI6MTY4NjQyNzc4N30.H1FCGHbYFXVWaGH0Yo-Ry0fH9Odsj-rS8HvcrBMlQKY"
const access_Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3MTI0ZXQyM2p3dEBnbWFpbC5jb20iLCJpYXQiOjE2ODU4MTg2NzYsImV4cCI6MTY4NTgxODY5MX0.TbuQ9Zs5pPdnAbPyBusyzhyDFvQw6gNnWxwrKYQLzGQ"


export const base = axios.create({
    baseURL: 'http://localhost:3002/api'
});

// interceptor eject, clear

base.interceptors.request.use(async config => {
    const access_token = await localStorage.getItem("access_token")
    console.log("inside request before", config.url)
    if (config.url == "/auth/register" || config.url == "/auth/refresh") {
        return config
    }
    return {
        ...config, headers: {
            ...config.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }
})

base.interceptors.response.use(
    response => {
        console.log("interceptor success - ", response);
        return response
    },
    async error => {
        console.log("interceptor error - ", error);
        if (error.response && error.response.status == 401) {
            if (error.config.url != "/auth/refresh") {
                const access_token = await authApi.refresh()
                await localStorage.setItem("access_token", access_token)
                return axios.request({
                    ...error.config, headers: {
                        ...error.config.headers,
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                })
            }
        }
        return Promise.reject(error);
    }
)

// switch (e.code) {
//     case "ERR_NETWORK":
//         throw Errors.CONNECTION_ERROR
//     case "ERR_BAD_REQUEST":
//         if (e.response.status == 400) throw Errors.ALREADY_REGISTERED
//         throw Errors.SERVER_ERROR
//     default:
//         throw Errors.UNEXPECTED_ERROR
// }
// return Promise.reject(error);


