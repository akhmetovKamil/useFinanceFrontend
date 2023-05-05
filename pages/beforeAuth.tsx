import s from "../styles/beforeAuth.module.sass"
import {MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from "react";
import RegForm from "@/components/forms/regForm";
import AuthForm from "@/components/forms/authForm";

export default function BeforeAuthPage() {
    const [isReg, setReg] = useState(true)
    // const [test, setTest] = useState(true)

    const regForm = useRef() as MutableRefObject<HTMLElement>
    const authForm = useRef() as MutableRefObject<HTMLElement>
    const regBtn = useRef() as MutableRefObject<HTMLDivElement>
    const authBtn = useRef() as MutableRefObject<HTMLDivElement>


    // useEffect(() => {
    //     console.log("Надо переписать")
    //     regForm.current && regForm.current.classList.contains(s.initBottom) && regForm.current.classList.toggle(s.initBottom)
    //     authBtn.current && authBtn.current.classList.contains(s.initTop) && authBtn.current.classList.toggle(s.initTop)
    // },[test])

    useEffect(() => {
        // debugger
        regBtn.current && regBtn.current.classList.toggle(s.initTop)
        authForm.current && authForm.current.classList.toggle(s.initBottom)
        regForm.current && regForm.current.classList.toggle(s.initBottom)
        authBtn.current && authBtn.current.classList.toggle(s.initTop)



        // setTest(!test)
    },[isReg])

    const changeForm = (btn : MutableRefObject<HTMLDivElement>, form : MutableRefObject<HTMLElement>) => {
        btn.current.classList.toggle(s.initBottom)
        form.current.classList.toggle(s.initTop)
        // setTimeout(() => {
        //     setReg(!isReg)
        // },)
        setReg(!isReg)
    }

    // const authClick = () => {
    //     authBtn.current && authBtn.current.classList.toggle(s.initBottom)
    //     regForm.current && regForm.current.classList.toggle(s.initTop)
    //     setTimeout(() => setReg(!isReg),700)
    // }
    // const regClick = () => {
    //     regBtn.current && regBtn.current.classList.toggle(s.initBottom)
    //     authForm.current && authForm.current.classList.toggle(s.initTop)
    //     setTimeout(() => setReg(!isReg),700)
    // }


    // {isReg ?
    //     <main className={s.form}>
    //         <RegForm ref={regForm}/>
    //         <div onClick={() => changeForm(authBtn,regForm)} ref={authBtn} className={s.initTop}>Войти</div>
    //     </main> :
    //     <main className={s.form}>
    //         <div onClick={() => changeForm(regBtn,authForm)} ref={regBtn} className={s.initTop}>Зарегистрироваться</div>
    //         <AuthForm ref={authForm}/>
    //     </main>}

    return (
        <>

            <main className={s.form}>
                <RegForm ref={regForm}/>
                <div onClick={() => changeForm(authBtn,regForm)} ref={authBtn} className={s.initTop}>Войти</div>
                <div onClick={() => changeForm(regBtn,authForm)} ref={regBtn} className={`${s.initTop} initTopNone`}>Зарегистрироваться</div>
                <AuthForm ref={authForm}/>
            </main>
        </>
    )
}