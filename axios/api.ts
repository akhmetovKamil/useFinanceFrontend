import axios from "axios";

const base = axios.create({
    baseURL: 'http://localhost:3002/api/auth'
});
interface registerDTO{
    email: string,
    name: string,
    password: string
}
export const authApi = {
    register(obj : registerDTO){
        return base.post("register",{
            email: obj.email,
            password: obj.password,
            name: obj.name
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