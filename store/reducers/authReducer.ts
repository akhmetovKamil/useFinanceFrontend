import {authApi} from "@/axios/auth";
import {AuthActions, AuthDto, IAuthState, receivedTokens} from "@/types/auth";
import {AuthActionsConst} from "@/types/constants";
import {AxiosResponse} from "axios";
import {TypedDispatch, TypedThunk} from "@/store/store";


export const initialState: IAuthState = {
    isAuth: false,
    authIsFetching: false,
    error: ""
}
export default function authReducer(state = initialState, action: any): IAuthState {
    if (!action) return state;

    switch (action.type) {
        case AuthActionsConst.REGISTER:
            return {...state, isAuth: action.payload}
        case AuthActionsConst.FETCH_DATA:
            return {...state, authIsFetching: action.payload}
        case AuthActionsConst.ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}


export const setAuth = (isAuth: boolean): AuthActions => ({type: AuthActionsConst.REGISTER, payload: isAuth})
export const setFetching = (isFetching: boolean): AuthActions => ({
    type: AuthActionsConst.FETCH_DATA,
    payload: isFetching
})
export const setError = (error: string): AuthActions => ({type: AuthActionsConst.ERROR, payload: error})

export const registerThunk = (obj: AuthDto): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true))
    authApi.register(obj).then((data: AxiosResponse<receivedTokens>) => {
        const {refresh_token, access_token} = data.data
        dispatch(setFetching(false))
        dispatch(setAuth(true))
        localStorage.setItem("refresh_token", refresh_token)
        localStorage.setItem("access_token", access_token)
    }).catch(e => {
        dispatch(setFetching(false))
        dispatch(setError(e))
    })
}
export const loginThunk = (obj: AuthDto): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true))
    authApi.login(obj).then((data: AxiosResponse<receivedTokens>) => {
        const {refresh_token, access_token} = data.data
        dispatch(setFetching(false))
        dispatch(setAuth(true))
        localStorage.setItem("refresh_token", refresh_token)
        localStorage.setItem("access_token", access_token)
    }).catch(e => {
        dispatch(setFetching(false))
        dispatch(setError(e))
    })
}
export const logoutThunk = (): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true))
    authApi.logout().then(() => {
        dispatch(setFetching(false))
        dispatch(setAuth(false))
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
    }).catch(e => {
        dispatch(setFetching(false))
        dispatch(setError(e))
    })
}

export const logoutWithErrorThunk = (): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setAuth(false))
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

}
