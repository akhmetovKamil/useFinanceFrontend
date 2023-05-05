import React from "react";
import s from "@/styles/beforeAuth.module.sass";


const AuthForm = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className={`${s.initBottom} initTopNone`}>
            <label htmlFor="email">Почта</label>
            <input type="text" id="email"/>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password"/>
            <div className={s.submit}>Войти</div>
        </div>
    )
})
export default AuthForm