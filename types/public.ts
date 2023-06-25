import { PublicActionsConst } from "./constants";

export interface PublicData {
  usersCount: number;
  totalBalance: number;
  totalDebtsToMe: number;
  totalMyDebts: number;
}

export interface IPublicState extends PublicData {
  isFetching: boolean;
}

interface getPublicDataAction {
  type: PublicActionsConst.GET_PUBLICDATA;
  payload: PublicData;
}
interface setFetchinAction {
  type: PublicActionsConst.FETCH_DATA;
  payload: boolean;
}

export type PublicActions = getPublicDataAction | setFetchinAction;
