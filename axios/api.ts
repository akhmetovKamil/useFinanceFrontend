import axios from "axios";
import {AuthorizationDto, receivedData} from "@/types/auth";
import {Errors} from "@/types/constants";

const base = axios.create({
    baseURL: 'http://localhost:3002/api/auth'
});

export const authApi = {
    register(obj : AuthorizationDto): Promise<axios.AxiosResponse<receivedData> | void>{
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
                Authorization: `Bearer ${obj.access_token}`
            }
        }).then(response => response.data)
    },
    refresh(obj){
        return base.post("refresh",{
            headers:{
                Authorization: `Bearer ${obj.refresh_token}`
            }
        }).then(response => response.data)
    },
}