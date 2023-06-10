import React, {useEffect} from 'react';
import s from '@/styles/Auth.module.sass';
import {FieldValues, useForm} from 'react-hook-form';
import {useSelectorWithType} from '@/hooks/useSelectorWithType';
import {registerThunk} from '@/store/reducers/authReducer';
import {AuthDto} from '@/types/auth';
import {useDispatchWithType} from '@/hooks/useDispatchWithType';
import {useRouter} from 'next/router';


const RegForm = ({isClosedForm}: boolean) => {
    const {
        handleSubmit,
        register,
        reset,
        clearErrors, //Сделать чтобы пропадали ошибки при повторном нажатии на инпут
        formState: {errors},
    } = useForm();

    useEffect(()=>{
        if (isClosedForm){
            reset()
            clearErrors()
        }
    },[isClosedForm])

    const dispatch = useDispatchWithType();
    const {error} = useSelectorWithType(state => state.auth);
    const {authIsFetching} = useSelectorWithType(state => state.auth);
    const onSubmit = async (e: AuthDto) => {
        console.log(e);
        const obj = {
            email: e.email,
            name: e.name,
            password: e.password,
        };
        await dispatch(registerThunk(obj));
    };

    return (
        <>
            <form
                onSubmit={handleSubmit((data: FieldValues) =>
                    onSubmit(data as AuthDto)
                )}
            >
                <div>
                    <input
                        {...register('name', {
                            required: true,
                            maxLength: 10,
                            minLength: 3,
                        })}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        type='text'
                        id='name'
                        placeholder='Имя'
                        className={errors.name || error ? s.errorInput : ''}
                    />
                    {errors.name && errors.name.type == 'required' && (
                        <p className={s.errorMessage}>Name is required</p>
                    )}
                    {errors.name && errors.name.type == 'minLength' && (
                        <p className={s.errorMessage}>Name min length is 3</p>
                    )}
                    {errors.name && errors.name.type == 'maxLength' && (
                        <p className={s.errorMessage}>Name max length is 10</p>
                    )}
                </div>
                <div>
                    <input
                        {...register('email', {
                            required: true,
                            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                        })}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        type='text'
                        id='email'
                        placeholder='Email'
                        className={errors.email || error ? s.errorInput : ''}
                    />
                    {errors.email && errors.email.type == 'required' && (
                        <p className={s.errorMessage}>Email is required</p>
                    )}
                    {errors.email && errors.email.type == 'pattern' && (
                        <p className={s.errorMessage}>Wrong email pattern</p>
                    )}
                </div>
                <div>
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 8,
                            maxLength: 16,
                        })}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        type='password'
                        id='password'
                        placeholder='Пароль'
                        className={errors.password || error ? s.errorInput : ''}
                    />
                    {errors.password && errors.password.type == 'required' && (
                        <p className={s.errorMessage}>Password is required</p>
                    )}
                    {errors.password && errors.password.type == 'minLength' && (
                        <p className={s.errorMessage}>Password min length is 8</p>
                    )}
                    {errors.password && errors.password.type == 'maxLength' && (
                        <p className={s.errorMessage}>Password max length is 16</p>
                    )}
                </div>
                <div className={s.error_text}>{error}</div>
                <div>
                    {authIsFetching ? (
                        <input type='submit' className={s.btn} value='Подождите' disabled/>
                    ) : (
                        <input type='submit' className={s.btn} value='Отправить'/>
                    )}
                </div>
            </form>
        </>
    );
};
export default RegForm;
