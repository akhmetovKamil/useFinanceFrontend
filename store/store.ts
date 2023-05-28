import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {initialState} from "@/store/reducers/authReducer";

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        initialState: initialState,
        middleware: [thunk],
    });

    return store;
};

export const wrapper = createWrapper(makeStore);
