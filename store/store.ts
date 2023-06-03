import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {AnyAction} from "redux";
import {combineReducers} from "redux";
import authReducer from "@/store/reducers/authReducer";


const rootReducer = combineReducers({
    auth: authReducer
})

export const makeStore = () =>  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
})


export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

