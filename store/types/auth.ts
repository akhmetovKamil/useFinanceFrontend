export interface IAuthState {
    isAuth: boolean,
    isFetching: boolean,
    error: string
}
export interface receivedData{
    access_token: string,
    refresh_token: string
}

export enum AuthActionsConst{
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REFRESH = "REFRESH",
    FETCH_DATA = "FETCH_DATA",
    ERROR = "ERROR"
}

interface registerAction {
    type: AuthActionsConst.REGISTER,
    payload: boolean
}
interface loginAction {
    type: AuthActionsConst.LOGIN
}
interface logoutAction {
    type: AuthActionsConst.LOGOUT
}
interface refreshAction {
    type: AuthActionsConst.REFRESH
}
interface fetchDataAction {
    type: AuthActionsConst.FETCH_DATA,
    payload: boolean
}
interface errorAction {
    type: AuthActionsConst.ERROR,
    payload: string
}
export type AuthActions = registerAction | loginAction | logoutAction | refreshAction | fetchDataAction | errorAction