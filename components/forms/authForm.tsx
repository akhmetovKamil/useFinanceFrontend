import React from 'react';
import s from '@/styles/Auth.module.sass';
import { FieldValues, useForm } from 'react-hook-form';
import { AuthDto } from '@/types/auth';
import { initialState, loginThunk } from '@/store/reducers/authReducer';
import { useDispatchWithType } from '@/hooks/useDispatchWithType';
import { useRouter } from 'next/router';
import { useSelectorWithType } from '@/hooks/useSelectorWithType';

const AuthForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatchWithType();
  const { isAuth, authIsFetching } = useSelectorWithType(state => state.auth);
  const { error } = useSelectorWithType(state => state.auth);
  const onSubmit = async (e: AuthDto) => {
    const obj = {
      email: e.email,
      password: e.password,
    };
    await dispatch(loginThunk(obj));
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
            <input type='submit' className={s.btn} value='Подождите' disabled />
          ) : (
            <input type='submit' className={s.btn} value='Отправить' />
          )}
        </div>
      </form>
    </>
  );
};
export default AuthForm;
