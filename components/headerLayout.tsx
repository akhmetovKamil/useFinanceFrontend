import React, {ReactNode} from "react"
import {useSelectorWithType} from "@/hooks/useSelectorWithType";


const HeaderLayout = ({children}: { children: ReactNode }) => {
    const {isAuth} = useSelectorWithType(state => state.auth)
    //Проверка какие кнопки в хэдере должны показываться

    if (isAuth) {
        return(
            <>
                <div>authorized Header</div>
                {children}
            </>
        )
    }
    return (
        <>
            <div>not authorized</div>
            {children}
        </>
    )
}

export default HeaderLayout