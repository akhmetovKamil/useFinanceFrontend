import React from "react";
import s from "@/styles/beforeAuth.module.sass";
import {useForm} from "react-hook-form";


const RegForm = React.forwardRef((props, ref) => {
    const { handleSubmit, register, formState: { errors } } = useForm()

    const tempSubmit = data => console.log(data)

    return (
        <div ref={ref}>
            <form onSubmit={handleSubmit(tempSubmit)}>
                <label htmlFor="name">Имя</label>
                <input {...register("name",{
                    required:true,
                    maxLength: 10,
                    minLength: 3
                })} aria-invalid={errors.name ? "true" : "false"} type="text" id="name"/>
                {errors.name && <p className={s.requiredMessage}>First name is required</p>}
                <label htmlFor="email">Почта</label>
                <input {...register("email",{
                    required:true,
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                })} aria-invalid={errors.email ? "true" : "false"} type="text" id="email"/>
                {errors.email && <p className={s.requiredMessage}>Email is required</p>}
                <label htmlFor="password">Пароль</label>
                <input {...register("password",{
                    required:true,
                    minLength: 8,
                    maxLength: 16
                })} aria-invalid={errors.password ? "true" : "false"} type="password" id="password"/>
                {errors.password && <p className={s.requiredMessage}>Password is required</p>}
                <input type="submit"/>
            </form>
        </div>
    )
})
export default RegForm