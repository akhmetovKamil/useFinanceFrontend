import {useDispatch} from "react-redux";
import {TypedDispatch} from "@/store/store";


export const useDispatchWithType = () => useDispatch<TypedDispatch>()