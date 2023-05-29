import thunk from "redux-thunk";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

export const makeStore = () =>  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
})

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
