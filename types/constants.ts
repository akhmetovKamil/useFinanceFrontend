export enum Errors{
    USER_NOT_FOUND = 'Пользователь с таким email или паролем не найден!',
    ALREADY_REGISTERED = 'Пользователь с таким email уже зарегестрирован!',
    NOT_AUTHORIZED = 'Пользователь не авторизован!',
    CONNECTION_ERROR = 'Ошибка подключения к серверу',
    SERVER_ERROR = 'Ошибка на сервере 404',
    UNEXPECTED_ERROR = 'Неизвестная ошибка'
}
export enum AuthActionsConst {
    REGISTER = "auth/REGISTER",
    LOGIN = "auth/LOGIN",
    LOGOUT = "auth/LOGOUT",
    REFRESH = "auth/REFRESH",
    FETCH_DATA = "auth/FETCH_DATA",
    ERROR = "auth/ERROR"
}
export enum MainActionsConst {
    GET_BALANCE = "main/GET_BALANCE",
    FETCH_DATA = "main/FETCH_DATA",
    ERROR = "main/ERROR"
}