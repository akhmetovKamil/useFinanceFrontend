import {AuthActionsConst, MainActionsConst} from "@/types/constants";


export interface IMainState {
    isFetching: boolean,
    error: string,
    balance: number
}


interface setBalanceAction { type: MainActionsConst.GET_BALANCE, payload: number }
interface fetchDataAction { type: MainActionsConst.FETCH_DATA, payload: boolean }
interface errorAction { type: MainActionsConst.ERROR, payload: string }


export type MainActions = setBalanceAction | fetchDataAction | errorAction