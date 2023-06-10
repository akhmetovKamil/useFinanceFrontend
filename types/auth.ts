import {AuthActionsConst} from "@/types/constants";

export interface AuthDto {
    email: string,
    name?: string,
    password: string
}

export interface IAuthState {
    isAuth: boolean,
    authIsFetching: boolean,
    error: string,
    isCheckingAuth: boolean
}

export interface receivedTokens {
    access_token: string,
    refresh_token: string
}

interface registerAction { type: AuthActionsConst.REGISTER, payload: boolean }
interface loginAction { type: AuthActionsConst.LOGIN }
interface logoutAction { type: AuthActionsConst.LOGOUT }
interface refreshAction { type: AuthActionsConst.REFRESH }
interface fetchDataAction { type: AuthActionsConst.FETCH_DATA, payload: boolean }
interface errorAction { type: AuthActionsConst.ERROR, payload: string }
interface checkAuthAction { type: AuthActionsConst.CHECK_AUTH, payload: boolean }
export type AuthActions = registerAction | loginAction | logoutAction | refreshAction | fetchDataAction | errorAction | checkAuthAction