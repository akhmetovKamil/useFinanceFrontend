import React, { ReactNode, useRef, MutableRefObject } from "react";
import { useSelectorWithType } from "@/hooks/useSelectorWithType";
import { TfiAlignRight } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import s from "@/styles/Header.module.sass";
import NavLink from "next/link";
import { useRouter } from "next/router";
import { logoutThunk } from "@/store/reducers/authReducer";
import { useDispatchWithType } from "@/hooks/useDispatchWithType";
const HeaderLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useSelectorWithType((state) => state.auth);
  //Проверка какие кнопки в хэдере должны показываться
  const router = useRouter();
  const dispatch = useDispatchWithType();
  const navLinks = [
    { title: "Главная", path: "/main" },
    { title: "Баланс", path: "/balance" },
    { title: "Долги", path: "/depts" },
    { title: "Доходы", path: "/incomes" },
  ];
  const navRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const showNav = () => {
    navRef.current.style.transform = "none";
  };
  const closeNav = () => {
    navRef.current.style.transform = "translateY(-100vh)";
  };
  if (isAuth) {
    return (
      <>
        <div className={s.header}>
          <div className={s.logo}>
            <h2>useFinance</h2>
          </div>
          <div className={s.linkList} ref={navRef}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                className={router.pathname == link.path ? s.activeLink : ""}
              >
                {link.title}
              </NavLink>
            ))}
            <a
              onClick={async () => {
                await router.push("/");
                dispatch(logoutThunk());
              }}
              className={s.hbtn}
            >
              Выход
            </a>
            <button className={s.hbtn} onClick={closeNav}>
              <AiOutlineClose color="white" />
            </button>
          </div>
          <div className={s.lk}>
            <a
              onClick={async () => {
                await router.push("/");
                dispatch(logoutThunk());
              }}
              className={s.hlogout}
            >
              Выход
            </a>
            <button className={s.hbtn} onClick={showNav}>
              <TfiAlignRight color="white" />
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }
  return (
    <>
      <div className={s.header}>not authorized</div>
      {children}
    </>
  );
};

export default HeaderLayout;
