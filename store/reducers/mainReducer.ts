import {Errors, MainActionsConst} from "@/types/constants";
import {IMainState, MainActions} from "@/types/main";
import {TypedDispatch, TypedThunk} from "@/store/store";
import {AxiosResponse} from "axios";
import {mainApi} from "@/axios/main";
import {logoutWithErrorThunk} from "@/store/reducers/authReducer";


export const initialState: IMainState = {
    isFetching:false,
    error: "",
    balance:0
}
export default function mainReducer(state = initialState, action: any): IMainState {
    if (!action) return state;

    switch (action.type) {
        case MainActionsConst.GET_BALANCE:
            return {...state,balance: action.payload}
        case MainActionsConst.FETCH_DATA:
            return {...state,isFetching: action.payload}
        case MainActionsConst.ERROR:
            return {...state,error: action.payload}
        default:
            return state
    }
}

export const setBalance = (amount: number): MainActions => ({type:MainActionsConst.GET_BALANCE,payload: amount})
export const setFetching = (isFetching: boolean): MainActions => ({type:MainActionsConst.FETCH_DATA,payload: isFetching})
export const setError = (error: string): MainActions => ({type:MainActionsConst.ERROR,payload: error})

export const getBalanceThunk = (): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true))
    mainApi.getBalance().then((data: AxiosResponse<number>) => {
        dispatch(setBalance(data.data))
        dispatch(setFetching(false))
    }).catch(e => {
        if (e == Errors.NOT_AUTHORIZED) dispatch(logoutWithErrorThunk()) //При каждой ошибке NOT_AUTHORIZED надо диспатчить этот экшен
        dispatch(setError(e))
        dispatch(setFetching(false))
    })
}