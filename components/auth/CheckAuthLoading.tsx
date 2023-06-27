import React from "react";
import s from "@/styles/CheckAuthLoadingLayout.module.sass";
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon";

const CheckAuthLoadingLayout = () => {
  return (
    <>
      <div className={s.loading}>
        <LoadingIcon width={100} />
      </div>
      <div className={s.loadingBG}></div>
    </>
  );
};

export default CheckAuthLoadingLayout;
