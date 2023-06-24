import s from "@/styles/GradButton.module.sass";
import { GradButtonProps } from "./GradButton.props";

const GradButton = ({ text, ...props }: GradButtonProps) => {
  return (
    <div className={s.btnDiv}>
      <span className={s.btnBG}></span>
      <button className={s.btn} {...props}>
        {text}
      </button>
    </div>
  );
};

export default GradButton;
