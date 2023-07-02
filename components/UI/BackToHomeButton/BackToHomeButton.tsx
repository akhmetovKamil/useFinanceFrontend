import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import s from "@/styles/BackToHomeButton.module.sass";
import { warn } from "console";

const BackToHomeButton = () => {
  return (
    <Link href="/" className={s.btnBackToHome}>
      <BiArrowBack />
    </Link>
  );
};

export default BackToHomeButton;
