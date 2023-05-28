import {authApi} from "@/axios/api";

const REGISTER = "REGISTER"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const REFRESH = "REFRESH"

export const initialState = {
    isAuth: false,
}

interface receivedData{
    accessToken: string,
    refreshToken: string

}

export default function authReducer(state = initialState, action) {
    if (!action) return state;

    switch (action.type) {
        case REGISTER:
            // console.log(action.payload.accessToken)
            return {...state,isAuth: true}
        default:
            return state
    }
}

export const setRegister = (isAuth) => ({type:REGISTER,payload: isAuth})

export const register = (obj) => {
    return dispatch => {
        console.log("register authReducer",obj)
        const data: receivedData = authApi.register(obj).then(data => {
            console.log(data)
            dispatch(setRegister(true))
        })
    }
}