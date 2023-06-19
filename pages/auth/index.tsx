import s from '../styles/Auth.module.sass';
import React, {
  LegacyRef,
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import RegForm from '@/components/forms/regForm';
import AuthForm from '@/components/forms/authForm';
import { useSelectorWithType } from '@/hooks/useSelectorWithType';
import {useDispatchWithType} from "@/hooks/useDispatchWithType";
import {setError} from "@/store/reducers/authReducer";

export default function AuthPage() {
  const regForm = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const authForm = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const regBtn = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const authBtn = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  const { isAuth, authIsFetching } = useSelectorWithType(state => state.auth);
  const dispatch = useDispatchWithType()
  const [isAnimation,setIsAnimation] = useState(false)
  const [isClosedForm,setIsClosedForm] = useState(false)

  useEffect(() => {
    authForm.current.classList.toggle(s.animBottom);
    regBtn.current.classList.toggle(s.animTop);
    authForm.current.style.display = 'none';
    regBtn.current.style.display = 'none';
  }, []);

  const animStart = (
    activeForm: MutableRefObject<HTMLDivElement>,
    activeBtn: MutableRefObject<HTMLDivElement>,
    passiveForm: MutableRefObject<HTMLDivElement>,
    passiveBtn: MutableRefObject<HTMLDivElement>
  ) => {
    if (!isAnimation){
      dispatch(setError(""))
      activeForm.current.classList.toggle(s.animTop);
      activeBtn.current.classList.toggle(s.animBottom);
      setIsAnimation(true)
      setTimeout(() => {
        setIsClosedForm(true)
        activeForm.current.style.display = 'none';
        passiveBtn.current.style.display = 'flex';
        activeBtn.current.style.display = 'none';
        passiveForm.current.style.display = 'flex';
        setTimeout(() => {
          passiveBtn.current.classList.toggle(s.animTop);
          activeForm.current.classList.toggle(s.animTop);
          activeForm.current.classList.toggle(s.animBottom);
          passiveForm.current.classList.toggle(s.animBottom);
          activeBtn.current.classList.toggle(s.animBottom);
          activeBtn.current.classList.toggle(s.animTop);
          setIsAnimation(false)
          setIsClosedForm(false)
        }, 100);
      }, 1000);
    }

  };

  return (
    <>
      <main className={s.form}>
        <div ref={regForm}>
          <RegForm isClosedForm={isClosedForm}/>
        </div>
        <div
          ref={regBtn}
          onClick={() => animStart(authForm, regBtn, regForm, authBtn)}
        >
          Зарегистрироваться
        </div>
        <div
          ref={authBtn}
          onClick={() => animStart(regForm, authBtn, authForm, regBtn)}
        >
          Войти
        </div>
        <div ref={authForm}>
          <AuthForm isClosedForm={isClosedForm}/>
        </div>
      </main>
    </>
  );
}
