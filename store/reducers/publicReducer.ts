import { PublicActionsConst } from "@/types/constants";
import { IPublicState, PublicActions, PublicData } from "@/types/public";
import { TypedDispatch, TypedThunk } from "../store";
import { publicApi } from "@/axios/public";
import { AxiosResponse } from "axios";

export const initialState: IPublicState = {
  isFetching: false,
  usersCount: 0,
  totalBalance: 0,
  totalDebtsToMe: 0,
  totalMyDebts: 0,
};
export default function publicReducer(
  state = initialState,
  action: any
): IPublicState {
  if (!action) return state;
  switch (action.type) {
    case PublicActionsConst.GET_PUBLICDATA:
      return { ...state, ...action.payload };
    case PublicActionsConst.FETCH_DATA:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
}

export const setFetching = (isFetching: boolean): PublicActions => ({
  type: PublicActionsConst.FETCH_DATA,
  payload: isFetching,
});
export const setPublicData = (publicData: PublicData): PublicActions => ({
  type: PublicActionsConst.GET_PUBLICDATA,
  payload: {
    usersCount: publicData.usersCount,
    totalBalance: publicData.totalBalance,
    totalMyDebts: publicData.totalMyDebts,
    totalDebtsToMe: publicData.totalDebtsToMe,
  },
});

export const getPublicDataThunk =
  (): TypedThunk => (dispatch: TypedDispatch) => {
    dispatch(setFetching(true));
    publicApi.getPublicData().then((data: AxiosResponse<PublicData>) => {
      dispatch(setPublicData(data.data));
      dispatch(setFetching(false));
    });
  };
