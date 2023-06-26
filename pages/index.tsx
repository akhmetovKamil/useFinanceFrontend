import HeaderLayout from '@/components/headerLayout';
import Head from 'next/head';
import React, { useEffect } from 'react';
import s from '@/styles/Home.module.sass';
import GradButton from '@/components/UI/GradButton/GradButton';
import { useDispatchWithType } from '@/hooks/useDispatchWithType';
import { useSelectorWithType } from '@/hooks/useSelectorWithType';
import { getPublicDataThunk } from '@/store/reducers/publicReducer';

const Home = () => {
  const dispatch = useDispatchWithType();
  const { isFetching, usersCount, totalBalance, totalDebtsToMe, totalMyDebts } =
    useSelectorWithType(state => state.public);
  useEffect(() => {
    dispatch(getPublicDataThunk());
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeaderLayout>
        <>
          <div className={s.mainInfo}>
            <div className={s.logoContainer}>
              <p className={s.fw + ' ' + s.logoW}>use</p>
              <p className={s.sw + ' ' + s.logoW}>.</p>
              <p className={s.thw + ' ' + s.logoW}>Finance</p>
            </div>
            <p className={s.descriptionText}>
              Добро пожаловать на наш сайт, где мы поможем вам учесть свои
              финансы и достичь финансовой стабильности. Мы уверены, что наши
              инструменты и советы помогут вам понять, как правильно
              распорядиться своими деньгами и достичь своих финансовых целей.
            </p>
          </div>
          <GradButton text='Авторизоваться' />
          <video autoPlay muted loop className={s.bVideo}>
            <source src='bgv.mp4' type='video/mp4' />
          </video>
        </>
      </HeaderLayout>
    </>
  );
};
export default Home;
