import s from "../styles/beforeAuth.module.sass"
import {MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from "react";
import RegForm from "@/components/forms/regForm";
import AuthForm from "@/components/forms/authForm";

export default function AuthPage() {
    const [isReg, setReg] = useState(true)


    const regForm = useRef() as MutableRefObject<HTMLElement>
    const authForm = useRef() as MutableRefObject<HTMLElement>
    const regBtn = useRef() as MutableRefObject<HTMLDivElement>
    const authBtn = useRef() as MutableRefObject<HTMLDivElement>



    return (
         <>
             <main className={s.form}>
                 <RegForm ref={regForm}/>
                 <div ref={authBtn}>Войти</div>
                 {/*<div ref={regBtn}>Зарегистрироваться</div>*/}
                 {/*<AuthForm ref={authForm}/>*/}
             </main>
         </>
    )
}