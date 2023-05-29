import {authApi, AuthDto, errorResponse, registerResponse} from "@/axios/api";
import {AuthActions, AuthActionsConst, IAuthState, receivedData} from "@/store/types/auth";
import {Dispatch} from "redux";
import axios from "axios";
import {Errors} from "@/store/constants";


export const initialState: IAuthState = {
    isAuth: false,
    isFetching: false,
    error: ""
}
export default function authReducer(state = initialState, action: AuthActions): IAuthState {
    if (!action) return state;

    switch (action.type) {
        case AuthActionsConst.REGISTER:
            return {...state,isAuth: action.payload}
        case AuthActionsConst.FETCH_DATA:
            return {...state,isFetching: action.payload}
        case AuthActionsConst.ERROR:
            return {...state,error: action.payload}
        default:
            return state
    }
}

export const setRegister = (isAuth): AuthActions => ({type:AuthActionsConst.REGISTER,payload: isAuth})
export const setFetching = (isFetching): AuthActions => ({type:AuthActionsConst.FETCH_DATA,payload: isFetching})
export const setError = (error): AuthActions => ({type:AuthActionsConst.ERROR,payload: error})

export const registerThunk = (obj: AuthDto) => (dispatch: Dispatch<AuthActions>) => {
    dispatch(setFetching(true))
    authApi.register(obj).then((data: axios.AxiosResponse<receivedData>) => {
        const {refresh_token,access_token} = data.data
        dispatch(setFetching(false))
        dispatch(setRegister(true))
        localStorage.setItem("refresh_token",refresh_token)
        localStorage.setItem("access_token",access_token)
    }).catch((e) => {
        switch (e){
            case Errors.ALREADY_REGISTERED:
                console.log("already",e)
                return
            case Errors.SERVER_ERROR:
                console.log("already",e)
                return
            case Errors.CONNECTION_ERROR:
                console.log("already",e)
                return
            case Errors.UNEXPECTED_ERROR:
                console.log("already",e)
                return
        }
    })

        // .catch(e => {
        //
        //     console.log("second catch",e)
        //     dispatch(setError(e))
        // })
}