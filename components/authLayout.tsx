import React, {useEffect} from "react"
import {checkAuthThunk} from "@/store/reducers/authReducer";
import {useDispatchWithType} from "@/hooks/useDispatchWithType";
import {useSelectorWithType} from "@/hooks/useSelectorWithType";
import {useRouter} from "next/router";
import CheckAuthLoadingLayout from "@/components/CheckAuthLoading";


const AuthLayout = ({children}) => {
    const dispatch = useDispatchWithType()
    const {isAuth,isCheckingAuth} = useSelectorWithType(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        dispatch(checkAuthThunk())
    }, [])
    useEffect(() => {
        if (!isAuth && !isCheckingAuth) router.push('/')
    }, [isAuth,isCheckingAuth])


    if (isCheckingAuth || !isAuth){
        return <CheckAuthLoadingLayout/>
    }
    return <div>{children}</div>
}

export default AuthLayout;