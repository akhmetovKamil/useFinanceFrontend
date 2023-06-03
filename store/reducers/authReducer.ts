import {authApi} from "@/axios/auth";
import {AuthActions, AuthorizationDto, IAuthState, receivedData} from "@/types/auth";
import {AuthActionsConst} from "@/types/constants";
import {AxiosResponse} from "axios";
import {Errors} from "@/types/constants";
import {TypedDispatch, TypedThunk} from "@/store/store";


export const initialState: IAuthState = {
    isAuth: false,
    isFetching: false,
    error: ""
}
export default function authReducer(state = initialState, action: any): IAuthState {
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

export const setRegister = (isAuth: boolean): AuthActions => ({type:AuthActionsConst.REGISTER,payload: isAuth})
export const setFetching = (isFetching: boolean): AuthActions => ({type:AuthActionsConst.FETCH_DATA,payload: isFetching})
export const setError = (error: string): AuthActions => ({type:AuthActionsConst.ERROR,payload: error})

export const registerThunk = (obj: AuthorizationDto): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true))
    authApi.register(obj).then((data: AxiosResponse<receivedData>) => {
        const {refresh_token,access_token} = data.data
        dispatch(setFetching(false))
        dispatch(setRegister(true))
        localStorage.setItem("refresh_token",refresh_token)
        localStorage.setItem("access_token",access_token)
    }).catch((e) => {
        switch (e){
            case Errors.ALREADY_REGISTERED:
                console.log("then",e)
                dispatch(setError(e))
                return
            case Errors.SERVER_ERROR:
                console.log("then",e)
                return
            case Errors.CONNECTION_ERROR:
                console.log("then",e)
                return
            case Errors.UNEXPECTED_ERROR:
                console.log("then",e)
                return
        }
    })
}
