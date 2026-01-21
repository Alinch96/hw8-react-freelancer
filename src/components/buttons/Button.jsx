import { useNavigate } from "react-router";
import styles from "./Button.module.css";
import clsx from "clsx";

function Button({ children, to, from, onClick, color = "green", type="button" }) {
  const navigate = useNavigate();
  return (
    <button className={clsx(styles.button, styles[color])}
      type={type}
      onClick={() => {
        onClick?.();
        if (to) navigate(to, { state: { from } });
      }}
    >
      {children}
    </button>
  );
}

export default Button;
