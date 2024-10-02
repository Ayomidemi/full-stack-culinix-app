import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = {
  text: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "outline" | "transparent";
  disabled?: boolean;
  className?: string;
};

const Button = ({ text, onClick, variant, disabled, className }: Props) => {
  return (
    <div className={styles.wrap}>
      <button
        onClick={onClick}
        className={classNames(styles[variant], className)}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
