import {AuthorizationDto, receivedData} from "@/types/auth";
import {AxiosResponse} from "axios/index";
import {Errors} from "@/types/constants";
import {base,refresh_Token} from "@/axios/base";


export const authApi = {
    register(obj : AuthorizationDto): Promise< AxiosResponse<receivedData> >{
        return base.post("/auth/register",{
            email: obj.email,
            password: obj.password,
            name: obj.name
        })
        //     .then(data => data).catch(e => {
        //     console.log("catch - ", e)
        //     switch (e.code){
        //         case "ERR_NETWORK":
        //             throw Errors.CONNECTION_ERROR
        //         case "ERR_BAD_REQUEST":
        //             if (e.response.status == 400) throw Errors.ALREADY_REGISTERED
        //             throw Errors.SERVER_ERROR
        //         default:
        //             throw Errors.UNEXPECTED_ERROR
        //     }
        // })
    },
    getBalance(){
        return base.get("/balance/get").then(data => data.data).catch(e => e)
    },
    async refresh(){
        const refresh_token = await localStorage.getItem("refresh_token")
        return base.post("/auth/refresh",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`
            }
        }).then(data => data.data.access_token)
    }
    // login(obj){
    //     return base.post("login",{
    //         email: obj.email,
    //         password: obj.password
    //     }).then(response => response.data)
    // },
    // logout(obj){
    //     return base.post("logout",{
    //         headers:{
    //             Authorization: `Bearer ${obj.access_token}`
    //         }
    //     }).then(response => response.data)
    // },
}