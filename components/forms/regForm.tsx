import React from "react";
import s from "@/styles/beforeAuth.module.sass";


const RegForm = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className={s.initBottom}>
            <label htmlFor="name">Имя</label>
            <input type="text" id="name"/>
            <label htmlFor="email">Почта</label>
            <input type="text" id="email"/>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password"/>
            <div className="submit">Зарегестрироваться</div>
        </div>
    )
})
export default RegForm