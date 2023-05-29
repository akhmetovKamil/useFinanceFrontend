import s from "../styles/Auth.module.sass"
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import RegForm from "@/components/forms/regForm";
import AuthForm from "@/components/forms/authForm";
import {useDispatch} from "react-redux";
import {useSelectorWithType} from "@/hooks/useSelectorWithType";
import {register} from "@/store/reducers/authReducer";

export default function AuthPage(){
    const regForm = useRef() as MutableRefObject<HTMLElement>
    const authForm = useRef() as MutableRefObject<HTMLElement>
    const regBtn = useRef() as MutableRefObject<HTMLDivElement>
    const authBtn = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        authForm.current.classList.toggle(s.animBottom)
        regBtn.current.classList.toggle(s.animTop)
        authForm.current.style.display = "none"
        regBtn.current.style.display = "none"
    }, [])



    const animStart = (activeForm: MutableRefObject<HTMLElement>, activeBtn: MutableRefObject<HTMLDivElement>,
                       passiveForm: MutableRefObject<HTMLElement>, passiveBtn: MutableRefObject<HTMLDivElement>,) => {
        activeForm.current.classList.toggle(s.animTop)
        activeBtn.current.classList.toggle(s.animBottom)
        setTimeout(() => {
            activeForm.current.style.display = "none"
            passiveBtn.current.style.display = "flex"
            activeBtn.current.style.display = "none"
            passiveForm.current.style.display = "flex"
            setTimeout(() => {
                passiveBtn.current.classList.toggle(s.animTop)
                activeForm.current.classList.toggle(s.animTop)
                activeForm.current.classList.toggle(s.animBottom)
                passiveForm.current.classList.toggle(s.animBottom)
                activeBtn.current.classList.toggle(s.animBottom)
                activeBtn.current.classList.toggle(s.animTop)
            }, 100)

        }, 1000)
    }

    return (
        <>
            <main className={s.form}>
                <RegForm ref={regForm}/>
                <div ref={regBtn} onClick={() => animStart(authForm,regBtn,regForm,authBtn)}>Зарегистрироваться</div>
                <div ref={authBtn} onClick={() => animStart(regForm,authBtn,authForm,regBtn)} >Войти</div>
                <AuthForm ref={authForm}/>
            </main>
        </>
    )
}