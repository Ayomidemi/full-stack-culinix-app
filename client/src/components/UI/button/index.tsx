import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  variant: "primary" | "secondary" | "outline" | "transparent";
  disabled?: boolean;
  className?: string;
};

const Button = ({
  text,
  onClick,
  variant,
  disabled,
  className,
  type,
}: Props) => {
  return (
    <div className={styles.wrap}>
      <button
        onClick={onClick}
        className={classNames(styles[variant], className)}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
