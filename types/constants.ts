export enum Errors{
    USER_NOT_FOUND = 'Пользователь с таким email или паролем не найден!',
    ALREADY_REGISTERED = 'Пользователь с таким email уже зарегестрирован!',
    CONNECTION_ERROR = 'Ошибка подключения к серверу',
    SERVER_ERROR = 'Ошибка на сервере 404',
    UNEXPECTED_ERROR = 'Неизвестная ошибка'
}
export enum AuthActionsConst {
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REFRESH = "REFRESH",
    FETCH_DATA = "FETCH_DATA",
    ERROR = "ERROR"
}