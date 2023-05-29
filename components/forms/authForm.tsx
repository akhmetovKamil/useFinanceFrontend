import React from "react";
import s from "@/styles/Auth.module.sass";
import {useForm} from "react-hook-form";
import {AuthDto} from "@/axios/api";
import {registerThunk} from "@/store/reducers/authReducer";
import {useDispatch} from "react-redux";

const AuthForm = React.forwardRef((props, ref) => {
    const {handleSubmit, register, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const onSubmit = (e: AuthDto) => {
        const obj = {
            email: e.email,
            password: e.password
        }
        dispatch(registerThunk(obj))
        // LoginThunk
    }

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Почта</label>
                <input {...register("email", {
                    required: true,
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                })} aria-invalid={errors.email ? "true" : "false"} type="text" id="email"
                       placeholder="maksimIvanov2004@gmail.com"
                       className={errors.email ? s.errorInput : ""}/>
                {errors.email && errors.email.type == "required" &&
                    <p className={s.errorMessage}>Email is required</p>}
                {errors.email && errors.email.type == "pattern" &&
                    <p className={s.errorMessage}>Wrong email pattern</p>}
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16
                })} aria-invalid={errors.password ? "true" : "false"} type="password" id="password"
                       placeholder="qwertyuiop"
                       className={errors.password ? s.errorInput : ""}/>
                {errors.password && errors.password.type == "required" &&
                    <p className={s.errorMessage}>Password is required</p>}
                {errors.password && errors.password.type == "minLength" &&
                    <p className={s.errorMessage}>Password min length is 8</p>}
                {errors.password && errors.password.type == "maxLength" &&
                    <p className={s.errorMessage}>Password max length is 16</p>}
            </div>
            <input type="submit"/>
        </form>
    )
})
export default AuthForm