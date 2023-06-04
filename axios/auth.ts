import {AuthDto, receivedTokens} from "@/types/auth";
import {AxiosResponse} from "axios";
import {base} from "@/axios/base";


export const authApi = {
    register(obj : AuthDto): Promise< AxiosResponse<receivedTokens> >{
        return base.post("/auth/register",{
            email: obj.email,
            password: obj.password,
            name: obj.name
        })
    },
    login(obj: AuthDto): Promise< AxiosResponse<receivedTokens> >{
        return base.post("/auth/login",{
            email: obj.email,
            password: obj.password
        })
    },
    async refresh(){
        const refresh_token = await localStorage.getItem("refresh_token")
        return base.post("/auth/refresh",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`
            }
        }).then(data => data.data.access_token)
    },
    logout(){
        return base.post("/auth/logout")
    }
}