import axios from "axios";
import {receivedData} from "@/store/types/auth";
import {Errors} from "@/store/constants";

const base = axios.create({
    baseURL: 'http://localhost:3002/api/auth'
});
export interface AuthDto {
    email: string,
    name?: string,
    password: string
}
export type errorResponse =  Errors.CONNECTION_ERROR | Errors.ALREADY_REGISTERED | Errors.SERVER_ERROR | Errors.UNEXPECTED_ERROR;

export const authApi = {
    register(obj : AuthDto): Promise<axios.AxiosResponse<receivedData> | void>{
        return base.post("register",{
            email: obj.email,
            password: obj.password,
            name: obj.name
        }).then(data => data).catch(e => {
            switch (e.code){
                case "ERR_NETWORK":
                    throw Errors.CONNECTION_ERROR
                case "ERR_BAD_REQUEST":
                    if (e.response.status == 400) throw Errors.ALREADY_REGISTERED
                    throw Errors.SERVER_ERROR
                default:
                    throw Errors.UNEXPECTED_ERROR
            }
        })
    },
    login(obj){
        return base.post("login",{
            email: obj.email,
            password: obj.password
        }).then(response => response.data)
    },
    logout(obj){
        return base.post("logout",{
            headers:{
                Authorization: obj.accessToken
            }
        }).then(response => response.data)
    },
    refresh(obj){
        return base.post("refresh",{
            headers:{
                Authorization: obj.refreshToken
            }
        }).then(response => response.data)
    },
}